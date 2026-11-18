import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.209'}});
test('digiKam versioning and scoped tethering render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/photo-management/digikam/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const versioning=page.locator('.feature-row').nth(2);
   await expect(versioning.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   await expect(versioning).toContainText('Versioning');
   const tethering=page.locator('.feature-row').nth(3);
   await expect(tethering.locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   await expect(tethering).toContainText('gPhoto2');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
