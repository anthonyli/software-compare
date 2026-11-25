import {test,expect} from '@playwright/test';

test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.231'}});
test('Reelbird displays local export and sharing boundaries in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [lang,watermark,share,host] of [
   ['zh-CN','不启用分享也能在本机录制','编辑前上传；持链接者可看','Apple 芯片、macOS 15+'],
   ['en','locally with no watermark','uploads before editing; anyone with the link can view','Apple silicon on macOS 15+'],
  ]){
   await page.goto('/c/screen-recorders/');
   const products=page.locator(width===1280?'#matrix':'#card-list');
   await expect(products.locator('[data-product-id="reelbird"]')).toBeVisible();
   await page.goto('/p/screen-recorders/reelbird/');
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const text of [watermark,share,host]){
    await expect(page.getByText(text,{exact:false}).filter({visible:true}).first()).toBeVisible();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
