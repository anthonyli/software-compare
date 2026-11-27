// SPDX-License-Identifier: Apache-2.0
import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.216' } });

for (const [category, id] of [
  ['backend-as-a-service', 'appwrite-cloud'],
  ['animation-2d', 'moho'],
  ['file-sync', 'rclone'],
  ['pdf-tools', 'ilovepdf'],
  ['file-sync', 'freefilesync'],
  ['cad', 'cadcraft'],
  ['presentation-tools', 'deckcraft'],
  ['spreadsheets', 'gridcraft'],
  ['word-processors', 'wordcraft'],
  ['audio-editors', 'soundcraft'],
  ['vpn-clients', 'outline'],
] as const) {
  test(`official ${id} mark renders in the comparison and product page`, async ({ page }) => {
    const src = `/product-logos/${id}.webp`;
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const scope = width === 1280 ? '#matrix' : '#card-list';
      const img = page.locator(`${scope} [data-product-id="${id}"] [data-product-logo="verified"] img`);
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('src', src);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => Math.max(el.naturalWidth, el.naturalHeight))).toBe(96);
    }
    await page.goto(`/p/${category}/${id}/`);
    const img = page.locator('.detail-hero [data-product-logo="verified"] img');
    await expect(img).toHaveAttribute('src', src);
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => Math.max(el.naturalWidth, el.naturalHeight))).toBe(96);
  });
}
