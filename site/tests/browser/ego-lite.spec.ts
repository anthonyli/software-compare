import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.196'}});
for(const width of [1280,390])test(`ego lite scoped pricing and license at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/c/browsers/');
 const row=page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="ego-lite"]');await expect(row).toBeVisible();
 await expect(row).toContainText('Business');await expect(row).toContainText('外部 Agent');
 await page.locator('[data-lang="en"]').click();await expect(row).toContainText('custom pricing');
 await page.goto('/p/browsers/ego-lite/');await expect(page.locator('body')).toContainText('Native browser is closed source');await expect(page.locator('body')).toContainText('share cookies and cache');await expect(page.locator('body')).toContainText('page text and screenshots');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goBack();await expect(page.locator('h1')).toHaveText('Web browsers',{useInnerText:true});
});
