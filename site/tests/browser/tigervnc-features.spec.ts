import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.207'}});
test('TigerVNC viewer feature scopes render in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/remote-desktop/tigervnc/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const clip=page.locator('.feature-row').nth(2),multi=page.locator('.feature-row').nth(3);
   await expect(clip.locator('.feat')).toHaveAttribute('data-zh','支持');await expect(clip.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   await expect(multi.locator('.feat')).toHaveAttribute('data-zh','部分支持');await expect(multi.locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   await expect(clip).toContainText('AcceptClipboard / SendClipboard');await expect(multi).toContainText('FullScreenMode=all/selected');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
