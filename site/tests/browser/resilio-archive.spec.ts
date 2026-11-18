import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.221'}});
test('Resilio Archive is partial in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/file-sync/resilio-sync/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(4);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','部分支持');
   await expect(row.locator('p '+(lang==='en'?'.t-en':'.t-zh'))).toHaveText('.sync/Archive');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
