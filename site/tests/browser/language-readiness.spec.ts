import {test,expect} from '@playwright/test';
for(const width of [390,1280])test(`language switch waits for delayed initialization at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.route('https://static.cloudflareinsights.com/**',route=>route.abort());
 let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});let moduleCode='';
 await page.route('**/__test_language_init.js',async route=>{await gate;await route.fulfill({contentType:'text/javascript',body:moduleCode});});
 await page.route('**/privacy/',async route=>{
  const response=await route.fetch();const html=await response.text();
  const script=Array.from(html.matchAll(/<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/g)).find(m=>m[1].includes('compare-lang'));
  expect(script,'built language initialization module').toBeTruthy();moduleCode=script![1];
  await route.fulfill({response,body:html.replace(script![0],'<script type="module" src="/__test_language_init.js"></script>')});
 });
 try{
  await page.goto('/privacy/',{waitUntil:'commit'});
  await expect(page.locator('[data-policy-page]')).toBeVisible();
  await expect(page.locator('[data-lang="zh-CN"]')).toBeDisabled();
  await expect(page.locator('[data-lang="en"]')).toBeDisabled();
  release();
  for(const lang of ['en','zh-CN','en']){
   const button=page.locator(`[data-lang="${lang}"]`);await expect(button).toBeEnabled();await button.click();
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.locator(`h1 .${lang==='en'?'t-en':'t-zh'}`)).toBeVisible();
   await expect(page.locator(`h1 .${lang==='en'?'t-zh':'t-en'}`)).toBeHidden();
   await expect(button).toHaveAttribute('aria-pressed','true');
  }
  await page.locator('[data-policy-page] nav a[href="/terms/"]').click();
  await expect(page).toHaveURL(/\/terms\/$/);await expect(page.locator('h1 .t-en')).toBeVisible();
  await page.locator('[data-lang="zh-CN"]').click();await expect(page.locator('h1 .t-zh')).toBeVisible();await expect(page.locator('h1 .t-en')).toBeHidden();
 }finally{release();}
});
