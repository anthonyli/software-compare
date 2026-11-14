import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.110'}});
test('FanEar pricing and privacy boundaries render in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/c/ai-memory/');
  const list=page.locator(width===1280?'#matrix':'#card-list');await expect(list.locator('[data-product-id="fanear"]')).toBeVisible();
  await page.locator('[data-lang="en"]').click();await expect(list.locator('[data-product-id="fanear"]')).toContainText('FanEar');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/p/ai-memory/fanear/');await expect(page.locator('body')).toContainText('no memberships, subscriptions or in-app purchases');await expect(page.locator('body')).toContainText('cloud transcription sends audio');
 await page.locator('[data-lang="zh-CN"]').click();await expect(page.locator('body')).toContainText('无会员、订阅和内购');
});
