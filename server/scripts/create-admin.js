const { getDatabasePool } = require('../src/db');
const { hashPassword } = require('../src/security');

function askHidden(question) {
  return new Promise((resolve, reject) => {
    const input = process.stdin;
    const output = process.stdout;
    if (!input.isTTY || typeof input.setRawMode !== 'function') {
      reject(new Error('An interactive terminal is required; the password will not be accepted as a command-line argument.'));
      return;
    }

    output.write(question);
    input.setRawMode(true);
    input.resume();
    let value = '';

    const onData = (buffer) => {
      for (const byte of buffer) {
        if (byte === 3) {
          input.setRawMode(false);
          input.pause();
          input.removeListener('data', onData);
          output.write('\n');
          reject(new Error('Cancelled.'));
          return;
        }
        if (byte === 10 || byte === 13) {
          input.setRawMode(false);
          input.pause();
          input.removeListener('data', onData);
          output.write('\n');
          resolve(value);
          return;
        }
        if (byte === 127 || byte === 8) {
          if (value.length) {
            value = value.slice(0, -1);
            output.write('\b \b');
          }
          continue;
        }
        if (byte >= 32 && byte <= 126) {
          value += String.fromCharCode(byte);
          output.write('*');
        }
      }
    };

    input.on('data', onData);
  });
}

async function main() {
  const email = (process.argv[2] ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error('Usage: node scripts/create-admin.js admin@example.com');
  }

  const password = await askHidden('New Admin password (minimum 14 characters): ');
  const confirmation = await askHidden('Confirm password: ');
  if (password.length < 14) throw new Error('Use a unique password with at least 14 characters.');
  if (password !== confirmation) throw new Error('The two passwords do not match.');

  const pool = getDatabasePool();
  try {
    const passwordHash = await hashPassword(password);
    await pool.execute(
      'INSERT INTO admins (email, display_name, password_hash) VALUES (?, ?, ?)',
      [email, email, passwordHash],
    );
    console.log(`Admin account created for ${email}. The password was not printed or stored in the project files.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error?.message ?? 'Unable to create the Admin account.');
  process.exitCode = 1;
});
