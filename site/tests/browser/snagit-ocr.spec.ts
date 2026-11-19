import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Snagit OCR version boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/screenshot-tools/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="snagit"]')).toBeVisible();
 await page.goto('/p/screenshot-tools/snagit/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(5).locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');await expect(page.locator('body')).toContainText(lang==='en'?'legacy Windows OCR engine':'Windows 旧 OCR 引擎',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
