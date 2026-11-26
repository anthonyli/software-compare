import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.210'}});
test('IDM scheduling is supported in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/p/downloaders/idm/');
  for(const lang of ['en','zh-CN']){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const index of [5]){
    const row=page.locator('.feature-row').nth(index);await expect(row.locator('.feat')).toHaveAttribute('data-zh','支持');
    await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});

test('IDM video notes keep the documented limits in both languages', async ({page}) => {
 for (const width of [1280,390]) {
  await page.setViewportSize({width,height:900});
  await page.goto('/p/downloaders/idm/');
  for (const lang of ['en','zh-CN']) {
   await page.locator(`[data-lang="${lang}"]`).click();
   const labels = lang==='en'
    ? ['does not support copy-protected streams or guarantee support for every M3U8 link','Adding a webpage address alone does not download the video']
    : ['不支持带有复制保护的流，也不保证支持所有 M3U8 链接','仅添加网页地址不会下载视频'];
   for (const label of labels) {
    const row = page.locator('.feature-row').filter({has:page.getByText(label,{exact:false})});
    await expect(row.getByText(label,{exact:false})).toBeVisible();
    await expect(row.locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
