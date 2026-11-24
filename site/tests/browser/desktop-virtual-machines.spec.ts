import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.248' } });

test('desktop VM comparisons preserve bilingual architecture and plan boundaries at desktop and mobile widths', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, heading, fusionNote, utmNote, paidNote, utmPlanLabel, parallelsPreview] of [
      ['zh-CN', '桌面虚拟机', '不等于运行 x86 来宾', 'Apple 后端需 macOS 27+', '14 天 Pro 试用', '免费开源', '未核实 27 是否提供'],
      ['en', 'Desktop virtual machines', 'not the same capability', 'Apple backend requires macOS 27+', '14-day Pro trial', 'Free and open source', 'Availability in version 27 is unverified'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/desktop-virtual-machines/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(heading);
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['parallels-desktop','utm','vmware-fusion']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      const utm = products.locator('[data-product-id="utm"]');
      await expect(utm.getByText(utmPlanLabel, { exact: true }).filter({ visible: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      for (const [id, note] of [['vmware-fusion', fusionNote], ['utm', utmNote], ['parallels-desktop', paidNote]] as const) {
        await page.goto(`/p/desktop-virtual-machines/${id}/`);
        await page.locator(locale).click();
        await expect(page.getByText(note, { exact: false }).filter({ visible: true })).toBeVisible();
        if (id === 'parallels-desktop') {
          await expect(page.getByText(parallelsPreview, { exact: false }).filter({ visible: true })).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
