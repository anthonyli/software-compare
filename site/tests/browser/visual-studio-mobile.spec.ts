import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.240' } });

test('Visual Studio mobile entry exposes host and emulator limits in both layouts', async ({ page }) => {
  for (const [width, lang, limit] of [
    [1280, 'en', 'not on Windows on Arm'],
    [390, 'zh-CN', 'Windows on Arm 不支持 Android 模拟器'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/c/mobile-development-ides/');
    await page.locator(`[data-lang="${lang}"]`).click();
    const list = page.locator(width === 1280 ? '#matrix' : '#card-list');
    await expect(list.locator('[data-product-id="visual-studio-2026"]')).toBeVisible();
    await page.goto('/p/mobile-development-ides/visual-studio-2026/');
    await expect(page.locator('h1')).toContainText('Visual Studio 2026');
    await expect(page.locator('body')).toContainText(limit, { useInnerText: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
