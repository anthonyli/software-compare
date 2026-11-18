import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.208'}});
test('UltraVNC feature scopes render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/remote-desktop/ultravnc/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const transfer=page.locator('.feature-row').nth(1),clip=page.locator('.feature-row').nth(2);
   for(const row of [transfer,clip]){
    await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
    await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   }
   await expect(transfer).toContainText('UltraVNC Viewer ↔ UltraVNC Server');
   await expect(clip).toContainText('-disableclipboard');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
