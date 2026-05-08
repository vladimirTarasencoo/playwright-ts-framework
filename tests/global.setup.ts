import { test as setup, expect } from '@playwright/test';
import { env } from '../src/config/env';

setup('environment is reachable', async ({ request }) => {
  const response = await request.get(`${env.apiBaseUrl}/products?page=1`);
  expect(response.ok(), `API at ${env.apiBaseUrl} should be reachable`).toBeTruthy();
});
