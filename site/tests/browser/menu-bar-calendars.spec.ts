import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.253' } });

test('menu-bar calendar pricing, compatible builds and privacy render in both layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang,title,boundary,region,min,legacy,privacy] of [
      ['zh-CN','菜单栏日历','不是自己提供同步账号','中国大陆 Mac App Store ¥18','macOS 26.6+','0.15.15 给 macOS 11+','崩溃会向 Sentry 发送技术报告'],
      ['en','Menu-bar calendars','not a separate sync account','¥18 in the mainland China Mac App Store','macOS 26.6+','0.15.15 for macOS 11+','technical crash reports are sent to Sentry'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/menu-bar-calendars/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-menu-bar-calendar-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(4);
      for (const id of ['top-calendar','itsycal','dato','calendar-366']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of [['top-calendar',[region,min]],['itsycal',[legacy]],['dato',[privacy]],['calendar-366',['US$49.99','Calendar 366 II']]] as const) {
        await page.goto(`/p/menu-bar-calendars/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
