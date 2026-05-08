import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';
import { invalidLoginCases } from '../../src/data/factories';

test.describe('Authentication @smoke', () => {
  test('user logs in with valid credentials @happy', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(env.user.email, env.user.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByTestId('nav-sign-in')).toHaveCount(0);
  });

  for (const tc of invalidLoginCases) {
    test(`login fails for ${tc.case} @negative @regression`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(tc.email, tc.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await loginPage.expectUrl(/\/auth\/login/);
    });
  }
});
