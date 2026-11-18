import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.145'}});
for(const width of [1280,390])test(`Graphite scoped self-hosting at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const lang of ['zh-CN','en']){
  await page.goto('/c/vector-graphics/');await page.locator(`[data-lang="${lang}"]`).click();
  const row=page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="graphite"]');
  if(width===1280){
   const feature=row.locator('span.feat[title*="cargo run build web"]');
   await expect(feature).toBeVisible();await expect(feature).toHaveAttribute('title',/not a collaboration server/);
  } else {
   await expect(row.locator('.feat-mini > div').last().locator('.feat')).toBeVisible();
   await expect(row.locator('.feat-mini > div').last().locator('.feat')).toContainText(lang==='en'?'Partial':'部分');
  }
  await page.goto('/p/vector-graphics/graphite/');
  await expect(page.locator('body')).toContainText('frontend/dist');await expect(page.locator('body')).toContainText('deployment setup required');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
