import {test,expect} from '@playwright/test';
// Real Worker requests; dedicated TEST-NET client avoids cross-suite session limits.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.249'}});
test('BaaS quotas, language visibility and cover render on desktop and mobile',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  const card=page.locator('a.dir-card[href="/c/backend-as-a-service/"]');await card.scrollIntoViewIfNeeded();await expect(card).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-baas-home-${width}.png`,fullPage:true});
  await page.goto('/c/backend-as-a-service/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
   await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
   await expect(page.locator(`h1 .t-${active}`)).toHaveText(lang==='en'?'Backend as a service (BaaS)':'后端即服务（BaaS）');
   const list=page.locator(width===1280?'#matrix':'#card-list');
   for(const id of ['supabase-cloud','neon-cloud','appwrite-cloud']){
    const row=list.locator(`[data-product-id="${id}"]`);await expect(row).toBeVisible();const name=row.locator(width===1280?'.product-name':'.card-title');
    await expect(name.locator(`.t-${active}`)).toBeVisible();await expect(name.locator(`.t-${hidden}`)).toBeHidden();
    await expect(name.locator(`.t-${active}`)).toHaveText(id==='neon-cloud'?'Neon Cloud':id==='appwrite-cloud'?'Appwrite Cloud':'Supabase Cloud');
    await row.locator('details summary').click();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.evaluate(()=>window.scrollTo(0,0));
   await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
   await page.screenshot({path:`../docs/design/previews/payment-page-baas-${active}-${width}.png`,fullPage:true});
   for(const id of ['supabase-cloud','neon-cloud','appwrite-cloud']){
    const detail=list.locator(`[data-product-id="${id}"] details`);
    await detail.locator('summary').click();
    await expect(detail).not.toHaveAttribute('open');
   }
  }
 }
 await page.goto('/p/backend-as-a-service/supabase-cloud/');
 for(const lang of ['zh-CN','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
  await expect(page.locator(`h1 .t-${active}`)).toBeVisible();
  await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
  await expect(page.locator(`h1 .t-${active}`)).toHaveText('Supabase Cloud');
  const featureNotes=page.locator('.feature-row p');
  await expect(featureNotes).toHaveCount(6);
  const englishEvidence=['500MB','Compute Hours','inactivity','backups','current contract','signup was not tested'];
  for(let i=0;i<6;i++){
   const note=featureNotes.nth(i);
   await expect(note.locator(`.t-${active}`)).toBeVisible();
   await expect(note.locator(`.t-${hidden}`)).toBeHidden();
   if(lang==='en'){
    await expect(note.locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);
    await expect(note.locator('.t-en')).toContainText(englishEvidence[i]);
   }
  }
  const limits=page.locator('.price-panel > .mt-5 p');
  await expect(limits.locator(`.t-${active}`)).toBeVisible();
  await expect(limits.locator(`.t-${hidden}`)).toBeHidden();
  await expect(limits.locator(`.t-${active}`)).toContainText('500MB');
  const overage=page.locator('.feature-row p').filter({hasText:'Compute Hours'});
  await expect(overage).toHaveCount(1);
  await expect(overage.locator(`.t-${active}`)).toBeVisible();
  await expect(overage.locator(`.t-${hidden}`)).toBeHidden();
  await expect(overage.locator(`.t-${active}`)).toContainText(lang==='en'?'Compute Hours are not covered by the Spend Cap':'Compute Hours不受Spend Cap保护');
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:lang==='en'?'../docs/design/previews/payment-page-baas-detail.png':'../docs/design/previews/payment-page-baas-detail-zh.png',fullPage:true});
 }
});

test('Neon detail renders all public English and Chinese notes visibly',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/p/backend-as-a-service/neon-cloud/');
 for(const lang of ['zh-CN','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
  await expect(page.locator(`h1 .t-${active}`)).toHaveText('Neon Cloud');
  await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
  const notes=page.locator('.feature-row p');await expect(notes).toHaveCount(6);
  const phrases=['20GB','SQLSTATE 53000','5 minutes','1GB','current contract','prepaid credits'];
  for(let i=0;i<6;i++){
   await expect(notes.nth(i).locator(`.t-${active}`)).toBeVisible();await expect(notes.nth(i).locator(`.t-${hidden}`)).toBeHidden();
   if(lang==='en'){await expect(notes.nth(i).locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(notes.nth(i).locator('.t-en')).toContainText(phrases[i]);}
  }
  const limits=page.locator('.price-panel > .mt-5 p');
  await expect(limits.locator(`.t-${active}`)).toBeVisible();await expect(limits.locator(`.t-${hidden}`)).toBeHidden();
  if(lang==='en'){await expect(limits.locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(limits.locator('.t-en')).toContainText('400 waiting Capacity-Hours');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-neon-detail-${active}.png`,fullPage:true});
 }
});
test('Appwrite detail renders all public English and Chinese notes visibly',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/p/backend-as-a-service/appwrite-cloud/');
 for(const lang of ['zh-CN','en']){
  await page.locator(`[data-lang="${lang}"]`).click();
  const active=lang==='en'?'en':'zh',hidden=lang==='en'?'zh':'en';
  await expect(page.locator(`h1 .t-${active}`)).toHaveText('Appwrite Cloud');
  await expect(page.locator(`h1 .t-${active}`)).toBeVisible();await expect(page.locator(`h1 .t-${hidden}`)).toBeHidden();
  const notes=page.locator('.feature-row p');await expect(notes).toHaveCount(6);
  const phrases=['100 GB-hours','read-only','90 days','Pro or above','regular Free','Signup was not tested'];
  for(let i=0;i<6;i++){
   await expect(notes.nth(i).locator(`.t-${active}`)).toBeVisible();await expect(notes.nth(i).locator(`.t-${hidden}`)).toBeHidden();
   if(lang==='en'){await expect(notes.nth(i).locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(notes.nth(i).locator('.t-en')).toContainText(phrases[i]);}
  }
  const limits=page.locator('.price-panel > .mt-5 p');
  await expect(limits.locator(`.t-${active}`)).toBeVisible();await expect(limits.locator(`.t-${hidden}`)).toBeHidden();
  if(lang==='en'){await expect(limits.locator('.t-en')).not.toHaveText(/[\u4e00-\u9fff]/);await expect(limits.locator('.t-en')).toContainText('100 GB-hours');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>window.scrollTo(0,0));await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  await page.screenshot({path:`../docs/design/previews/payment-page-appwrite-detail-${active}.png`,fullPage:true});
 }
});
