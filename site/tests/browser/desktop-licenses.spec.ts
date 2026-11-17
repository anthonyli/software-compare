import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.185'}});
test('verified desktop licenses retain scope in both languages',async({page})=>{
 for(const [category,id,license] of [
  ['password-managers','keeweb','MIT'],
  ['downloaders','motrix','MIT (project code; third-party components separately licensed)'],
 ]){
  await page.goto(`/p/${category}/${id}/`);
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('body')).toContainText(license);
   await expect(page.locator('a[href*="/blob/"][href$="/LICENSE"]').first()).toBeVisible();
  }
 }
});
