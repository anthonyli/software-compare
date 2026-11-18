import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.205'}});
test('File sync verified capabilities render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [id,index,note] of [['unison',9,'rsync'],['resilio-sync',10,'.sync/IgnoreList']] as const){
   await page.goto('/p/file-sync/'+id+'/');
   for(const lang of ['en','zh-CN']){
    await page.locator(`[data-lang="${lang}"]`).click();const row=page.locator('.feature-row').nth(index);
    await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
    await expect(row.locator('p '+(lang==='en'?'.t-en':'.t-zh'))).toHaveText(note);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
