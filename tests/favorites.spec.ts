import {test, expect} from '@playwright/test';
import { login } from './utils';

test.describe('Favorites', () => {
  test('should redirect to login when adding offer to favorites unauthorized', async ({ page }) => {
    await page.goto('/');

    await page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first().click();

    await page.waitForURL(/login*/gi);
    expect(page.url()).toContain('/login');
  });

  test('should add offer to favorites when authorized', async ({ page }) => {
    await login(page);
    const beforeFavoritesCount = await page.locator('.header__favorite-count').textContent();
    await page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first().click();

    await page.waitForSelector('.place-card__bookmark-button--active');
    const afterFavoritesCount = await page.locator('.header__favorite-count').textContent();

    expect(Number(afterFavoritesCount ?? '')).toBeGreaterThan(Number(beforeFavoritesCount ?? ''));
  });

  test('should remove offer from favorites when authorized', async ({ page }) => {
    await login(page);
    const bookmarkButton = page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first();

    await bookmarkButton.click();
    await page.waitForSelector('.place-card__bookmark-button--active');
    const headerFavoriteCount = page.locator('.header__favorite-count');

    const beforeFavoritesCount = Number(await headerFavoriteCount.textContent() ?? '');
    await bookmarkButton.click();

    await expect(headerFavoriteCount).toContainText(String(beforeFavoritesCount - 1));
    await expect(page.locator('.place-card__bookmark-button--active')).toBeHidden();
  });

  test('should redirect to favorites page when authorized', async ({ page }) => {
    await login(page);
    await page.locator('.header__nav-link--profile').click();
    await expect(page.getByRole('heading', { name: 'Saved listing' })).toBeVisible();
  });

  test('should display added offer in favorites page when authorized', async ({ page }) => {
    await login(page);
    const bookmarkButton = page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first();

    await bookmarkButton.click();
    await page.waitForSelector('.place-card__bookmark-button--active');
    const headerFavoriteCount = page.locator('.header__favorite-count');

    await page.locator('.header__nav-link--profile').click();
    await expect(page.getByRole('heading', { name: 'Saved listing' })).toBeVisible();

    const favoritesCount = await page.locator('.favorites__card').count();
    expect(favoritesCount).toBe(Number(await headerFavoriteCount.textContent() ?? ''));
  });

  test('should remove offer from favorites page when authorized', async ({ page }) => {
    await login(page);
    const bookmarkButton = page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first();

    await bookmarkButton.click();
    await page.waitForSelector('.place-card__bookmark-button--active');
    const headerFavoriteCount = page.locator('.header__favorite-count');

    await page.locator('.header__nav-link--profile').click();
    await expect(page.getByRole('heading', { name: 'Saved listing' })).toBeVisible();

    const favoritesCount = await page.locator('.favorites__card').count();
    expect(favoritesCount).toBe(Number(await headerFavoriteCount.textContent() ?? ''));

    await page.locator('.place-card__bookmark-button--active').first().click();
    await page.waitForSelector('.favorites__card', {state: 'hidden'});
    const afterRemoveFavoritesCount = await page.locator('.favorites__card').count();
    expect(afterRemoveFavoritesCount).toBe(favoritesCount - 1);
  });

  test('should redirect to offer page when clicking on offer from favorites page', async ({ page }) => {
    await login(page);
    const bookmarkButton = page.locator('.place-card__bookmark-button', {hasNot: page.locator('.place-card__bookmark-button--active')}).first();

    await bookmarkButton.click();
    await page.waitForSelector('.place-card__bookmark-button--active');

    await page.locator('.header__nav-link--profile').click();
    await expect(page.getByRole('heading', { name: 'Saved listing' })).toBeVisible();

    await page.locator('.favorites__card').first().click();
    await page.waitForURL(/offer*/gi);
    expect(page.url()).toContain('/offer');
  });

  test('should redirect to login when unauthorized', async ({ page }) => {
    await page.goto('/favorites');
    await page.waitForURL(/login*/gi);
    expect(page.url()).toContain('/login');
  });
});
