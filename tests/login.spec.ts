import {test, expect} from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('./login');
  });

  test('should render the login page correctly', async ({ page }) => {
    await expect(page.getByRole('heading', {level: 1})).toHaveText('Sign in');
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('should validate fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="password"]:invalid')).toBeVisible();

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('test');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should redirect to home page if credentials are correct', async ({ page }) => {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('Oliver.conner@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('password1');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('./');

    // also check if the user is logged in correctly
    // (we should be able to see the user's name in the header and go to the favorites page)
    await page.getByRole('link', { name: 'Oliver.conner' }).click();
    await page.waitForURL('./favorites');
    expect(page.url()).toBe('http://localhost:5173/favorites');
  });
});
