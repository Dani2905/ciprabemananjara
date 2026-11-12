const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword, createSessionToken, hashSessionToken } = require('../src/security');

test('password hashes are salted and verify only the original password', async () => {
  const first = await hashPassword('A-strong-private-password-123!');
  const second = await hashPassword('A-strong-private-password-123!');
  assert.notEqual(first, second);
  assert.equal(await verifyPassword('A-strong-private-password-123!', first), true);
  assert.equal(await verifyPassword('another-password', first), false);
  assert.equal(await verifyPassword('A-strong-private-password-123!', 'invalid'), false);
});

test('session tokens are random and persisted only as hashes', () => {
  const first = createSessionToken();
  const second = createSessionToken();
  assert.notEqual(first, second);
  assert.notEqual(hashSessionToken(first), first);
  assert.equal(hashSessionToken(first).length, 64);
});
