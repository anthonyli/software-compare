import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.232'}});
test('Mobile IDE host and simulator limits across languages and widths',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/mobile-development-ides/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['android-studio','xcode'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['android-studio','xcode']){
    await page.goto(`/p/mobile-development-ides/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('.feature-row').nth(0).locator('.feat')).toHaveAttribute('title',id==='android-studio'?(lang==='en'?'Partial':'部分支持'):(lang==='en'?'Yes':'支持'));
    await expect(page.locator('body')).toContainText(id==='android-studio'?'ChromeOS':(lang==='en'?'The host is macOS only':'宿主仅 macOS'),{useInnerText:true});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
