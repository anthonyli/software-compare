import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.252'}});
test('Mobile UI testing target and WebView boundaries in both languages and widths',async({page})=>{
  const slug='mobile-app-ui-testing';
  for(const width of [1280,390]){
    await page.setViewportSize({width,height:900});
    for(const lang of ['en','zh-CN']){
      const english=lang==='en';
      await page.goto('/c/'+slug+'/');
      await page.locator(`[data-lang="${lang}"]`).click();
      await expect(page.locator('h1')).toContainText(english?'Mobile app UI testing':'移动应用 UI 自动化测试',{useInnerText:true});
      for(const id of ['appium','maestro-cli']){
        await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
      }
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      for(const id of ['appium','maestro-cli']){
        const isAppium=id==='appium';
        await page.goto(`/p/${slug}/${id}/`);
        await page.locator(`[data-lang="${lang}"]`).click();
        const device=page.locator('.feature-row').nth(4);
        const webview=page.locator('.feature-row').nth(5);
        await expect(device.locator('.feat')).toHaveAttribute('title',isAppium?(english?'Yes':'支持'):(english?'No':'不支持'));
        if(isAppium){
          await expect(device.locator('p')).toContainText(english?'iOS 18 or later':'iOS 18 及以上真机',{useInnerText:true});
          await expect(device.locator('p')).toContainText(english?'RemoteXPC tunnel':'RemoteXPC 隧道',{useInnerText:true});
        }
        await expect(webview.locator('.feat')).toHaveAttribute('title',isAppium?(english?'Yes':'支持'):(english?'Partial':'部分支持'));
        await expect(webview.locator('p')).toContainText(isAppium?'ChromeDriver':'DevTools',{useInnerText:true});
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      }
    }
  }
});

test('Detox renders asynchronous sync and iOS simulator-only scope on both layouts', async ({page}) => {
 for (const width of [1280,390]) {
  await page.setViewportSize({width,height:900});
  await page.goto('/c/mobile-app-ui-testing/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="detox"]')).toBeVisible();
  await page.goto('/p/mobile-app-ui-testing/detox/');
  for (const lang of ['zh-CN','en']) {
   await page.locator(`[data-lang="${lang}"]`).click();
   const english=lang==='en', active=english?'en':'zh', rows=page.locator('.feature-row');
   await expect(rows.nth(4).locator('.feat')).toHaveAttribute('title',english?'No':'不支持');
   await expect(rows.nth(5).locator('.feat')).toHaveAttribute('title',english?'Partial':'部分支持');
   await expect(rows.nth(0).locator(`p .t-${active}`)).toContainText(english?'wait for app-internal asynchronous work':'可等待应用异步工作');
   await expect(rows.nth(3).locator(`p .t-${active}`)).toContainText(english?'requires macOS and Xcode':'需 macOS 和 Xcode');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
