import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  scenarioName = 'scenario';

  constructor(options: IWorldOptions) {
    super(options);
  }

  loginPage(): LoginPage {
    if (!this.page) throw new Error('Browser page was not initialized');
    return new LoginPage(this.page);
  }
}

setWorldConstructor(CustomWorld);

