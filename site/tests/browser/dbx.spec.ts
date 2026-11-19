import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.249'}});
test('DBX category and safety boundaries in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/database-clients/');await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="dbx"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.goto('/p/database-clients/dbx/');await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('body')).toContainText(lang==='en'?'outgoing context':'传出的上下文',{useInnerText:true});
   await expect(page.locator('body')).toContainText(lang==='en'?'external AI APIs':'外部 AI API',{useInnerText:true});
   for(let i=0;i<4;i++)await expect(page.locator('.feature-row').nth(i).locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
