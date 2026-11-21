import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.233'}});
test('Framework target and ecosystem boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/mobile-frameworks/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['flutter','react-native','compose-multiplatform'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['flutter','react-native','compose-multiplatform']){
    await page.goto(`/p/mobile-frameworks/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('.feature-row').nth(3).locator('.feat')).toHaveAttribute('title',id!=='flutter'?(lang==='en'?'Partial':'部分支持'):(lang==='en'?'Yes':'支持'));
    await expect(page.locator('body')).toContainText(id==='flutter'?(lang==='en'?'local iOS builds require a Mac':'iOS 本地构建需要 Mac'):id==='react-native'?(lang==='en'?'out-of-tree projects':'树外项目'):(lang==='en'?'Kotlin/Wasm Compose UI target remains in beta':'基于 Kotlin/Wasm 的 Compose UI 仍为 Beta'),{useInnerText:true});
    if(id==='compose-multiplatform'){
     await expect(page.locator('.feature-row').nth(1).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
     await expect(page.locator('body')).toContainText(lang==='en'?'Compose Hot Reload runs on desktop JVM':'Compose Hot Reload 适用于桌面 JVM',{useInnerText:true});
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
