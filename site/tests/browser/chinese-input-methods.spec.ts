import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.253' } });

test('Chinese input methods show platform privacy and offline scope in both languages and layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, boundary, shead, wechat, rime, sogou] of [
      ['zh-CN','中文输入法','不是切换已有键盘的工具','搜狗输入法','部分输入与城市归属地会上传','BSD-3-Clause 指 librime 核心','限普通话转文字'],
      ['en','Chinese input methods','not tools that switch installed keyboards','Sogou Input Method','sends some input and city-level location','BSD-3-Clause applies to the librime core','limits offline speech to Mandarin transcription'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/chinese-input-methods/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-chinese-ime-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['wechat-keyboard','rime','sogou-input-method']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id, note] of [['wechat-keyboard',wechat],['rime',rime],['sogou-input-method',sogou]] as const) {
        await page.goto(`/p/chinese-input-methods/${id}/`);
        await page.locator(locale).click();
        if (id === 'sogou-input-method') await expect(page.locator('h1')).toContainText(shead);
        await expect(page.getByText(note, { exact: false }).filter({ visible: true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
