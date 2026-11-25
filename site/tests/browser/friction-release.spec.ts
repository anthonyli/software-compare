import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.241' } });

test('Friction presents the published stable version and platform boundary', async ({ page }) => {
  for (const [width, lang, boundary] of [
    [1280, 'en', 'source-only experiment, not an Android installer'],
    [390, 'zh-CN', 'GLES3 仅为源码试验，不是 Android 安装包'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/p/animation-2d/friction/');
    await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('h1')).toContainText('Friction');
    await expect(page.locator('dd').filter({ hasText: '2026-11-08' })).toContainText('1.0.0');
    await expect(page.locator('body')).toContainText(boundary, { useInnerText: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
