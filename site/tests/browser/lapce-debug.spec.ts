import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Lapce DAP debugger across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/code-editors/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="lapce"]')).toBeVisible();
 await page.goto('/p/code-editors/lapce/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');await expect(page.locator('body')).toContainText(lang==='en'?'must specify a debugger type':'运行配置须指定调试器类型',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
