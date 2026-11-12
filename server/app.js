const app = require('./src/app');
const { config } = require('./src/config');

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`C.IP API listening on port ${config.port} (${config.nodeEnv}).`);
});

function shutdown(signal) {
  console.log(`Received ${signal}; shutting down API.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));
