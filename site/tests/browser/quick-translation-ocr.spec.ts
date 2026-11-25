import { expect, test } from '@playwright/test';

test.use({ extraHTTPHeaders: { 'CF-Connecting-IP': '198.51.100.251' } });

test('translation and OCR boundaries render in both languages on desktop and mobile', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [lang, title, boundary, bob, easydict, deepl] of [
      ['zh-CN', '快捷翻译与 OCR', '本地 OCR 不代表下一步翻译也离线', 'Bob Pro 一次性买断', '有道云 OCR 回退时，原图', '免费条款不允许提交机密或个人数据'],
      ['en', 'Quick translation and OCR', 'Local OCR does not make the next translation step offline', 'Bob Pro is a one-time purchase', 'Youdao cloud OCR fallback enabled', 'Free terms prohibit submitting confidential or personal data'],
    ] as const) {
      const locale = `[data-lang="${lang}"]`;
      await page.goto('/c/quick-translation-ocr/');
      await page.locator(locale).click();
      await expect(page.locator('h1')).toContainText(title);
      await expect(page.getByText(boundary, { exact: false }).filter({ visible: true }).first()).toBeVisible();
      const products = page.locator(width === 1280 ? '#matrix' : '#card-list');
      await expect(products.locator('[data-product-id]')).toHaveCount(3);
      for (const id of ['bob','easydict','deepl-desktop']) {
        await expect(products.locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const [id, note] of [['bob',bob], ['easydict',easydict], ['deepl-desktop',deepl]] as const) {
        await page.goto(`/p/quick-translation-ocr/${id}/`);
        await page.locator(locale).click();
        await expect(page.getByText(note, { exact: false }).filter({ visible: true }).first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
