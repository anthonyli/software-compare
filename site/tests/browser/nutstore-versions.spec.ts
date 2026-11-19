import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.235'}});
test('Nutstore version retention across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/file-sync/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="nutstore"]')).toBeVisible();
 await page.goto('/p/file-sync/nutstore/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');await expect(page.locator('body')).toContainText(lang==='en'?'retention is not permanent':'不是永久保留',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
