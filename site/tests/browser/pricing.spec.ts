import { test, expect } from '@playwright/test';
import { formatPriceDisplay, formatHeroPrice } from '../../src/lib/display';
import type { Product } from '../../src/lib/load-data';

const free = { plan: 'Free', price: '免费', currency: '', period: '', note: '' };
const paid = { plan: 'Pro', price: '12', currency: 'USD', period: '月', note: '' };
const product = (model: string, prices: unknown[]) => ({ pricing_model: model, prices }) as Product;

for (const locale of ['zh', 'en'] as const) {
  test(`price samples cannot override pricing model (${locale})`, () => {
    const fullyFree = locale === 'zh' ? '完全免费' : 'Free';
    const freemium = locale === 'zh' ? '免费增值' : 'Freemium';
    const unknown = locale === 'zh' ? '价格未知' : 'Price unknown';
    expect(formatPriceDisplay(product('完全免费', [free]), locale).cell).toBe(fullyFree);
    expect(formatPriceDisplay(product('完全免费', []), locale).cell).toBe(fullyFree);
    for (const prices of [[free], [], [free, paid]]) {
      expect(formatPriceDisplay(product('免费增值', prices), locale).cell).toBe(freemium);
    }
    expect(formatHeroPrice(product('免费增值', [free]), locale)).toBe(freemium);
    expect(formatPriceDisplay(product('未知', [free]), locale).cell).toBe(unknown);
    expect(formatPriceDisplay(product('未知', []), locale).cell).toBe(unknown);
    for (const model of ['订阅', '付费']) {
      const d = formatPriceDisplay(product(model, [free]), locale);
      expect(d.cell).not.toBe(fullyFree);
      expect(d.cell).not.toBe(freemium);
      expect(formatPriceDisplay(product(model, [paid]), locale).cell).toContain('12');
    }
    expect(formatPriceDisplay(product('未知', [free, paid]), locale).cell).toBe(freemium);
  });
}

test('UU Remote table and detail preserve freemium without invented prices', async ({ page }) => {
  await page.goto('/c/remote-desktop/');
  const row = page.locator('#matrix [data-product-id="uu-remote"]');
  await expect(row).toContainText('免费增值');
  await expect(row).not.toContainText('完全免费');
  await page.goto('/p/remote-desktop/uu-remote/');
  await expect(page.locator('main')).toContainText('免费增值');
  await expect(page.locator('main')).toContainText('付费会员和增值服务');
});
