// SPDX-License-Identifier: Apache-2.0
import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.218' } });

for (const [category, id, extension, longEdge] of [
  ['launchers', 'launchbar', 'webp', 96],
  ['music-streaming', 'tidal', 'webp', 96],
  ['audio-editors', 'fl-studio', 'png', 202],
  ['ai-agent-workbenches', 'conductor', 'webp', 96],
  ['vector-graphics', 'figma-design', 'webp', 96],
  ['animation-3d', 'cinema-4d', 'webp', 96],
  ['launchers', 'alfred', 'webp', 96],
  ['archivers', 'betterzip', 'webp', 96],
  ['archivers', 'bandizip', 'webp', 96],
  ['audio-editors', 'ocenaudio', 'webp', 96],
  ['archivers', 'keka', 'webp', 96],
  ['fitness-training', 'fitnotes', 'webp', 96],
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
