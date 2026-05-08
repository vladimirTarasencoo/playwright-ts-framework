import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ApiClient } from '../api/ApiClient';

interface Fixtures {
  loginPage: LoginPage;
  homePage: HomePage;
  apiClient: ApiClient;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  apiClient: async ({}, use) => {
    const client = new ApiClient();
    await use(client);
    await client.dispose();
  },
});

export { expect };
