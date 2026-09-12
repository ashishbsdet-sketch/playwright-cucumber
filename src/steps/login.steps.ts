import { Given, Then, When } from '@cucumber/cucumber';
import { config } from '../config/config';
import type { CustomWorld } from '../support/CustomWorld';

Given('the customer opens the login page', async function (this: CustomWorld) {
  await this.loginPage().open();
});

When('the customer signs in with valid credentials', async function (this: CustomWorld) {
  await this.loginPage().signIn(config.credentials.username, config.credentials.password);
});

When(
  'the customer signs in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage().signIn(username, password);
  }
);

Then('the secure account area should be displayed', async function (this: CustomWorld) {
  await this.loginPage().expectSecureArea();
});

Then('an invalid username error should be displayed', async function (this: CustomWorld) {
  await this.loginPage().expectInvalidUsernameError();
});

Then('a password error should be displayed', async function (this: CustomWorld) {
  await this.loginPage().expectInvalidPasswordError();
});

When('the customer logs out', async function (this: CustomWorld) {
  await this.loginPage().logout();
});

Then('the customer should be redirected to the login page', async function (this: CustomWorld) {
  await this.loginPage().expectLoginPage();
});
