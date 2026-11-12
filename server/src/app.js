const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const helmet = require('helmet');
const { config, hasDatabaseConfiguration } = require('./config');
const { getDatabasePool } = require('./db');
const { authRouter } = require('./auth');
const { contentRouter } = require('./content');
const { contactRouter } = require('./contact');
const { uploadsRouter, uploadsDirectory } = require('./uploads');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', config.trustProxyHops);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '2mb', strict: true }));
app.use('/api', (_request, response, next) => {
  response.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/api/health/live', (_request, response) => {
  response.json({ status: 'ok', service: 'cpi-api' });
});

app.get('/api/health/ready', async (_request, response) => {
  if (!hasDatabaseConfiguration()) {
    return response.status(503).json({ status: 'not_ready', checks: { database: 'not_configured' } });
  }
  try {
    const pool = getDatabasePool();
    await pool.query('SELECT 1');
    return response.json({ status: 'ready', checks: { database: 'connected' } });
  } catch {
    return response.status(503).json({ status: 'not_ready', checks: { database: 'unavailable' } });
  }
});

app.use('/api/admin/auth', authRouter);
app.use('/api', contentRouter);
app.use('/api', uploadsRouter);
app.use('/api', contactRouter);

app.use('/api', (_request, response) => response.status(404).json({ error: 'not_found' }));

app.use('/uploads', express.static(uploadsDirectory, {
  index: false,
  dotfiles: 'deny',
  maxAge: '1y',
  immutable: true,
}));

const frontendDirectory = path.resolve(__dirname, '../public');
const frontendIndex = path.join(frontendDirectory, 'index.html');
if (fs.existsSync(frontendIndex)) {
  app.use(express.static(frontendDirectory, { index: false, maxAge: '1h' }));
  app.use((request, response, next) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') return next();
    if (request.path === '/api' || request.path.startsWith('/api/')) return next();
    if (path.extname(request.path)) return next();

    response.setHeader('Cache-Control', 'no-cache');
    return response.sendFile(frontendIndex, (error) => {
      if (error) next(error);
    });
  });
}

app.use((error, _request, response, _next) => {
  if (error?.type === 'entity.too.large') return response.status(413).json({ error: 'request_too_large' });
  if (error instanceof SyntaxError && 'body' in error) return response.status(400).json({ error: 'invalid_json' });
  console.error('Unhandled API error:', error?.name ?? 'UnknownError');
  return response.status(500).json({ error: 'internal_server_error' });
});

module.exports = app;
