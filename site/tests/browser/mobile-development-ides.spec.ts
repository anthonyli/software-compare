import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.232'}});
test('Mobile IDE host and simulator limits across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/mobile-development-ides/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['android-studio','xcode','jetbrains-rider'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['android-studio','xcode','jetbrains-rider']){
    await page.goto(`/p/mobile-development-ides/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('.feature-row').nth(0).locator('.feat')).toHaveAttribute('title',id==='xcode'?(lang==='en'?'Yes':'支持'):(lang==='en'?'Partial':'部分支持'));
    await expect(page.locator('body')).toContainText(id==='android-studio'?'ChromeOS':id==='xcode'?(lang==='en'?'The host is macOS only':'宿主仅 macOS'):(lang==='en'?'Local iOS runs require a Mac and Xcode':'iOS 本地运行需要 Mac 和 Xcode'),{useInnerText:true});
    if(id==='jetbrains-rider'){
     const preview=page.locator('.feature-row').nth(2);
     await expect(preview.getByText(lang==='en'?'no built-in MAUI XAML designer or previewer':'没有内置 MAUI XAML 设计器或预览器',{exact:false})).toBeVisible();
     await expect(page.getByText(lang==='en'?'Free for personal non-commercial use; commercial use requires a subscription':'个人非商业用途免费，商用需购买订阅',{exact:false}).filter({visible:true}).first()).toBeVisible();
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
