import { test, expect } from '@playwright/test';
test('AI categories have scenario guides, migrated products and no fourth category', async ({ page, request }) => {
 await page.goto('/');
 await expect(page.locator('a[href="/c/local-ai/"]')).toHaveCount(0);
 for (const slug of ['ai-assistants', 'ai-coding', 'ai-image-workflows']) {
  for (const width of [1280,390]) {
   await page.setViewportSize({width,height:900});
   await page.goto(`/c/${slug}/`);
   await expect(page.locator('[data-ai-comparison-guide]')).toBeVisible();
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
 }
 for (const id of ['ollama','lm-studio','jan']) {
  const result = await request.get(`/p/local-ai/${id}/`, { maxRedirects: 0 });
  expect(result.status()).toBe(301);
  expect(result.headers().location).toContain(`/p/ai-assistants/${id}/`);
  await page.goto(`/p/ai-assistants/${id}/`);
  await expect(page.locator('h1')).toContainText(id === 'lm-studio' ? 'LM Studio' : id === 'ollama' ? 'Ollama' : 'Jan');
 }
 const oldCategory = await request.get('/c/local-ai/', { maxRedirects: 0 });
 expect(oldCategory.status()).toBe(301);
 expect(oldCategory.headers().location).toContain('/c/ai-assistants/');
});
