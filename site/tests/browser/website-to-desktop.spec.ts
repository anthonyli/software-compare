import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.249' } });

test('wrapper comparison keeps CLI, GUI and licensed distribution separate in both languages and layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, cli, app, webcatalog, unite] of [
      ['zh-CN', '网页封装桌面应用', '标准构建输出有 GPL 例外', '不是独立安装包', '2 个目录应用当作 2 个任意网站', '不允许分享给未授权用户'],
      ['en', 'Website-to-desktop apps', 'standard output exception', 'settings, not a standalone installer', 'not two arbitrary websites', 'does not permit sharing it with unlicensed users'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/website-to-desktop/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(4);
      for (const id of ['pake-cli','pake-app','webcatalog-desktop','unite-pro']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      for (const [id, note] of [['pake-cli',cli], ['pake-app',app], ['webcatalog-desktop',webcatalog], ['unite-pro',unite]] as const) {
        await page.goto(`/p/website-to-desktop/${id}/`);
        await page.locator(locale).click();
        await expect(page.getByText(note, { exact: false }).filter({ visible: true })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
