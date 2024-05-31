import {test, expect, Page} from '@playwright/test';
import { loginWithRedirect } from './utils';

const clickOnFirstCard = async (page: Page) => {
  await page.locator('.cities__card').first().click();
  await page.waitForURL(/offer*/gi);
};

test.describe('Comment Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
    await clickOnFirstCard(page);
  });

  test('should not render the comment form, when not authorized', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /reviews */gi })).toContainText('Reviews');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeHidden();
    await expect(page.getByRole('textbox')).toBeHidden();
  });

  test('should render the comment form, when authorized', async ({ page }) => {
    await loginWithRedirect(page);
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('should validate the comment form', async ({ page }) => {
    await loginWithRedirect(page);
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    await page.getByTitle('not bad').getByRole('img').click();
    await page.getByPlaceholder('Tell how was your stay, what').fill('Never gonna make you cry');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    await page.getByPlaceholder('Tell how was your stay, what').fill('Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('should submit the comment form', async ({ page }) => {
    await loginWithRedirect(page);
    await page.getByPlaceholder('Tell how was your stay, what').fill('Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry');
    await page.getByTitle('not bad').getByRole('img').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForSelector('.reviews__item');
    await expect(page.locator('.reviews__item').first()).toContainText('Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry');
  });

});
