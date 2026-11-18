import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.202'}});
test('OpenSCAD partial SVG scope remains visible in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/cad/openscad/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const row=page.locator('.feature-row').nth(3);
   await expect(row.locator('.feat')).toHaveAttribute('data-zh','部分支持');
   await expect(row.locator('p '+(lang==='en'?'.t-en':'.t-zh'))).toHaveText('2021.01 · 2D · SVG');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
