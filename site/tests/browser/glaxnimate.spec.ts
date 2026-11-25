import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.239' } });

test('Glaxnimate shows web-format limits in both layouts and languages', async ({ page }) => {
  for (const [width, lang, limit] of [
    [1280, 'en', 'not all features are compatible'],
    [390, 'zh-CN', '不是所有特性都兼容'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/animation-2d/');
    await page.locator(`[data-lang="${lang}"]`).click();
    const list = page.locator(width === 1280 ? '#matrix' : '#card-list');
    await expect(list.locator('[data-product-id="glaxnimate"]')).toBeVisible();
    await page.goto('/p/animation-2d/glaxnimate/');
    await expect(page.locator('h1')).toContainText('Glaxnimate');
    await expect(page.locator('body')).toContainText(limit, { useInnerText: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
