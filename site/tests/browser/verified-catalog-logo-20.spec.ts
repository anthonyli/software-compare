// SPDX-License-Identifier: Apache-2.0
import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.220' } });

for (const [category, id, extension, longEdge] of [
  ['screen-recorders', 'bandicam', 'png', 512],
  ['presentation-tools', 'reveal-js', 'webp', 96],
  ['cycling-tools', 'intervals-icu', 'webp', 96],
  ['domain-registration', 'porkbun', 'webp', 96],
  ['website-to-desktop', 'unite-pro', 'webp', 96],
  ['international-payments', 'creem', 'webp', 96],
  ['cleaners', 'advanced-systemcare', 'png', 256],
  ['vpn-clients', 'pia', 'png', 256],
  ['note-taking', 'zettlr', 'png', 256],
  ['menu-bar-calendars', 'top-calendar', 'png', 128],
  ['outdoor-navigation', 'mapy-com', 'webp', 96],
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
