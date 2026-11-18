import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.200'}});
test('Zed debugging and remote protocols render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/code-editors/zed/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();const active=lang==='en'?'.t-en':'.t-zh';
   for(const [index,note] of [[4,'DAP'],[7,'SSH']] as const){
    const row=page.locator('.feature-row').nth(index);await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
    await expect(row.locator('p '+active)).toHaveText(note);
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
