import {test, expect} from '@playwright/test';

test('finds confirmed scrolling-capture tools from the full index in both languages', async ({page}) => {
  await page.goto('/');
  const input = page.locator('#site-search-hero');
  const results = input.locator('..').locator('..').locator('[data-search-results]');
  const hit = (id: string) => results.locator(`a[href="/p/screenshot-tools/${id}/"]`);
  for (const [lang, queries] of [
    ['zh-CN', ['滚动长截图', '长截图', '滚动截图']],
    ['en', ['scrolling screenshot', 'scrolling capture']],
  ] as const) {
    await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    for (const query of queries) {
      await input.fill(query);
      await expect(hit('pixpin')).toBeVisible();
      await expect(hit('shottr')).toBeVisible();
      await expect(hit('flameshot')).toHaveCount(0);
      await expect(hit('greenshot')).toHaveCount(0);
    }
  }
  await input.fill('Flameshot');
  await expect(hit('flameshot')).toBeVisible();
});
