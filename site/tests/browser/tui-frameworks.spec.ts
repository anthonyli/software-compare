import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '192.0.2.234' } });

test('TUI category preserves capabilities and translations across screen sizes', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['en', 'zh-CN']) {
      const english = lang === 'en';
      await page.goto('/c/tui-frameworks/');
      await page.locator(`[data-lang="${lang}"]`).click();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      for (const id of ['bubble-tea', 'ratatui', 'textual']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      await expect(page.locator('h1')).toContainText(english ? 'Terminal UI frameworks' : '终端交互界面框架');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      for (const [id, index, noteEn, noteZh] of [
        ['bubble-tea', 1, 'separate Bubbles package', '独立 Bubbles 包'],
        ['ratatui', 2, 'from a backend such as Crossterm', '后端读取键鼠事件'],
        ['textual', 4, 'requires a separate service', '需另启服务'],
      ] as const) {
        await page.goto(`/p/tui-frameworks/${id}/`);
        await page.locator(`[data-lang="${lang}"]`).click();
        const row = page.locator('.feature-row').nth(index);
        await expect(row.locator('.feat')).toHaveAttribute('title', english ? 'Partial' : '部分支持');
        const note = english ? noteEn : noteZh;
        await expect(row.getByText(note, { exact: false }).filter({ visible: true })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
