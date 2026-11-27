import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/votes?*', route => route.fulfill({ json: { votes: [] } }));
});

for (const [category, ids] of [
  ['launchers', ['raycast']],
  ['cloud-sql-databases', ['turso']],
  ['authenticators', ['2fas-auth']],
  ['web-analytics', ['umami']],
  ['cli-frameworks', ['spectre-console-cli']],
  ['cycling-tools', ['fittrackee']],
  ['converters', ['vlc']],
  ['downloaders', ['transmission']],
  ['remote-desktop', ['rustdesk', 'sunshine']],
  ['terminal-emulators', ['iterm2']],
  ['vpn-clients', ['amnezia']],
] as const) {
  test(`official ${category} icons load on desktop, mobile and details`, async ({ page }) => {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/c/${category}/`);
      const layout = page.locator(width === 1280 ? '#matrix' : '#card-list');
      for (const id of ids) {
        const image = layout.locator(`[data-product-id="${id}"] [data-product-logo="verified"] img`);
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute('src', `/product-logos/${id}.webp`);
        await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(96);
      }
    }
    for (const id of ids) {
      await page.goto(`/p/${category}/${id}/`);
      const image = page.locator('.detail-hero [data-product-logo="verified"] img');
      await expect(image).toHaveAttribute('alt', '');
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => Math.max(img.naturalWidth, img.naturalHeight))).toBe(96);
    }
  });
}
