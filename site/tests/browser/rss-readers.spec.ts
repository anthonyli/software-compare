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
      await expect(products.locator('[data-product-id]')).toHaveCount(7);
      for (const id of ['netnewswire','fluent-reader','freshrss','rss-guard','miniflux','newsflash','capy-reader']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/rss-readers/rss-guard/');
      await page.locator(locale).click();
      const sync = page.locator('.feature-row').nth(3);
      await expect(sync.locator(lang === 'en' ? 'p .t-en' : 'p .t-zh').filter({ hasText: 'Google Reader API' })).toBeVisible();
      await expect(sync.locator(lang === 'en' ? 'p .t-zh' : 'p .t-en').filter({ hasText: 'Google Reader API' })).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/rss-readers/miniflux/');
      await page.locator(locale).click();
      const isEnglish = lang === 'en';
      const visible = isEnglish ? 'p .t-en' : 'p .t-zh';
      const hidden = isEnglish ? 'p .t-zh' : 'p .t-en';
      const offline = page.locator('.feature-row').nth(2);
      await expect(offline.locator(visible)).toContainText(isEnglish ? 'not articles for offline reading' : '不缓存文章供离线阅读');
      await expect(offline.locator(visible)).toBeVisible();
      await expect(offline.locator(hidden)).toBeHidden();
      await expect(page.locator('.feature-row').nth(3).locator(visible)).toContainText(isEnglish ? 'only a subset of the Google Reader API' : '只实现部分 Google Reader API');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/rss-readers/newsflash/');
      await page.locator(locale).click();
      const newsflashSync = page.locator('.feature-row').nth(3);
      await expect(newsflashSync.locator(visible)).toContainText(isEnglish ? 'Local mode does not sync' : '本机模式不自动跨设备同步');
      await expect(newsflashSync.locator(visible)).toBeVisible();
      await expect(newsflashSync.locator(hidden)).toBeHidden();
      await expect(page.locator('.feature-row').nth(5).locator(visible)).toContainText(isEnglish ? 'not an aggregation server' : '不是聚合服务器');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/rss-readers/capy-reader/');
      await page.locator(locale).click();
      const capySync = page.locator('.feature-row').nth(3);
      await expect(capySync.locator(visible)).toContainText(isEnglish ? 'native API with token support' : '原生 API，支持 API 令牌');
      await expect(capySync.locator(visible)).toBeVisible();
      await expect(capySync.locator(hidden)).toBeHidden();
      await expect(page.locator('.feature-row').nth(2).locator(visible)).toContainText(isEnglish ? 'Read cached content offline' : '可离线阅读已缓存内容');
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

test('RSS detail notes keep public capability clauses and their translations', async ({ page }) => {
  const cases = [
    ['freshrss', [[4, '把匹配正文存到自己的服务器', 'onto your server'],
                 [5, '刷新订阅或提取正文仍会连接来源网站', 'still connects to feed or article sources']]],
    ['rss-guard', [[4, '尝试从原页提取正文', 'retrieve the main text from an original page']]],
    ['miniflux', [[0, '由 Miniflux 服务器获取', 'The Miniflux server fetches RSS, Atom and JSON Feed']]],
    ['newsflash', [[4, '桌面版可尝试提取网页正文', 'extract article text from the original page']]],
  ] as const;
  for (const [id, notes] of cases) {
    await page.goto(`/p/rss-readers/${id}/`);
    for (const lang of ['zh-CN', 'en'] as const) {
      await page.locator(`[data-lang="${lang}"]`).click();
      const en = lang === 'en';
      for (const [idx, zh, english] of notes) {
        const row = page.locator('.feature-row').nth(idx);
        const visible = row.locator(en ? 'p .t-en' : 'p .t-zh');
        const hidden = row.locator(en ? 'p .t-zh' : 'p .t-en');
        await expect(visible).toContainText(en ? english : zh);
        await expect(visible).toBeVisible();
        await expect(hidden).toBeHidden();
      }
    }
  }
});
