import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/';

  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.byTestId('search-query');
    this.searchSubmit = this.byTestId('search-submit');
    this.productCards = page.locator('a[data-test^="product-"]');
  }

  protected override async waitUntilReady() {
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchSubmit.click();
  }
}
