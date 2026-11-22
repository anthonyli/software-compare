import {test,expect} from '@playwright/test';
test('hand-drawn additions render at both widths with localized limitations',async({page})=>{
 for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/animation-2d/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['pencil2d','tahoma2d'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/p/animation-2d/tahoma2d/');await expect(page.locator('body')).toContainText('Mac download is labeled Intel');
 await page.goto('/p/animation-2d/pencil2d/');await expect(page.locator('body')).toContainText('unknown does not mean unsupported');
});

test('Moho shows its trial and bitmap asset boundaries in both layouts and languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/animation-2d/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="moho"]')).toBeVisible();
  await page.goto('/p/animation-2d/moho/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   await expect(page.locator(`h1 .t-${active}`)).toHaveText('Moho 14');
   const raster=page.locator('.feature-row').nth(1);
   await expect(raster.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   await expect(raster.locator(`p .t-${active}`)).toContainText(lang==='en'?'up to 10 PSD layers':'最多导入 10 个 PSD 图层');
   const graph=page.locator('.feature-row').nth(3);
   await expect(graph.locator('.feat-empty')).toHaveAttribute('title',lang==='en'?'Unknown':'未知');
   await expect(page.locator('.price-panel')).toContainText('59.99');
   await expect(page.locator('.price-panel')).toContainText('399.99');
   await expect(page.locator('body')).toContainText(lang==='en'?'providing an email address adds another 15':'提交邮箱可再延长 15 天',{useInnerText:true});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
