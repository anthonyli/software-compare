import {test,expect} from '@playwright/test';test.use({extraHTTPHeaders:{'CF-Connecting-IP':'192.0.2.112'}});
test('mobile recorders show in desktop and mobile comparisons',async({page})=>{for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.goto('/c/audio-recorders/');const list=page.locator(width===1280?'#matrix':'#card-list');for(const id of ['just-press-record','dolby-on'])await expect(list.locator(`[data-product-id="${id}"]`)).toBeVisible();await page.locator('[data-lang="en"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.goto('/p/audio-recorders/dolby-on/');await expect(page.locator('body')).toContainText('personal-use restrictions');});

test('Riverside shows scoped sound capture and conflicting free offers in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/audio-recorders/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="riverside"]')).toBeVisible();
  await page.goto('/p/audio-recorders/riverside/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh';
   const rows=page.locator('.feature-row');await expect(rows).toHaveCount(4);
   await expect(rows.nth(1).locator(`p .t-${active}`)).toContainText(lang==='en'?'not independent capture of arbitrary apps':'不是独立录制任意应用');
   await expect(rows.nth(2).locator(`p .t-${active}`)).toContainText(lang==='en'?'whole-screen audio sharing':'共享整个屏幕时附带系统声音');
   await expect(rows.nth(3).locator(`p .t-${active}`)).toContainText(lang==='en'?'Grow, Webinar, and Business':'Grow、Webinar 和 Business');
   await expect(page.locator('body')).toContainText(lang==='en'?'The old free allowance is unconfirmed for new users':'新用户能否获得旧免费额度尚未确认',{useInnerText:true});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});

test('SonoBus shows receiver-side tracks and public broadcast boundaries in both languages',async({page})=>{
 for(const width of [1280,390]){
  await page.setViewportSize({width,height:900});
  await page.goto('/c/audio-recorders/');
  await expect(page.locator(width===1280?'#matrix':'#card-list').locator('[data-product-id="sonobus"]')).toBeVisible();
  await page.goto('/p/audio-recorders/sonobus/');
  for(const lang of ['zh-CN','en']){
   await page.locator(`[data-lang="${lang}"]`).click();
   const active=lang==='en'?'en':'zh',rows=page.locator('.feature-row');await expect(rows).toHaveCount(4);
   await expect(rows.nth(0).locator(`p .t-${active}`)).toContainText(lang==='en'?'streams received by the recorder':'接收的音频流');
   await expect(rows.nth(2).locator('.feat-empty')).toHaveAttribute('title',lang==='en'?'Unknown':'未知');
   await expect(rows.nth(3).locator('.feat')).toHaveAttribute('title',lang==='en'?'Partial':'部分支持');
   await expect(rows.nth(3).locator(`p .t-${active}`)).toContainText(lang==='en'?'not direct output to public streaming platforms':'不是直接推送到公开直播平台');
   await expect(page.locator('body')).toContainText(lang==='en'?'a group password does not encrypt it':'组密码不等于加密',{useInnerText:true});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
 }
});
