import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.237'}});
test('Helix experimental debugger across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh-CN']){
 await page.goto('/c/code-editors/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="helix"]')).toBeVisible();
 await page.goto('/p/code-editors/helix/');await page.locator(`[data-lang="${lang}"]`).click();await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');await expect(page.locator('body')).toContainText(lang==='en'?'Built-in experimental debugging commands':'内置实验性调试命令',{useInnerText:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }}
});
