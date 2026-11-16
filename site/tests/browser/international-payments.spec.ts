import {test,expect} from '@playwright/test';
// Dedicated TEST-NET client preserves the real Worker API and production limits.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.241'}});
test('payment eligibility, transaction fees and illustrations render bilingually',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/international-payments/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:`../docs/design/previews/payment-page-home-${width}.png`});
  await page.goto('/c/international-payments/');await page.locator('[data-lang="zh-CN"]').click();
  const list=page.locator(width===1280?'#matrix':'#card-list');
  for(const id of ['dodo-payments','creem','paddle','lemon-squeezy','stripe-payments'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
  await expect(list).toContainText('4% + USD 0.40');await expect(list).not.toContainText('$4%');
  await page.screenshot({path:`../docs/design/previews/payment-page-zh-${width}.png`,fullPage:true});
  await page.locator('[data-lang="en"]').click();await expect(page.locator('h1 .t-en')).toHaveText('International payment platforms');await expect(list).toContainText('successful transaction');await expect(list).toContainText('Mainland China');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`../docs/design/previews/payment-page-en-${width}.png`,fullPage:true});
 }
 await page.goto('/p/international-payments/dodo-payments/');await expect(page.locator('body')).toContainText('4% + USD 0.40');await expect(page.locator('body')).not.toContainText('$4%');await expect(page.locator('body')).toContainText('income-tax');
 await page.screenshot({path:'../docs/design/previews/payment-page-detail.png'});
});
