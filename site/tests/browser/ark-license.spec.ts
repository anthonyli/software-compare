import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.191'}});
test('Ark project license and evidence render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/archivers/ark/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   await expect(page.locator('body')).toContainText('GPL-2.0-or-later');
   const sources=page.locator('.sources-details');
   if(!(await sources.evaluate(el=>el.hasAttribute('open'))))await sources.locator('summary').click();
   await expect(page.locator('a[href="https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/app/org.kde.ark.appdata.xml"]')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
