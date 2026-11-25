import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.252' } });

test('input switching does not read as an input method or continuous lock in either layout', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, boundary, pro, lock, holder] of [
      ['zh-CN', '输入源切换工具', '不提供拼音词库或输入法引擎', '辅助功能和输入监控权限检查', '核心锁定不需额外系统授权', '未找到现版权限清单或数据留存说明'],
      ['en', 'Input source switchers', 'do not provide a Pinyin dictionary or an input method engine', 'Accessibility and Input Monitoring permissions', 'Core locking needs no additional system permission', 'do not establish a current permission list or retention policy'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/input-source-switchers/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-input-switcher-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['input-source-pro','lockime','keyboardholder']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id, note] of [['input-source-pro',pro],['lockime',lock],['keyboardholder',holder]] as const) {
        await page.goto(`/p/input-source-switchers/${id}/`);
        await page.locator(locale).click();
        await expect(page.getByText(note, { exact: false }).filter({ visible: true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
