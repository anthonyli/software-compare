import {test,expect} from '@playwright/test';
test('every catalog card cover loads on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/');
  const covers=page.locator('.dir-cover img');
  expect(await covers.count()).toBeGreaterThan(0);
  for(const img of await covers.all()){
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete && el.naturalWidth>0)).toBe(true);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 }
});
