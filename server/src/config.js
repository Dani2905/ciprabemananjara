require('dotenv').config();

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function booleanSetting(value, fallback) {
  if (value === undefined || value === '') return fallback;
  return ['true', '1', 'yes'].includes(String(value).trim().toLowerCase());
}

const smtpPort = positiveInteger(process.env.SMTP_PORT, 587);
const publicOrigins = (process.env.PUBLIC_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: positiveInteger(process.env.PORT, 3000),
  trustProxyHops: Math.max(0, Number.parseInt(process.env.TRUST_PROXY_HOPS ?? '0', 10) || 0),
  publicOrigins: new Set(publicOrigins),
  sessionTtlHours: positiveInteger(process.env.SESSION_TTL_HOURS, 8),
  database: Object.freeze({
    host: process.env.DB_HOST?.trim() || '',
    port: positiveInteger(process.env.DB_PORT, 3306),
    name: process.env.DB_NAME?.trim() || '',
    user: process.env.DB_USER?.trim() || '',
    password: process.env.DB_PASSWORD ?? '',
    connectionLimit: positiveInteger(process.env.DB_CONNECTION_LIMIT, 5),
  }),
  contact: Object.freeze({
    recipientEmail: process.env.CONTACT_TO_EMAIL?.trim().toLowerCase() || '',
    senderEmail: process.env.CONTACT_FROM_EMAIL?.trim().toLowerCase() || process.env.SMTP_USER?.trim().toLowerCase() || '',
    smtpHost: process.env.SMTP_HOST?.trim() || '',
    smtpPort,
    smtpSecure: booleanSetting(process.env.SMTP_SECURE, smtpPort === 465),
    smtpUser: process.env.SMTP_USER?.trim() || '',
    smtpPassword: process.env.SMTP_PASSWORD ?? '',
  }),
});

function hasDatabaseConfiguration() {
  const { host, name, user, password } = config.database;
  return Boolean(host && name && user && password);
}

function hasContactMailConfiguration() {
  const { recipientEmail, senderEmail, smtpHost, smtpUser, smtpPassword } = config.contact;
  return Boolean(recipientEmail && senderEmail && smtpHost && smtpUser && smtpPassword);
}

module.exports = { config, hasDatabaseConfiguration, hasContactMailConfiguration };
