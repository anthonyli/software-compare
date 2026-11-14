import {test,expect} from '@playwright/test';
test('new office, CAD and material categories expose their comparison rows on desktop and mobile',async({page})=>{
 const rows:Record<string,string[]>={
  'word-processors':['wordcraft','libreoffice-writer'],
  'spreadsheets':['gridcraft','libreoffice-calc'],
  'presentation-tools':['deckcraft','libreoffice-impress'],
  'cad':['cadcraft','librecad'],
  'texture-materials':['texturecraft','materialcraft','material-maker'],
 };
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  for(const [slug,ids] of Object.entries(rows)){
   await page.goto(`/c/${slug}/`);
   await expect(page.locator('h1')).toBeVisible();
   const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ids)await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
