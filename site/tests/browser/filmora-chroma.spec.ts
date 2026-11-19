import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.251'}});
test('Filmora desktop chroma key in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/video-editors/filmora/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(7);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
   await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
