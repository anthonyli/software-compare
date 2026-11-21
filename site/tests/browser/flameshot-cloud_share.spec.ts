import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.43'}});
test('flameshot cloud_share rendering in both languages and widths',async({page})=>{
  for(const width of [1280,390]){
    await page.setViewportSize({width,height:900});
    await page.goto('/p/screenshot-tools/flameshot/');
    for(const lang of ['en','zh-CN']){
      await page.locator(`[data-lang="${lang}"]`).click();
      const row=page.locator('.feature-row').nth(8);
      await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
      await expect(row.locator('p')).toHaveText(lang==='en'?"Since v13, the default build configuration excludes the Imgur uploader. Only builds compiled with ENABLE_IMGUR can upload screenshots anonymously to the third-party service Imgur. The shared quota may run out. A custom Client ID uses a separate quota, but does not link uploads to your account or make them private backups.":"从 v13 起，默认编译不含 Imgur 上传；仅启用 ENABLE_IMGUR 的构建可将截图匿名上传至第三方 Imgur。共享配额可能用尽；自定义 Client ID 只分离配额，不绑定个人账号，也不是私有备份。",{useInnerText:true});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
  }
});
