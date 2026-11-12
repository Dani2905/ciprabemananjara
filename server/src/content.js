const { Router } = require('express');
const { DatabaseNotConfiguredError, getDatabasePool } = require('./db');
const { requireAdmin } = require('./auth');
const { requireSameOrigin } = require('./security');

const contentRouter = Router();

const DOCUMENT_KEYS = Object.freeze([
  'site-content',
  'hero-images',
  'site-pages',
  'banner',
  'news',
]);

function parsePayload(text, key) {
  try {
    return JSON.parse(text);
  } catch {
    console.error(`Stored content document is invalid JSON (${key}).`);
    return null;
  }
}

async function readDocuments(response) {
  try {
    const pool = getDatabasePool();
    const [rows] = await pool.execute(
      'SELECT document_key, payload_json FROM cms_documents ORDER BY document_key',
    );
    const documents = {};
    for (const row of rows) {
      if (!DOCUMENT_KEYS.includes(row.document_key)) continue;
      const parsed = parsePayload(row.payload_json, row.document_key);
      if (parsed !== null) documents[row.document_key] = parsed;
    }
    return response.json({ documents });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return response.status(503).json({ error: 'database_not_configured' });
    }
    console.error('Content read failed:', error?.name ?? 'UnknownError');
    return response.status(503).json({ error: 'service_unavailable' });
  }
}

contentRouter.get('/public/content', async (_request, response) => readDocuments(response));
contentRouter.get('/admin/content', requireAdmin, async (_request, response) => readDocuments(response));

contentRouter.put('/admin/content', requireSameOrigin, requireAdmin, async (request, response) => {
  const incoming = request.body?.documents;
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
    return response.status(400).json({ error: 'documents_required' });
  }
  const entries = Object.entries(incoming);
  if (!entries.length || entries.some(([key]) => !DOCUMENT_KEYS.includes(key))) {
    return response.status(400).json({ error: 'invalid_document_key' });
  }

  const serialized = [];
  let totalBytes = 0;
  for (const [key, document] of entries) {
    let payload;
    try { payload = JSON.stringify(document); } catch { return response.status(400).json({ error: 'invalid_content' }); }
    if (!payload) return response.status(400).json({ error: 'content_required' });
    totalBytes += Buffer.byteLength(payload, 'utf8');
    serialized.push([key, payload]);
  }
  if (totalBytes > 1_500_000) return response.status(413).json({ error: 'content_too_large' });

  let connection;
  try {
    const pool = getDatabasePool();
    connection = await pool.getConnection();
    await connection.beginTransaction();
    for (const [key, payload] of serialized) {
      await connection.execute(
        `INSERT INTO cms_documents (document_key, payload_json, updated_by)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE payload_json = VALUES(payload_json), updated_by = VALUES(updated_by), updated_at = UTC_TIMESTAMP()`,
        [key, payload, request.admin.id],
      );
    }
    await connection.commit();
    return response.json({ saved: true, keys: serialized.map(([key]) => key) });
  } catch (error) {
    if (connection) await connection.rollback().catch(() => {});
    if (error instanceof DatabaseNotConfiguredError) {
      return response.status(503).json({ error: 'database_not_configured' });
    }
    console.error('Content batch save failed:', error?.name ?? 'UnknownError');
    return response.status(503).json({ error: 'service_unavailable' });
  } finally {
    connection?.release();
  }
});

contentRouter.put('/admin/content/:key', requireSameOrigin, requireAdmin, async (request, response) => {
  const { key } = request.params;
  if (!DOCUMENT_KEYS.includes(key)) return response.status(404).json({ error: 'unknown_document' });
  if (request.body === undefined || request.body === null) return response.status(400).json({ error: 'content_required' });

  let payload;
  try {
    payload = JSON.stringify(request.body);
  } catch {
    return response.status(400).json({ error: 'invalid_content' });
  }
  if (!payload || Buffer.byteLength(payload, 'utf8') > 1_500_000) {
    return response.status(413).json({ error: 'content_too_large' });
  }

  try {
    const pool = getDatabasePool();
    await pool.execute(
      `INSERT INTO cms_documents (document_key, payload_json, updated_by)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE payload_json = VALUES(payload_json), updated_by = VALUES(updated_by), updated_at = UTC_TIMESTAMP()`,
      [key, payload, request.admin.id],
    );
    return response.json({ saved: true, key });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return response.status(503).json({ error: 'database_not_configured' });
    }
    console.error('Content save failed:', error?.name ?? 'UnknownError');
    return response.status(503).json({ error: 'service_unavailable' });
  }
});

module.exports = { contentRouter, DOCUMENT_KEYS };
