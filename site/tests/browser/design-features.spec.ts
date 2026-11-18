import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.199'}});
test('Image editor capability scopes survive both languages and widths',async({page})=>{
 for(const width of [1280,390])for(const [id,index,note] of [['photodemon',3,'Photoshop 8bf / 32-bit'],['pixelitor',2,'GIF']] as const){
  await page.setViewportSize({width,height:900});await page.goto(`/p/image-editors/${id}/`);
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const row=page.locator('.feature-row').nth(index);
   await expect(row.locator('.feat')).toBeVisible();await expect(row.locator('.feat')).toHaveAttribute('data-zh','部分支持');
   await expect(row.locator(lang==='en'?'.t-en':'.t-zh').filter({hasText:note})).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
