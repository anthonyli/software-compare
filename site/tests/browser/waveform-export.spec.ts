import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.241'}});
test('Waveform Free audio export in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/audio-editors/waveform-free/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(9);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
   await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
