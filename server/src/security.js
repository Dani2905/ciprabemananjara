const { createHash, randomBytes, scrypt: scryptCallback, timingSafeEqual } = require('node:crypto');
const { promisify } = require('node:util');
const { config } = require('./config');

const scrypt = promisify(scryptCallback);
const PASSWORD_COST = 16_384;
const PASSWORD_BLOCK_SIZE = 8;
const PASSWORD_PARALLELISM = 1;
const PASSWORD_KEY_LENGTH = 64;
const SESSION_COOKIE_NAME = 'cpi_admin_session';

async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, PASSWORD_KEY_LENGTH, {
    N: PASSWORD_COST,
    r: PASSWORD_BLOCK_SIZE,
    p: PASSWORD_PARALLELISM,
    maxmem: 64 * 1024 * 1024,
  });
  return `scrypt$${PASSWORD_COST}$${PASSWORD_BLOCK_SIZE}$${PASSWORD_PARALLELISM}$${salt.toString('hex')}$${Buffer.from(derived).toString('hex')}`;
}

async function verifyPassword(password, encoded) {
  if (typeof encoded !== 'string') return false;
  const [algorithm, nText, rText, pText, saltText, hashText, extra] = encoded.split('$');
  if (algorithm !== 'scrypt' || extra !== undefined) return false;
  const n = Number(nText);
  const r = Number(rText);
  const p = Number(pText);
  if (!Number.isInteger(n) || n < 16_384 || n > 131_072 || !Number.isInteger(r) || r < 1 || r > 16 || !Number.isInteger(p) || p < 1 || p > 4) return false;
  if (!/^[a-f0-9]{32}$/i.test(saltText ?? '') || !/^[a-f0-9]{128}$/i.test(hashText ?? '')) return false;

  try {
    const expected = Buffer.from(hashText, 'hex');
    const actual = Buffer.from(await scrypt(password, Buffer.from(saltText, 'hex'), expected.length, {
      N: n, r, p, maxmem: 64 * 1024 * 1024,
    }));
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function createSessionToken() {
  return randomBytes(32).toString('base64url');
}

function hashSessionToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function readSessionCookie(request) {
  const header = request.headers.cookie;
  if (!header) return '';
  for (const item of header.split(';')) {
    const separator = item.indexOf('=');
    if (separator < 0) continue;
    const name = item.slice(0, separator).trim();
    if (name === SESSION_COOKIE_NAME) return item.slice(separator + 1).trim();
  }
  return '';
}

function setSessionCookie(response, token) {
  response.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    path: '/api',
    maxAge: config.sessionTtlHours * 60 * 60 * 1000,
  });
}

function clearSessionCookie(response) {
  response.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    path: '/api',
  });
}

function requireSameOrigin(request, response, next) {
  const originHeader = request.get('origin');
  if (!originHeader) return response.status(403).json({ error: 'origin_required' });

  let origin;
  try {
    origin = new URL(originHeader).origin;
  } catch {
    return response.status(403).json({ error: 'origin_invalid' });
  }

  if (config.publicOrigins.size > 0) {
    if (!config.publicOrigins.has(origin)) return response.status(403).json({ error: 'origin_not_allowed' });
    return next();
  }

  const expectedOrigin = `${request.protocol}://${request.get('host')}`;
  if (origin !== expectedOrigin) return response.status(403).json({ error: 'origin_not_allowed' });
  return next();
}

module.exports = {
  hashPassword,
  verifyPassword,
  createSessionToken,
  hashSessionToken,
  readSessionCookie,
  setSessionCookie,
  clearSessionCookie,
  requireSameOrigin,
};
