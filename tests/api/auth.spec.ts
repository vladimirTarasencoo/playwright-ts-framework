import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';

test.describe('API: authentication @api', () => {
  test('returns JWT for valid credentials @smoke', async ({ apiClient }) => {
    const token = await apiClient.login(env.user.email, env.user.password);

    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
  });

  test('rejects invalid credentials with 401 @negative', async ({ apiClient }) => {
    const ctx = await apiClient.ready();
    const response = await ctx.post('/users/login', {
      data: { email: env.user.email, password: 'definitely-wrong' },
    });

    expect(response.status()).toBe(401);
  });
});
