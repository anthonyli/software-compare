import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/votes?*', route => route.fulfill({ json: { votes: [] } }));
});

for (const [category, id, naturalSize] of [
  ['archivers', 'nanazip', 64],
  ['remote-desktop', 'remmina', 96],
  ['mobile-frameworks', 'tauri', 96],
  ['ai-memory', 'screenpipe', 96],
  ['converters', 'handbrake', 96],
  ['ai-assistants', 'lm-studio', 96],
  ['transactional-email', 'mailersend', 96],
  ['http-debugging', 'proxyman', 96],
  ['cycling-tools', 'trainingpeaks', 96],
  ['ai-coding', 'cursor', 96],
  ['fitness-training', 'hevy', 96],
] as const) {
  test(`official ${category} icons load on desktop, mobile and details`, async ({ page }) => {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const layout = page.locator(width === 1280 ? '#matrix' : '#card-list');
      const image = layout.locator(`[data-product-id="${id}"] [data-product-logo="verified"] img`);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('src', `/product-logos/${id}.webp`);
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(naturalSize);
    }
    await page.goto(`/p/${category}/${id}/`);
    const image = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(naturalSize);
  });
}
