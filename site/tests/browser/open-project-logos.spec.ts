import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/votes?*', route => route.fulfill({ json: { votes: [] } }));
});

for (const [category, id, naturalSize] of [
  ['cad', 'openscad', 96],
  ['website-to-desktop', 'pake-cli', 96],
  ['photo-management', 'ente-photos', 96],
  ['animation-2d', 'synfig', 96],
  ['fitness-training', 'feeel', 96],
  ['vector-graphics', 'penpot', 96],
  ['terminal-emulators', 'ghostty', 96],
  ['password-managers', 'keepass', 96],
  ['animation-2d', 'wick-editor', 96],
  ['screenshot-tools', 'greenshot', 96],
  ['ai-coding', 'continue', 96],
  ['ai-assistants', 'ollama', 96],
] as const) {
  test(`official ${id} icon loads on desktop, mobile and details`, async ({ page }) => {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const layout = page.locator(width === 1280 ? '#matrix' : '#card-list');
      const image = layout.locator(`[data-product-id="${id}"] [data-product-logo="verified"] img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('src', `/product-logos/${id}.webp`);
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(naturalSize);
      if (id === 'penpot') expect((await image.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(24);
    }
    await page.goto(`/p/${category}/${id}/`);
    const image = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(naturalSize);
    if (id === 'penpot') expect((await image.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(24);
  });
}
