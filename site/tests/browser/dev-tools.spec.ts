import {test,expect} from '@playwright/test';
test('developer additions render bilingual comparisons at desktop and phone widths',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [slug,ids] of Object.entries({'api-clients':['insomnia','postman'],'database-clients':['beekeeper-community','heidisql','pgadmin']})){
   await page.goto(`/c/${slug}/`);
   const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ids)await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
   await page.locator('[data-lang="en"]').click();
   if(width===1280){
    const note=slug==='api-clients'?'Individual GraphQL requests are supported':'For PostgreSQL and supported derivatives.';
    await expect(list.locator(`[title*="${note}"]`)).toBeVisible();
   }else await expect(list).toContainText(slug==='api-clients'?'GraphQL requests':'SQL queries');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.reload();await expect(page.locator('[data-lang="en"]')).toHaveAttribute('aria-pressed','true');
   await page.locator('[data-lang="zh-CN"]').click();
  }
 }
 await page.goto('/p/database-clients/beekeeper-community/');await page.locator('[data-lang="en"]').click();
 await expect(page.locator('body')).toContainText('The official plan table places import/export');
});
