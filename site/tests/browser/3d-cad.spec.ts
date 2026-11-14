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
