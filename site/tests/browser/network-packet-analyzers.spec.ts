import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.230'}});
test('packet analyzer category and product boundaries in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/network-packet-analyzers/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['wireshark','tcpdump'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['wireshark','tcpdump']){
    await page.goto(`/p/network-packet-analyzers/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('body')).toContainText(id==='wireshark'?(lang==='en'?'session secrets':'会话秘密'):(lang==='en'?'Windows source builds':'Windows 官方源码构建'),{useInnerText:true});
    await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',id==='wireshark'?(lang==='en'?'Yes':'支持'):(lang==='en'?'No':'不支持'));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
