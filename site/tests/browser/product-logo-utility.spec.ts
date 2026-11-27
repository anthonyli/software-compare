import { expect, test } from '@playwright/test';

// Use an isolated test fixture on the local server.
test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.204' } });

const apps = [
  { category: 'launchers', id: 'flow-launcher', name: 'Flow Launcher' },
  { category: 'launchers', id: 'ulauncher', name: 'Ulauncher' },
  { category: 'note-taking', id: 'miaoyan', name: '妙言（MiaoYan）' },
  { category: 'note-taking', id: 'marktext', name: 'MarkText' },
  { category: 'clipboard-managers', id: 'maccy', name: 'Maccy' },
  { category: 'quick-translation-ocr', id: 'easydict', name: 'Easydict' },
  { category: 'terminal-emulators', id: 'kaku', name: 'Kaku' },
  { category: 'terminal-emulators', id: 'wezterm', name: 'WezTerm' },
  { category: 'menu-bar-calendars', id: 'itsycal', name: 'Itsycal' },
  { category: 'image-uploaders', id: 'picgo', name: 'PicGo' },
  { category: 'code-editors', id: 'zed', name: 'Zed' },
];

for (const app of apps) {
  test(`${app.name} logo remains a local decorative image without a source label`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`/c/${app.category}/`);
    const card = page.locator(`#card-list [data-product-id="${app.id}"]`);
    const badge = card.locator('[data-product-logo="verified"]');
    await expect(badge).toBeVisible();
    await expect(badge.locator('img')).toHaveAttribute('src', `/product-logos/${app.id}.webp`);
    await page.goto(`/p/${app.category}/${app.id}/`);
    const hero = page.locator('.detail-hero');
    await expect(hero.getByRole('heading', { name: app.name, exact: true })).toBeVisible();
    const detailBadge = hero.locator('[data-product-logo="verified"]');
    await expect(detailBadge).toHaveAttribute('aria-hidden', 'true');
    await expect(detailBadge).toHaveText('');
    const image = detailBadge.locator('img');
    await expect(image).toHaveAttribute('src', `/product-logos/${app.id}.webp`);
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  });
}
