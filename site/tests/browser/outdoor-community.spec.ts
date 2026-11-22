import {test,expect} from '@playwright/test';
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.102'}});
test('outdoor community tools render and explain offline scope',async({page})=>{for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/outdoor-navigation/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['gaia-gps','wikiloc'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.goto('/p/outdoor-navigation/gaia-gps/');await expect(page.locator('body')).toContainText('new tracks default to public after accepting');await page.goto('/p/outdoor-navigation/wikiloc/');await expect(page.locator('body')).toContainText('Free offline maps do not make all navigation free');});

test('Locus Map renders separate offline routing and iOS Lite boundaries',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/outdoor-navigation/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="locus-map"]')).toBeVisible();
  await page.goto('/p/outdoor-navigation/locus-map/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   const offline=page.locator('.feature-row').nth(0);
   await expect(offline.locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   await expect(offline.locator(`p .t-${active}`)).toBeVisible();
   await expect(offline.locator(`p .t-${active}`)).toContainText(lang==='en'?'Offline maps do not imply offline routing':'有离线地图不等于能离线算路');
   await expect(page.locator('.feature-row').nth(1).locator(`p .t-${active}`)).toContainText(lang==='en'?'but not turn-by-turn route navigation':'尚不支持沿路线逐向导航');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
