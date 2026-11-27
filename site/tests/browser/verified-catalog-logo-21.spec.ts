// SPDX-License-Identifier: Apache-2.0
import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.220' } });

for (const [category, id, extension, longEdge] of [
  ['input-source-switchers', 'keyboardholder', 'png', 256],
  ['quick-translation-ocr', 'bob', 'png', 1024],
  ['ai-memory', 'auday', 'png', 180],
  ['ai-memory', 'fanear', 'png', 512],
  ['screenshot-tools', 'shottr', 'png', 64],
  ['menu-bar-calendars', 'calendar-366', 'png', 96],
  ['outdoor-navigation', 'locus-map', 'png', 192],
  ['image-uploaders', 'ipic', 'webp', 96],
  ['transcription-tools', 'aiko', 'webp', 96],
  ['menu-bar-calendars', 'dato', 'webp', 96],
  ['finder-file-moves', 'command-x', 'webp', 96],
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
