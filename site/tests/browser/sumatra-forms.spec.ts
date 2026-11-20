import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Sumatra form pre-release boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/pdf-tools/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="sumatra-pdf"]')).toBeVisible();
 await page.goto('/p/pdf-tools/sumatra-pdf/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(6).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');await expect(page.locator('body')).toContainText(lang==='en'?'Windows 3.7 pre-release':'Windows 3.7 预发布',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
