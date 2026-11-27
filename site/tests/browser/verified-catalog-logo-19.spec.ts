// SPDX-License-Identifier: Apache-2.0
import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.219' } });

for (const [category, id, extension, longEdge] of [
  ['desktop-publishing', 'quarkxpress', 'webp', 96],
  ['screenshot-tools', 'snipaste', 'webp', 96],
  ['converters', 'cloudconvert', 'webp', 96],
  ['transcription-tools', 'macwhisper', 'webp', 96],
  ['converters', 'permute', 'webp', 96],
  ['animation-3d', 'needle-engine', 'webp', 96],
  ['audio-recorders', 'just-press-record', 'png', 84],
  ['cleaners', 'wise-disk-cleaner', 'webp', 96],
  ['screenshot-tools', 'picpick', 'webp', 96],
  ['cleaners', 'onyx', 'webp', 96],
  ['website-to-desktop', 'pake-app', 'png', 96],
  ['image-editors', 'photopea', 'webp', 96],
] as const) {
  test(`official ${id} mark renders in the comparison and product page`, async ({ page }) => {
    const src = `/product-logos/${id}.${extension}`;
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const scope = width === 1280 ? '#matrix' : '#card-list';
      const img = page.locator(`${scope} [data-product-id="${id}"] [data-product-logo="verified"] img`);
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('src', src);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => Math.max(el.naturalWidth, el.naturalHeight))).toBe(longEdge);
    }
    await page.goto(`/p/${category}/${id}/`);
    const img = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(img).toHaveAttribute('src', src);
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => Math.max(el.naturalWidth, el.naturalHeight))).toBe(longEdge);
  });
}
