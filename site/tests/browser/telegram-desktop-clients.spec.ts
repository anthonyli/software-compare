import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '203.0.113.249' } });

const variants = [
  { lang:'zh-CN', title:'Telegram 桌面客户端', boundary:'不推荐留存或规避平台规则',
    details: {'ayugram-desktop':['SHA-256 摘要不能证明 Mac 包获公证','编辑历史；不含媒体'],
      'telegram-desktop':['原生 macOS 版的秘密聊天说明不能套用','客户端与服务器加密，不是端到端加密']} },
  { lang:'en', title:'Telegram desktop clients', boundary:'not an endorsement of retention or evasion',
    details: {'ayugram-desktop':['not proof of Mac notarization','plus edit history, not media'],
      'telegram-desktop':["native macOS app's Secret Chats documentation","client-server encryption for ordinary cloud chats"]} },
] as const;

test('desktop distribution and privacy distinctions appear in both screen layouts', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const {lang,title,boundary,details} of variants) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/telegram-desktop-clients/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.locator('[data-telegram-desktop-notes]').getByText(boundary, { exact: false }).filter({ visible: true })).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(2);
      for (const id of Object.keys(details)) await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id,notes] of Object.entries(details)) {
        await page.goto(`/p/telegram-desktop-clients/${id}/`);
        await page.locator(locale).click();
        for (const note of notes) await expect(page.getByText(note, { exact:false }).filter({ visible:true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
