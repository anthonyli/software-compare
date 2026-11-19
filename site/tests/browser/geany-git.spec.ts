import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Geany plugin Git integration across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/code-editors/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="geany"]')).toBeVisible();
 await page.goto('/p/code-editors/geany/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(2).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');await expect(page.locator('body')).toContainText(lang==='en'?'Requires the GeanyVC plugin':'需安装并启用 GeanyVC 插件',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
