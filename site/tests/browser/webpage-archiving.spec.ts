import { expect, test } from '@playwright/test';
test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '192.0.2.162' } });
test('webpage archiving shows Monolith and SingleFile with both localized layouts', async ({ page }) => {
 for (const width of [1280, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/c/webpage-archiving/');
  const list = page.locator(width === 1280 ? '#matrix' : '#card-list');
  for (const id of ['monolith', 'singlefile']) await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  await page.goto('/p/webpage-archiving/monolith/');
  for (const lang of ['zh-CN', 'en']) {
   await page.locator(`[data-lang="${lang}"]`).click();
   const english = lang === 'en', active = english ? 'en' : 'zh';
   const rows = page.locator('.feature-row');
   await expect(rows.nth(1).locator('.feat')).toHaveAttribute('title', english ? 'Partial' : '部分支持');
   await expect(rows.nth(1).locator(`p .t-${active}`)).toContainText(english ? 'No built-in JavaScript rendering engine' : '自身不执行 JavaScript');
   await expect(rows.nth(3).locator(`p .t-${active}`)).toContainText(english ? 'browser-saved MHTML' : '读取浏览器保存的 MHTML');
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
 }
});
