import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.238' } });

test('Harmony shows edition limits in both layouts and languages', async ({ page }) => {
  for (const [width, lang, limit] of [
    [1280, 'en', 'Premium’s Node View'],
    [390, 'zh-CN', '高级节点视图按 Premium 计'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/animation-2d/');
    await page.locator(`[data-lang="${lang}"]`).click();
    const list = page.locator(width === 1280 ? '#matrix' : '#card-list');
    await expect(list.locator('[data-product-id="toon-boom-harmony"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto('/p/animation-2d/toon-boom-harmony/');
    await expect(page.locator('h1')).toContainText('Toon Boom Harmony');
    await expect(page.locator('body')).toContainText(limit, { useInnerText: true });
  }
});
