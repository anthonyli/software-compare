import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Nutstore conflict-copy handling across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/file-sync/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="nutstore"]')).toBeVisible();
 await page.goto('/p/file-sync/nutstore/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(5).locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');await expect(page.locator('body')).toContainText(lang==='en'?'not automatic content merging':'内容不同仍需人工比对、合并',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
