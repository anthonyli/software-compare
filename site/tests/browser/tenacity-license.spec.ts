import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.225'}});
test('Tenacity license and official source render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/audio-editors/tenacity/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('body')).toContainText('GPL-2.0-or-later');
   const sources=page.locator('.sources-details');
   if(!(await sources.evaluate(el=>el.hasAttribute('open'))))await sources.locator('summary').click();
   await expect(page.locator('a[href="https://tenacityaudio.org/docs/"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
