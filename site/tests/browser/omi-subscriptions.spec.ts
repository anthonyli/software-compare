import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.108'}});
test('Omi trial and cancellation boundaries render in both languages',async({page})=>{
for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/ai-memory/');const list=page.locator(width===1280?'#matrix':'#card-list');await expect(list.locator('[data-product-id="omi"]')).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
await page.goto('/p/ai-memory/omi/');await expect(page.locator('body')).toContainText('trials convert to paid plans unless cancelled beforehand');await expect(page.locator('body')).toContainText('actual purchase channel');
});
