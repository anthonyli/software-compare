import { expect, test } from '@playwright/test';

const cases = [
  {
    route: '/p/photo-management/immich/',
    zh: '这不等于专业 RAW 显影。',
    en: 'That is different from professional RAW development.',
  },
  {
    route: '/p/cycling-tools/mywhoosh/',
    zh: '第三方历史活动的导入支持尚未确认。',
    en: 'Support for importing third-party activity history has not been verified.',
  },
];

for (const product of cases) {
  test(`${product.route} shows the full capability boundary in each language`, async ({ page }) => {
    await page.goto(product.route);
    for (const [lang, expected] of [['zh-CN', product.zh], ['en', product.en]]) {
      await page.locator(`[data-lang="${lang}"]`).click();
      const note = page.locator('.feature-row').getByText(expected, { exact: false });
      await expect(note).toBeVisible();
    }
  });
}
