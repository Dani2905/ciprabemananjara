const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../src/app');
const { DOCUMENT_KEYS } = require('../src/content');

const server = app.listen(0, '127.0.0.1');
const ready = new Promise((resolve, reject) => {
  server.once('listening', resolve);
  server.once('error', reject);
});

async function getOrigin() {
  await ready;
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

test('only editable content is allowed in the shared CMS', () => {
  assert.ok(DOCUMENT_KEYS.includes('site-pages'));
  assert.equal(DOCUMENT_KEYS.includes('expertise-pages'), false);
  assert.equal(DOCUMENT_KEYS.includes('legal-notice'), false);
  assert.equal(DOCUMENT_KEYS.includes('privacy-policy'), false);
});

test('liveness route confirms the API process is running', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/health/live`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok', service: 'cpi-api' });
});

test('readiness route reports database status without revealing configuration', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/health/ready`);
  const body = await response.json();
  assert.ok(response.status === 200 || response.status === 503);
  assert.ok(['ready', 'not_ready'].includes(body.status));
  assert.ok(['connected', 'not_configured', 'unavailable'].includes(body.checks?.database));
  assert.equal(JSON.stringify(body).includes('password'), false);
  assert.equal(JSON.stringify(body).includes('host'), false);
});

test('unknown API routes return JSON 404', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/does-not-exist`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'not_found' });
});

test('built frontend and client-side routes are served when a build exists', async (t) => {
  const frontendIndex = path.resolve(__dirname, '../public/index.html');
  if (!fs.existsSync(frontendIndex)) return t.skip('Run the frontend build to test static serving.');

  const origin = await getOrigin();
  for (const route of ['/', '/contact', '/mentions-legales', '/a-route-inconnue']) {
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 200, `${route} should load the SPA shell`);
    assert.match(response.headers.get('content-type') ?? '', /text\/html/);
    assert.match(await response.text(), /<div id="root"><\/div>/);
  }

  const brandMark = await fetch(`${origin}/brand-mark.svg`);
  assert.equal(brandMark.status, 200);
  assert.match(brandMark.headers.get('content-type') ?? '', /image\/svg\+xml/);
});

test('admin content is not readable without a session', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/admin/content`);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: 'authentication_required' });
});

test('state-changing requests reject a foreign origin', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/admin/content/site-content`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', origin: 'https://attacker.example' },
    body: JSON.stringify({ title: 'test' }),
  });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: 'origin_not_allowed' });
});

test('batch content writes require an authenticated Admin session', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/admin/content`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({ documents: { 'site-content': { heroTitle: 'Test' } } }),
  });
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: 'authentication_required' });
});

test('contact requests reject a foreign origin', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/public/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://attacker.example' },
    body: JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Question', message: 'A valid test message.' }),
  });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: 'origin_not_allowed' });
});

test('contact requests validate required fields before attempting delivery', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/public/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({ name: '', email: 'not-an-email', subject: '', message: 'No' }),
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'invalid_contact_request' });
});

test('contact honeypot accepts likely bot traffic without attempting delivery', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/public/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({ website: 'https://bot.example' }),
  });
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { accepted: true });
});

test('contact endpoint reports SMTP is not configured instead of claiming delivery', async () => {
  const origin = await getOrigin();
  const response = await fetch(`${origin}/api/public/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Question', message: 'A valid test message.' }),
  });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'contact_not_configured' });
});

test.after(() => new Promise((resolve) => server.close(resolve)));
