import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.233'}});
test('Framework target and ecosystem boundaries across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/mobile-frameworks/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['flutter','react-native','compose-multiplatform','dotnet-maui','tauri','capacitor'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['flutter','react-native','compose-multiplatform','dotnet-maui','tauri','capacitor']){
    await page.goto(`/p/mobile-frameworks/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    const webStatus=(id==='dotnet-maui'||id==='tauri')?(lang==='en'?'No':'不支持'):(id!=='flutter'&&id!=='capacitor')?(lang==='en'?'Partial':'部分支持'):(lang==='en'?'Yes':'支持');
    await expect(page.locator('.feature-row').nth(3).locator('.feat')).toHaveAttribute('title',webStatus);
    await expect(page.locator('body')).toContainText(id==='flutter'?(lang==='en'?'local iOS builds require a Mac':'iOS 本地构建需要 Mac'):id==='react-native'?(lang==='en'?'out-of-tree projects':'树外项目'):id==='capacitor'?(lang==='en'?'Standalone browser deployment is officially supported':'官方支持独立浏览器部署'):id==='tauri'?(lang==='en'?'An embedded WebView is not a browser deployment target':'WebView 不是独立浏览器部署目标'):id==='dotnet-maui'?(lang==='en'?'not a browser deployment target':'不是独立浏览器部署'):(lang==='en'?'Kotlin/Wasm Compose UI target remains in beta':'基于 Kotlin/Wasm 的 Compose UI 仍为 Beta'),{useInnerText:true});
    if(id==='capacitor'){
     await expect(page.locator('.feature-row').nth(4).locator('.feat')).toHaveAttribute('title',lang==='en'?'No':'不支持');
     await expect(page.locator('body')).toContainText(lang==='en'?'Browser implementations vary by plugin':'浏览器端实现因插件而异',{useInnerText:true});
    }
    if(id==='compose-multiplatform'){
     await expect(page.locator('.feature-row').nth(1).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
     await expect(page.locator('body')).toContainText(lang==='en'?'Compose Hot Reload runs on desktop JVM':'Compose Hot Reload 适用于桌面 JVM',{useInnerText:true});
    }
    if(id==='dotnet-maui'){
     await expect(page.locator('body')).toContainText(lang==='en'?'Linux is not an official desktop target':'Linux 不是官方桌面目标',{useInnerText:true});
     await expect(page.locator('body')).toContainText(lang==='en'?'does not reload C# code':'不重载 C# 代码',{useInnerText:true});
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
