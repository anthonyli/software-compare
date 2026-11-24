import {expect,test} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.229'}});
test('MiaoYan, Helium, and Tinycast render in both layouts and languages',async({page})=>{
 const entries=[
  ['note-taking','miaoyan','App Store 移动版需 iOS 18','iOS 18 or iPadOS 18'],
  ['browsers','helium','密码管理器及 Widevine','password manager, or Widevine'],
  ['launchers','tinycast','Intel Mac 使用官方单独安装渠道','Intel Macs use a separate official distribution channel'],
 ];
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [slug,id,zh,en] of entries){
   await page.goto('/c/'+slug+'/');
   await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   await page.goto(`/p/${slug}/${id}/`);
   for(const [lang,copy] of [['zh-CN',zh],['en',en]]){
    await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('body')).toContainText(copy,{useInnerText:true});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
