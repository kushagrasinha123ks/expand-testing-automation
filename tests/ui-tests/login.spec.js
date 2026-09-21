import { test, expect } from '@playwright/test';

test.describe('Test login page', () => {

  const validUsername = 'practice';
  const validPassword = 'SuperSecretPassword!';
  
  const invalidUsername = 'invalidUser';
  const invalidPassword = 'WrongPassword123!';

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('TC-Login-01 - Valid username and valid password', async ({ page }) => {
    await page.getByLabel('Username').fill(validUsername);
    await page.getByLabel('Password').fill(validPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(page).toHaveURL(/secure/);
    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('You logged into a secure area!');

    const btn_link = page.getByRole('link', { name: "Logout" });
    await expect(btn_link).toBeVisible();
    await btn_link.click();
    await expect(page).toHaveURL('/login');
  });

  test('TC-Login-02 - Invalid username and valid password', async ({ page }) => {
    await page.getByLabel('Username').fill(invalidUsername);
    await page.getByLabel('Password').fill(validPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('Your password is invalid!');
  });

  test('TC-Login-03 - Valid username and invalid password', async ({ page }) => {
    await page.getByLabel('Username').fill(validUsername);
    await page.getByLabel('Password').fill(invalidPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('Your password is invalid!');
  });

  test('TC-Login-04 - Invalid username and invalid password', async ({ page }) => {
    await page.getByLabel('Username').fill(invalidUsername);
    await page.getByLabel('Password').fill(invalidPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('Your password is invalid!');
  });

  test('TC-Login-05 - Empty username and valid password', async ({ page }) => {
    await page.getByLabel('Password').fill(validPassword);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('Your username is invalid!');
  });

  test('TC-Login-06 - Valid username and empty password', async ({ page }) => {
    await page.getByLabel('Username').fill(validUsername);

    await page.getByRole('button', { name: 'Login' }).click();

    const alertMessage = page.locator('#flash');

    await expect(alertMessage).toBeVisible();
    await expect(alertMessage).toContainText('Your password is invalid!');
  });

});