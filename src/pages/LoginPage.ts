import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
    await this.expectPageHeading('Login Page');
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectSecureArea(): Promise<void> {
    await this.expectUrlToMatch(/\/secure/);
    await this.expectPageHeading('Secure Area');
    await expect(this.flashMessage).toContainText('You logged into a secure area!');
  }

  async expectInvalidUsernameError(): Promise<void> {
    await expect(this.flashMessage).toContainText('Your username is invalid!');
  }

  async expectInvalidPasswordError(): Promise<void> {
    await expect(this.flashMessage).toContainText('Your password is invalid!');
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  async expectLoginPage(): Promise<void> {
    await this.expectUrlToMatch(/\/login/);
    await this.expectPageHeading('Login Page');
  }
}
