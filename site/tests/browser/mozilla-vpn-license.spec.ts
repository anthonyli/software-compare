import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.188'}});
test('Mozilla VPN verified client license and source are present in both languages',async({page})=>{
 await page.goto('/p/vpn-clients/mozilla-vpn/');
 for(const lang of ['en','zh-CN']){
  await page.locator(`[data-lang="${lang}"]`).click();
  await expect(page.locator('body')).toContainText(lang==='en' ? 'MPL-2.0 (includes components under other open-source licenses)' : 'MPL-2.0（含其他开源许可组件）');
  const sources=page.locator('.sources-details');
  if(!(await sources.evaluate(el=>el.hasAttribute('open')))) await sources.locator('summary').click();
  await expect(page.locator('a[href="https://github.com/mozilla-mobile/mozilla-vpn-client/blob/cb5f9990d68f80c4b5e4b6124ec5bf472bfdd751/LICENSE.md"]')).toBeVisible();
 }
});
