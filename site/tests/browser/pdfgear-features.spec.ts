import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.198'}});
test('PDFgear Windows capabilities preserve scope in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/pdf-tools/pdfgear/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const index of [1,3,6]){
    const row=page.locator('.feature-row').nth(index);
    await expect(row.locator('.feat')).toBeVisible();await expect(row.locator('.feat-empty')).toHaveCount(0);
    await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
    await expect(row.locator(lang==='en'?'.t-en':'.t-zh').filter({hasText:'Windows'})).toBeVisible();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
