import { test, expect } from '@playwright/test';

test('verified product logos load locally on desktop, mobile and detail pages', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/rss-readers/');
    const container = page.locator(width === 1280 ? '#matrix' : '#card-list');
    const product = container.locator('[data-product-id="newsboat"]');
    const badge = product.locator('[data-product-logo="verified"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('aria-hidden', 'true');
    await expect(badge.locator('img')).toHaveAttribute('src', '/product-logos/newsboat.webp');
    await expect(badge.locator('img')).toHaveAttribute('alt', '');
    await expect(product.getByRole('link', { name: 'Newsboat', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }

  await page.goto('/p/rss-readers/newsboat/');
  const hero = page.locator('.detail-hero');
  await expect(hero.getByRole('heading', { name: 'Newsboat', exact: true })).toBeVisible();
  const image = hero.locator('[data-product-logo="verified"] img');
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
});
