import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.194'}});
test('browser discovery, comparison and detail retain bilingual boundaries',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/browsers/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();
  await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.goto('/c/browsers/');
  for(const id of ['chrome','firefox','safari','edge','brave','comet','dia'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
  await page.locator('[data-lang="en"]').click();await expect(page.locator('h1')).toHaveText('Web browsers');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/p/browsers/dia/');await expect(page.locator('body')).toContainText('14-day AI trial');await expect(page.locator('body')).toContainText('30 days');
 await page.goBack();await expect(page.locator('h1')).toHaveText('Web browsers');
});
