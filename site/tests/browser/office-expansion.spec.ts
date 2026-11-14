import {test,expect} from '@playwright/test';
test('office additions render at desktop and phone widths with translated limits',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [slug,ids] of Object.entries({'word-processors':['pages','onlyoffice-document'],spreadsheets:['numbers','onlyoffice-spreadsheet'],'presentation-tools':['keynote','onlyoffice-presentation']})){
   await page.goto(`/c/${slug}/`);const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ids)await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
   await page.locator('[data-lang="en"]').click();await expect(page.locator('[data-lang="en"]')).toHaveAttribute('aria-pressed','true');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
 await page.goto('/p/presentation-tools/keynote/');await expect(page.locator('body')).toContainText('Unlicensed Content Hub assets may be watermarked on export.');
 await page.goto('/p/word-processors/onlyoffice-document/');await expect(page.locator('body')).toContainText('This row covers the free desktop editor module');
});
