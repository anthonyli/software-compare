import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.45'}});
test('guacamole session_recording rendering in both languages and widths',async({page})=>{
  for(const width of [1280,390]){
    await page.setViewportSize({width,height:900});
    await page.goto('/p/remote-desktop/guacamole/');
    for(const lang of ['en','zh-CN']){
      await page.locator(`[data-lang="${lang}"]`).click();
      const row=page.locator('.feature-row').nth(9);
      await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
      await expect(row.locator('p')).toHaveText(lang==='en'?"Server-side graphical recording requires recording-path on the connection and is off without it. Even after capture succeeds, browser playback from connection history requires the recording storage extension and web app read access to the directory and file. Either the recording file directly in the configured search path or an immediate subdirectory containing it must be named after the history entry UUID.":"服务端图形录制需为连接配置 recording-path，未配置则不录制。即使已录制，从历史记录在浏览器回放仍需启用录制存储扩展，且 Web 应用必须能读取目录和文件。录制文件需直接位于搜索路径下并以历史记录的 UUID 命名，或放在该路径下以 UUID 命名的一级子目录中。",{useInnerText:true});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    }
  }
});
