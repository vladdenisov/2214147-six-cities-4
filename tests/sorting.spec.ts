import {test, expect} from '@playwright/test';


test.describe('Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.cities__card');
  });

  test('should sort by price', async ({ page }) => {
    await page.getByText('Popular').click();
    await page.getByText('Price: low to high').click();
    await page.waitForSelector('.cities__card');
    const prices: string[] = await page.locator('.cities__card .place-card__price').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    const sortedPricesLtH = prices.slice().sort((a, b) => parseFloat(a.replace('€', '')) - parseFloat(b.replace('€', '')));
    expect(prices).toEqual(sortedPricesLtH);

    await page.getByText('Price: low to high').click();
    await page.getByText('Price: high to low').click();
    await page.waitForSelector('.cities__card');
    const pricesHtL: string[] = await page.locator('.cities__card .place-card__price').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    const sortedPricesHtL = pricesHtL.slice().sort((a, b) => parseFloat(b.replace('€', '')) - parseFloat(a.replace('€', '')));
    expect(pricesHtL).toEqual(sortedPricesHtL);
  });

  test('should sort by rating', async ({ page }) => {
    await page.getByText('Popular').click();
    await page.getByText('Top rated first').click();
    await page.waitForSelector('.cities__card');
    const ratings: string[] = await page.locator('.cities__card .place-card__rating').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    const sortedRatings = ratings.slice().sort((a, b) => parseFloat(b) - parseFloat(a));
    expect(ratings).toEqual(sortedRatings);
  });

  test('should reset default sorting', async ({ page }) => {
    const defaultPrices: string[] = await page.locator('.cities__card .place-card__price').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    await page.getByText('Popular').click();
    await page.getByText('Price: low to high').click();
    await page.waitForSelector('.cities__card');
    const prices: string[] = await page.locator('.cities__card .place-card__price').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    const sortedPricesLtH = prices.slice().sort((a, b) => parseFloat(a.replace('€', '')) - parseFloat(b.replace('€', '')));
    expect(prices).toEqual(sortedPricesLtH);

    await page.getByText('Price: low to high').click();
    await page.getByText('Popular').click();
    await page.waitForSelector('.cities__card');
    const pricesPopular: string[] = await page.locator('.cities__card .place-card__price').evaluateAll((elements) => elements.map((el) => el.textContent ?? ''));
    expect(pricesPopular).toEqual(defaultPrices);
  });
});
