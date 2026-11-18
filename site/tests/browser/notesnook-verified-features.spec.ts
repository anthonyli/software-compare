import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.204'}});
test('Notesnook rich text and browser clipping remain visible in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/note-taking/notesnook/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const i of [1,4])await expect(page.locator('.feature-row').nth(i).locator('.feat')).toHaveAttribute('data-zh','支持');
   await expect(page.locator('.feature-row').nth(4).locator('p '+(lang==='en'?'.t-en':'.t-zh'))).toHaveText('Chromium / Firefox');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
