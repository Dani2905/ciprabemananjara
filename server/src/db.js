const mysql = require('mysql2/promise');
const { config, hasDatabaseConfiguration } = require('./config');

let pool;

class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('Database configuration is not available.');
    this.name = 'DatabaseNotConfiguredError';
  }
}

function getDatabasePool() {
  if (!hasDatabaseConfiguration()) throw new DatabaseNotConfiguredError();
  if (!pool) {
    pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
      waitForConnections: true,
      connectionLimit: config.database.connectionLimit,
      queueLimit: 0,
      charset: 'utf8mb4',
      timezone: 'Z',
      multipleStatements: false,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

async function closeDatabasePool() {
  if (!pool) return;
  const current = pool;
  pool = undefined;
  await current.end();
}

module.exports = { DatabaseNotConfiguredError, getDatabasePool, closeDatabasePool };
