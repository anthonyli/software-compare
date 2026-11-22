import {test,expect} from '@playwright/test';test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.163'}});test('Dust3D displays animation boundaries',async({page})=>{for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/animation-3d/');await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="dust3d"]')).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.goto('/p/animation-3d/dust3d/');await expect(page.locator('body')).toContainText('Procedural motion is not a complete film-animation pipeline');});

test('3ds Max renders version-specific platform and Arnold licensing in both layouts',async({page})=>{
 await page.setExtraHTTPHeaders({'CF-Connecting-IP':'198.51.100.169'});
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/animation-3d/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="3ds-max"]')).toBeVisible();
  await page.goto('/p/animation-3d/3ds-max/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   await expect(page.locator(`h1 .t-${active}`)).toHaveText('Autodesk 3ds Max');
   const render=page.locator('.feature-row').nth(3);
   await expect(render.locator('.feat')).toHaveAttribute('title',lang==='en'?'Yes':'支持');
   await expect(render.locator(`p .t-${active}`)).toContainText(lang==='en'?'requires a separate Arnold license':'需要单独的 Arnold 许可');
   await expect(page.locator('body')).toContainText(lang==='en'?'requires 64-bit Windows 11':'系统要求为 64 位 Windows 11',{useInnerText:true});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
