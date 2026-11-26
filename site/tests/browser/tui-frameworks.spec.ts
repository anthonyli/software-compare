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
      for (const id of ['bubble-tea', 'ratatui', 'textual', 'terminal-gui', 'spectre-console']) {
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
      await page.goto('/p/tui-frameworks/spectre-console/');
      await page.locator(`[data-lang="${lang}"]`).click();
      const input = page.locator('.feature-row').nth(2);
      await expect(input.locator('.feat')).toHaveAttribute('title', english ? 'Partial' : '部分支持');
      const testing = page.locator('.feature-row').nth(3);
      const active = testing.locator(english ? 'p .t-en' : 'p .t-zh').filter({ hasText: 'TestConsole' });
      const inactive = testing.locator(english ? 'p .t-zh' : 'p .t-en').filter({ hasText: 'TestConsole' });
      await expect(active).toBeVisible();
      await expect(inactive).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/p/tui-frameworks/terminal-gui/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.locator('.feature-row').nth(3).getByText(english ? 'render buffer capture' : '捕获绘制缓冲区', { exact: false }).filter({ visible: true })).toBeVisible();
      await expect(page.locator('.feature-row').nth(4).getByText(english ? 'Browser support was not confirmed' : '未确认浏览器运行', { exact: false }).filter({ visible: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
