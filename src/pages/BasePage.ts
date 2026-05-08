import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitUntilReady();
  }

  protected async waitUntilReady(): Promise<void> {
    return Promise.resolve();
  }

  byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async expectUrl(pattern: string | RegExp) {
    await expect(this.page).toHaveURL(pattern);
  }
}
