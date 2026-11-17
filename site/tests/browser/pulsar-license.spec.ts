import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.187'}});
test('Pulsar verified license and source are present in both languages',async({page})=>{
 await page.goto('/p/code-editors/pulsar/');
 for(const lang of ['en','zh-CN']){
  await page.locator(`[data-lang="${lang}"]`).click();
  await expect(page.locator('body')).toContainText('MIT');
  const sources=page.locator('.sources-details');
  if(!(await sources.evaluate(el=>el.hasAttribute('open')))) await sources.locator('summary').click();
  await expect(page.locator('a[href="https://github.com/pulsar-edit/pulsar/blob/7573f2b73406082491b8083bc2746cbfd1a9732f/LICENSE.md"]')).toBeVisible();
 }
});
