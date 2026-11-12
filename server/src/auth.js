const { Router } = require('express');
const { rateLimit } = require('express-rate-limit');
const { config } = require('./config');
const { DatabaseNotConfiguredError, getDatabasePool } = require('./db');
const {
  clearSessionCookie,
  createSessionToken,
  hashPassword,
  hashSessionToken,
  readSessionCookie,
  requireSameOrigin,
  setSessionCookie,
  verifyPassword,
} = require('./security');

const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too_many_login_attempts' },
});

function serviceUnavailable(response, error) {
  if (error instanceof DatabaseNotConfiguredError) {
    return response.status(503).json({ error: 'database_not_configured' });
  }
  console.error('Admin authentication request failed:', error?.name ?? 'UnknownError');
  return response.status(503).json({ error: 'service_unavailable' });
}

async function requireAdmin(request, response, next) {
  const token = readSessionCookie(request);
  if (!token) return response.status(401).json({ error: 'authentication_required' });

  try {
    const pool = getDatabasePool();
    const [rows] = await pool.execute(
      `SELECT a.id, a.email, a.display_name
       FROM admin_sessions s
       INNER JOIN admins a ON a.id = s.admin_id
       WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP() AND a.is_active = 1
       LIMIT 1`,
      [hashSessionToken(token)],
    );
    const admin = rows[0];
    if (!admin) {
      clearSessionCookie(response);
      return response.status(401).json({ error: 'authentication_required' });
    }
    request.admin = admin;
    return next();
  } catch (error) {
    return serviceUnavailable(response, error);
  }
}

authRouter.post('/login', requireSameOrigin, loginLimiter, async (request, response) => {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  if (!email || email.length > 254 || !password || password.length > 256) {
    return response.status(400).json({ error: 'invalid_credentials' });
  }

  try {
    const pool = getDatabasePool();
    const [rows] = await pool.execute(
      'SELECT id, email, display_name, password_hash FROM admins WHERE email = ? AND is_active = 1 LIMIT 1',
      [email],
    );
    const admin = rows[0];
    const passwordMatches = admin
      ? await verifyPassword(password, admin.password_hash)
      : await verifyPassword(password, await hashPassword('invalid-account-password'));

    if (!admin || !passwordMatches) return response.status(401).json({ error: 'invalid_credentials' });

    const token = createSessionToken();
    const expiresAt = new Date(Date.now() + config.sessionTtlHours * 60 * 60 * 1000);
    await pool.execute(
      'INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES (?, ?, ?)',
      [hashSessionToken(token), admin.id, expiresAt],
    );
    await pool.execute('UPDATE admins SET last_login_at = UTC_TIMESTAMP() WHERE id = ?', [admin.id]);
    setSessionCookie(response, token);
    return response.json({ authenticated: true, admin: { email: admin.email, displayName: admin.display_name } });
  } catch (error) {
    return serviceUnavailable(response, error);
  }
});

authRouter.get('/session', async (request, response) => {
  const token = readSessionCookie(request);
  if (!token) return response.json({ authenticated: false });
  try {
    const pool = getDatabasePool();
    const [rows] = await pool.execute(
      `SELECT a.email, a.display_name
       FROM admin_sessions s
       INNER JOIN admins a ON a.id = s.admin_id
       WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP() AND a.is_active = 1
       LIMIT 1`,
      [hashSessionToken(token)],
    );
    const admin = rows[0];
    if (!admin) {
      clearSessionCookie(response);
      return response.json({ authenticated: false });
    }
    return response.json({ authenticated: true, admin: { email: admin.email, displayName: admin.display_name } });
  } catch (error) {
    return serviceUnavailable(response, error);
  }
});

authRouter.post('/logout', requireSameOrigin, async (request, response) => {
  const token = readSessionCookie(request);
  try {
    if (token) {
      const pool = getDatabasePool();
      await pool.execute('DELETE FROM admin_sessions WHERE token_hash = ?', [hashSessionToken(token)]);
    }
    clearSessionCookie(response);
    return response.json({ authenticated: false });
  } catch (error) {
    clearSessionCookie(response);
    return serviceUnavailable(response, error);
  }
});

module.exports = { authRouter, requireAdmin };
