import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.247' } });

const languages = [
  { lang: 'zh-CN', title: 'CDN 与边缘安全', note: '不等于网站托管', products: {
    'cloudflare-free': ['512 MB', '未核实免费档付款方式'],
    'cloudfront-flat-rate-free': ['每个分发每月 100 万请求和 100 GB', '不收超额费'],
    'fastly-full-site-delivery': ['要求信用卡', '超过额度自动计费'],
  } },
  { lang: 'en', title: 'CDN and edge security', note: 'it is not web hosting', products: {
    'cloudflare-free': ['512 MB', 'payment method requirements were not verified'],
    'cloudfront-flat-rate-free': ['100 GB of data transfer per distribution monthly', 'do not charge overages'],
    'fastly-full-site-delivery': ['requires a credit card', 'automatic charges above the allowance'],
  } },
] as const;

for (const width of [1280, 390]) {
  test(`CDN comparison and product limits are readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const card = page.locator('#group-cloud a.dir-card[href="/c/cdn-edge-security/"]');
    await expect(card).toBeVisible();
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    for (const { lang, title, note, products } of languages) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/cdn-edge-security/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-cdn-edge-notes]').getByText(note, { exact: false }).filter({ visible: true })).toBeVisible();
      const list = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(list.locator('[data-product-id]')).toHaveCount(3);
      for (const [id, notes] of Object.entries(products)) {
        await page.goto(`/p/cdn-edge-security/${id}/`);
        await page.locator(locale).click();
        for (const text of notes) await expect(page.getByText(text, { exact: false }).filter({ visible: true }).first()).toBeVisible();
      }
      expect(await page.evaluate(() => innerWidth >= document.documentElement.scrollWidth)).toBe(true);
    }
  });
}
