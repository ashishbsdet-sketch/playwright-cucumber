import { expect, type Locator, type Page } from '@playwright/test';
import { config } from '../config/config';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async openPage(path: string): Promise<void> {
    await this.page.goto(`${config.baseURL}${path}`);
  }

  protected async expectPageHeading(heading: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }

  protected async expectUrlToMatch(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  protected get flashMessage(): Locator {
    return this.page.locator('#flash');
  }
}
