import { test, expect } from '../../src/fixtures';
import { Product } from '../../src/data/types';

test.describe('API: products @api @regression', () => {
  test('lists products with expected schema @smoke', async ({ apiClient }) => {
    const response = await apiClient.get('/products', { page: 1 });

    expect(response.ok(), `Expected 2xx, got ${response.status()}`).toBeTruthy();
    const body = (await response.json()) as { data: Product[]; total: number };

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    const product = body.data[0];
    expect(product).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });

  test('returns pagination metadata', async ({ apiClient }) => {
    const response = await apiClient.get('/products', { page: 1 });
    const body = (await response.json()) as {
      data: Product[];
      current_page: number;
      total: number;
      per_page: number;
    };

    expect(body.current_page).toBe(1);
    expect(body.per_page).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThanOrEqual(body.data.length);
  });
});
