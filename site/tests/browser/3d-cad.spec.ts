import {test,expect} from '@playwright/test';
test('3D and CAD additions render bilingual rows at both widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [slug,ids] of Object.entries({'animation-3d':['maya','cinema-4d','wings-3d'],cad:['qcad-ce']})){
   await page.goto(`/c/${slug}/`);const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ids)await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
   await page.locator('[data-lang="en"]').click();await expect(page.locator('[data-lang="en"]')).toHaveAttribute('aria-pressed','true');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.locator('[data-lang="zh-CN"]').click();
  }
 }
 await page.goto('/p/cad/qcad-ce/');await page.locator('[data-lang="en"]').click();await expect(page.locator('body')).toContainText('SVG export requires Professional.');
 await page.goto('/p/animation-3d/wings-3d/');await expect(page.locator('body')).toContainText('animation is unsupported.');
});

test('Spline keeps tier and interchange boundaries visible in both locales and widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/animation-3d/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="spline"]')).toBeVisible();
  await page.goto('/p/animation-3d/spline/');
  for(const [lang,rig,hosting,gltf] of [
   ['zh-CN','未确认在 Spline 内创建骨骼','完整自托管包需 Enterprise','不会保留 Spline 的状态、事件或交互'],
   ['en','does not establish in-editor bone creation','full self-hosting requires Enterprise','does not retain Spline states, events or interactivity'],
  ]){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(const value of [rig,hosting,gltf]){
    await expect(page.getByText(value,{exact:false}).filter({visible:true}).first()).toBeVisible();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});

test('Needle displays commercial and offline boundaries in both locales', async ({page}) => {
 for (const [width, lang, price, offline] of [
  [1280, 'zh-CN', 'EUR 588', '不保证任意项目可在 file:// 全离线运行'],
  [390, 'en', 'EUR 588 per seat billed annually', 'does not guarantee fully offline file:// operation'],
 ] as const) {
  await page.setViewportSize({width, height: 900});
  await page.goto('/c/animation-3d/');
  await expect(page.locator(width === 1280 ? '#matrix' : '#card-list').locator('[data-product-id="needle-engine"]')).toBeVisible();
  await page.goto('/p/animation-3d/needle-engine/');
  await page.locator(`[data-lang="${lang}"]`).click();
  await expect(page.locator('body')).toContainText(price);
  await expect(page.locator('body')).toContainText(offline);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
 }
});
