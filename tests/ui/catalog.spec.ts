import { test, expect } from '../../src/fixtures';

const searchCases = [
  { query: 'Pliers', minResults: 1 },
  { query: 'Hammer', minResults: 1 },
  { query: 'Saw', minResults: 1 },
] as const;

test.describe('Product catalog @regression', () => {
  test('home page lists products on load @smoke', async ({ homePage }) => {
    await homePage.goto();
    const count = await homePage.productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  for (const tc of searchCases) {
    test(`search returns matches for "${tc.query}" @data-driven`, async ({ homePage }) => {
      await homePage.goto();
      await homePage.search(tc.query);

      await expect
        .poll(async () => homePage.productCards.count())
        .toBeGreaterThanOrEqual(tc.minResults);
    });
  }
});
