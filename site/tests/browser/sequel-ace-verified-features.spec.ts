import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.203'}});
test('Sequel Ace editing and exchange scope remain visible in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/database-clients/sequel-ace/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const i of [1,3])await expect(page.locator('.feature-row').nth(i).locator('.feat')).toHaveAttribute('data-zh','支持');
   await expect(page.locator('.feature-row').nth(3).locator('p '+(lang==='en'?'.t-en':'.t-zh'))).toHaveText('SQL / CSV');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
