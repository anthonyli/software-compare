import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.251' } });

test('RSS readers retain source, extraction, offline and sync boundaries on desktop and mobile', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang,title,boundary,reddit,reader,fluent,fresh] of [
      ['zh-CN','RSS 阅读器','不比较音乐串流','停止刷新 Reddit 订阅源','Feedbin 托管的服务器','Mercury Parser','需要连接自己的 FreshRSS 实例'],
      ['en','RSS readers','does not compare music streaming','Reddit feeds are no longer refreshed','server hosted by Feedbin','Mercury Parser','needs a connection to your FreshRSS instance'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/rss-readers/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-rss-reader-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(4);
      for (const id of ['netnewswire','fluent-reader','freshrss','rss-guard']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/rss-readers/rss-guard/');
      await page.locator(locale).click();
      const sync = page.locator('.feature-row').nth(3);
      await expect(sync.locator(lang === 'en' ? 'p .t-en' : 'p .t-zh').filter({ hasText: 'Google Reader API' })).toBeVisible();
      await expect(sync.locator(lang === 'en' ? 'p .t-zh' : 'p .t-en').filter({ hasText: 'Google Reader API' })).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of [['netnewswire',[reddit,reader]],['fluent-reader',[fluent]],['freshrss',[fresh]]] as const) {
        await page.goto(`/p/rss-readers/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
