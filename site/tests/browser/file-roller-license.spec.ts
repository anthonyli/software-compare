import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.192'}});
test('File Roller verified project license and sources survive language and width changes',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/archivers/file-roller/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('body')).toContainText('GPL-2.0-or-later');
   const sources=page.locator('.sources-details');
   if(!(await sources.evaluate(el=>el.hasAttribute('open'))))await sources.locator('summary').click();
   await expect(page.locator('a[href="https://github.com/GNOME/file-roller/blob/8ab872836c7f126c8def2762ff2496b4efe971cd/data/org.gnome.FileRoller.metainfo.xml.in"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
