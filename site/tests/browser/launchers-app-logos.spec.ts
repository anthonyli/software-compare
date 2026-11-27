import { test, expect } from '@playwright/test';

test('Tinycast and Ueli load their own icons on both layouts and on details', async ({ page }) => {
  // This icon-only check should not create a voting session on the test worker.
  await page.route('**/api/votes?*', route => route.fulfill({ json: { votes: [] } }));
  const ids = ['tinycast', 'ueli'];
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/launchers/');
    const container = page.locator(width === 1280 ? '#matrix' : '#card-list');
    for (const id of ids) {
      const image = container.locator(`[data-product-id="${id}"] [data-product-logo="verified"] img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('src', `/product-logos/${id}.webp`);
      await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(96);
    }
  }
  for (const id of ids) {
    await page.goto(`/p/launchers/${id}/`);
    const image = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(96);
  }
});
