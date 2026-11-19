import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.239'}});
test('Bitwarden emergency access paid status stays localized on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/p/password-managers/bitwarden/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(8);
   await expect(row.locator('.feat')).toHaveText(lang==='en'?'Paid':'付费档',{useInnerText:true});
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','付费档提供');
   await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'On paid plans':'付费档提供');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
