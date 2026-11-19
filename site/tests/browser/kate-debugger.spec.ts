import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.234'}});
test('Kate debugger partial status in both languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/code-editors/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="kate"]')).toBeVisible();
 await page.goto('/p/code-editors/kate/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
