import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.231'}});
test('HTTP debugging category and paid boundaries in both languages and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const lang of ['en','zh-CN']){
   await page.goto('/c/http-debugging/');await page.locator(`[data-lang="${lang}"]`).click();
   for(const id of ['mitmproxy','charles','proxyman','http-toolkit','fiddler-everywhere'])await expect(page.locator(width===1280?'#matrix':'#card-list').locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const id of ['mitmproxy','charles','proxyman','http-toolkit','fiddler-everywhere']){
    await page.goto(`/p/http-debugging/${id}/`);await page.locator(`[data-lang="${lang}"]`).click();
    const paid=id==='charles'||id==='proxyman'||id==='fiddler-everywhere';
    await expect(page.locator('.feature-row').nth(0).locator('.feat')).toHaveAttribute('title',paid?(lang==='en'?'On paid plans':'付费档提供'):(lang==='en'?'Yes':'支持'));
    if(id==='proxyman'){
     const limit=lang==='en'?'The official pricing table lists a one-rule limit for Starter and excludes Breakpoint and Map Local.':'官方定价表列明 Starter 的调试规则限 1 条，不含断点和 Map Local';
     await expect(page.getByText(limit,{exact:false}).filter({visible:true})).toBeVisible();
    }
    if(id==='fiddler-everywhere'){
     const rows=page.locator('.feature-row');
     await expect(rows.nth(1).getByText(lang==='en'?'start with Pro':'从 Pro 起，Lite 不含',{exact:false})).toBeVisible();
     await expect(rows.nth(2).getByText(lang==='en'?'lists replay on Lite':'Lite 已含重放',{exact:false})).toBeVisible();
     await expect(page.getByText(lang==='en'?'10-day trial is not a permanent free plan':'10 天试用，不是长期免费',{exact:false}).filter({visible:true}).first()).toBeVisible();
    }
    if(id==='http-toolkit'){await expect(page.locator('body')).toContainText(lang==='en'?'iOS needs manual proxy':'iOS 需手动代理',{useInnerText:true});await expect(page.locator('.feature-row').nth(2).locator('.feat')).toHaveAttribute('title',lang==='en'?'On paid plans':'付费档提供');}
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   }
  }
 }
});
