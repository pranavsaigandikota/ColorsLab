const { randomUUID } = require('node:crypto');
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:8080';

async function post(endpoint, payload) {
  const response = await fetch(`${baseUrl}/LAMPAPI/${endpoint}.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000)
  });
  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toMatch(/^application\/json/);
  return response.json();
}

test('Login returns the expected JSON structure for valid credentials', async () => {
  expect(await post('Login', { login: 'ci-user', password: 'ci-password' })).toEqual({
    id: 1, firstName: 'CI', lastName: 'Tester', error: ''
  });
});

test('Login rejects an incorrect password', async () => {
  expect(await post('Login', { login: 'ci-user', password: 'wrong' })).toEqual({
    id: 0, firstName: '', lastName: '', error: 'No Records Found'
  });
});

test('a logged-in user can add and search a persisted color without exposing it to another user', async () => {
  const user = await post('Login', { login: 'ci-user', password: 'ci-password' });
  expect(user.id).toBe(1);
  const color = `CI-${randomUUID()}`;
  expect(await post('AddColor', { color, userId: user.id })).toEqual({ error: '' });
  expect(await post('SearchColors', { search: color, userId: user.id })).toEqual({
    results: [color], error: ''
  });
  const otherUser = await post('Login', { login: 'ci-other', password: 'ci-password' });
  expect(otherUser.id).toBe(2);
  expect(await post('SearchColors', { search: color, userId: otherUser.id })).toEqual({
    id: 0, firstName: '', lastName: '', error: 'No Records Found'
  });
});

test('SearchColors returns the documented error structure for no matches', async () => {
  expect(await post('SearchColors', { search: randomUUID(), userId: 1 })).toEqual({
    id: 0, firstName: '', lastName: '', error: 'No Records Found'
  });
});
