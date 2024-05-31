import {test, expect} from '@playwright/test';

test.describe('Main Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the main page correctly', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.locator('.locations__item-link')).toHaveCount(6);
    await expect(page.locator('.cities__card')).toHaveCount(20);
    await expect(page.getByText('places to stay in Paris')).toHaveText('20 places to stay in Paris');

    await expect(page.locator('div').filter({ hasText: /^\+−Leaflet \| © OpenStreetMap$/ }).nth(1)).toBeVisible();
  });

  test('should redirect to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.waitForURL(/login*/gi);
    expect(page.url()).toContain('login');
  });

  test('should redirect to the offer page', async ({ page }) => {
    await page.locator('.cities__card').first().click();
    await page.waitForURL(/offer*/gi);
    expect(page.url()).toContain('offer');
    await expect(page.locator('.offer__image')).toHaveCount(6);
  });

  test('should switch between cities', async ({ page }) => {
    await page.waitForSelector('.cities__card');
    const previousFirstOffer = await page.locator('.cities__card').first().textContent() ?? '';

    await page.locator('.locations__item-link').nth(1).click();
    await page.waitForSelector('.cities__card');
    await expect(page.getByText('places to stay in Cologne')).toHaveText('20 places to stay in Cologne');
    await expect(page.locator('.cities__card')).toHaveCount(20);
    await expect(page.locator('.cities__card').first()).not.toHaveText(previousFirstOffer);

    await page.locator('.locations__item-link').nth(2).click();
    await page.waitForSelector('.cities__card');
    await expect(page.getByText('places to stay in Brussels')).toHaveText('20 places to stay in Brussels');
    await expect(page.locator('.cities__card').first()).not.toHaveText(previousFirstOffer);

    await page.locator('.locations__item-link').nth(0).click();
    await page.waitForSelector('.cities__card');
    await expect(page.getByText('places to stay in Paris')).toHaveText('20 places to stay in Paris');
    await expect(page.locator('.cities__card').first()).toHaveText(previousFirstOffer);
  });
});
