import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.247' } });

test('terminal emulators render distinct, bilingual rows and details on desktop and mobile', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, freeBsd, windowsNote, kakuNote] of [
      ['zh-CN', '终端模拟器', 'FreeBSD 支持 GTK 图形端', '不是官方 Ghostty 图形终端', '服务费用另计'],
      ['en', 'Terminal emulators', 'FreeBSD supports the GTK GUI', 'not an official Ghostty GUI terminal', 'which may charge separately'],
    ] as const) {
      await page.goto('/c/terminal-emulators/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.locator('h1')).toContainText(title);
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      for (const id of ['kaku', 'ghostty', 'wezterm', 'iterm2']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      await expect(products.locator('[data-product-id="ratatui"]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      await page.goto('/p/terminal-emulators/ghostty/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.getByText(freeBsd, { exact: false }).filter({ visible: true })).toBeVisible();
      await expect(page.getByText(windowsNote, { exact: false }).filter({ visible: true })).toBeVisible();
      const lua = page.locator('.feature-row').nth(3);
      await expect(lua.locator('.feat')).toHaveAttribute('title', lang === 'en' ? 'No' : '不支持');

      await page.goto('/p/terminal-emulators/iterm2/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.getByText(lang==='en'?'combined distribution effectively uses GPL v3':'组合发行实际按 GPL v3',{exact:false}).filter({visible:true}).first()).toBeVisible();
      await expect(page.locator('.feature-row').nth(3).getByText('Python API',{exact:false}).filter({visible:true})).toBeVisible();

      await page.goto('/p/terminal-emulators/kaku/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.getByText(kakuNote, { exact: false }).filter({ visible: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
