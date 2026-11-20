import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.241'}});
test('Transmission scheduling boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/downloaders/');await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="transmission"]')).toBeVisible();
   await page.goto('/p/downloaders/transmission/');await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('.feature-row').nth(5).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   await expect(page.locator('body')).toContainText(lang==='en'?'disabled by default':'默认关闭',{useInnerText:true});
   await expect(page.locator('body')).toContainText(lang==='en'?'does not imply scheduled start or stop':'不等同任意下载任务',{useInnerText:true});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
