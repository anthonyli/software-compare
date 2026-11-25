import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.254' } });

test('Finder move gestures, privacy and the included baseline render on both layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang,title,boundary,privacy,permission,native] of [
      ['zh-CN','Finder 文件移动快捷键','实际移动仍由 Finder 执行','崩溃时会向 Sentry 发送技术报告','需给 Command X 授权','到目标文件夹后 ⌥⌘V'],
      ['en','Finder file move shortcuts','Finder still performs the move','technical crash reports go to Sentry','background shortcut tool needs permission','⌥⌘V in the destination folder'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/finder-file-moves/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-finder-file-moves-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(2);
      for (const id of ['command-x','finder-native']) await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of [['command-x',[privacy,permission]],['finder-native',[native]]] as const) {
        await page.goto(`/p/finder-file-moves/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
