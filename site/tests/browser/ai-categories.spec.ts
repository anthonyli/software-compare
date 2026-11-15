import { test, expect, type Locator } from '@playwright/test';
import fs from 'node:fs';
const aiSlugs = ['ai-assistants', 'ai-coding', 'ai-image-workflows'];
const catalogIds = Object.fromEntries(aiSlugs.map(slug => {
 const catalog = JSON.parse(fs.readFileSync(new URL(`../../../categories/${slug}.json`, import.meta.url), 'utf8'));
 const ids: string[] = catalog.products.map((product: {id: string}) => product.id);
 expect(ids.length, `${slug}: nonempty catalog`).toBeGreaterThan(0);
 expect(ids.every(id => typeof id === 'string' && id.length > 0)).toBe(true);
 expect(new Set(ids).size, `${slug}: duplicate catalog IDs`).toBe(ids.length);
 return [slug, ids.sort()];
}));
async function expectCatalogItems(items: Locator, slug: string) {
 const expected = catalogIds[slug];
 await expect(items).toHaveCount(expected.length);
 // Count alone cannot detect a missing item replaced by a duplicate/wrong item.
 await expect.poll(async () => (await items.evaluateAll(nodes =>
  nodes.map(node => node.getAttribute('data-product-id')))).sort()).toEqual(expected);
}

test('AI categories have scenario guides, migrated products and no fourth category', async ({ page, request }) => {
 await page.goto('/');
 await expect(page.locator('a[href="/c/local-ai/"]')).toHaveCount(0);
 for (const slug of aiSlugs) {
  for (const width of [1280,390]) {
   await page.setViewportSize({width,height:900});
   await page.goto(`/c/${slug}/`);
   await expect(page.locator('[data-ai-comparison-guide]')).toBeVisible();
   const items = page.locator(width === 1280 ? '#matrix tbody tr' : '#card-list [data-product-id]');
   await expectCatalogItems(items, slug);
   await expect(items.first()).toBeVisible();
   await expect(items.last()).toBeVisible();
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

test('AI comparison tables include expanded tools and readable conditions', async ({page}) => {
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/c/ai-assistants/');
 await expectCatalogItems(page.locator('#matrix tbody tr'), 'ai-assistants');
 await expect(page.locator('#matrix [data-product-id="deepseek"]')).toContainText('DeepSeek');
 await expect(page.locator('#matrix thead')).toContainText('用途 / 数据与使用边界');
 const row = page.locator('#matrix [data-product-id="kimi"]');
 await row.locator('summary').click();
 await expect(row.locator('details')).toHaveAttribute('open','');
 await row.locator('summary').click();
 await expect(row.locator('details')).not.toHaveAttribute('open','');
 await expect(row.locator('.ai-cell-note').first()).toBeVisible();
 await page.goto('/c/ai-coding/');
 await expectCatalogItems(page.locator('#matrix tbody tr'), 'ai-coding');
 await expect(page.locator('#matrix [data-product-id="cursor"]')).toContainText('Cursor');
 await expect(page.locator('#matrix [data-product-id="craft-anything"]')).toContainText('Craft Anything');
 await page.goto('/c/ai-image-workflows/');
 await expectCatalogItems(page.locator('#matrix tbody tr'), 'ai-image-workflows');
 await expect(page.locator('#matrix [data-product-id="recraft"]')).toContainText('Recraft');
 await expect(page.locator('#matrix [data-product-id="artcraft"]')).toContainText('ArtCraft');
 await page.setViewportSize({width:390,height:900});
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
 await expect(page.locator('#card-list [data-product-id="recraft"]')).toContainText('Recraft');
});
