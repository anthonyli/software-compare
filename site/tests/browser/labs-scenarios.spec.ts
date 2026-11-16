import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
for (const width of [390,768,1440]) test(`scenario playground at ${width}`,async({page,request})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/');
 const root=page.locator('[data-scenario]');await expect(page.locator('h1')).toHaveCount(1);
 await expect(root.locator('[data-position=active]')).toHaveCount(1);
 for(let i=0;i<6;i++){
  await root.locator(`[data-dot="${i}"]`).click();
  await expect(root.locator(`[data-dot="${i}"]`)).toHaveAttribute('aria-pressed','true');
  const active=root.locator('[data-position=active]');await expect(active).toHaveAttribute('aria-hidden','false');
  expect((await request.get((await active.locator('a').getAttribute('href'))!)).ok()).toBe(true);
  expect(await root.locator('[aria-hidden=true] a').evaluateAll(links=>links.every(a=>(a as HTMLAnchorElement).tabIndex===-1))).toBe(true);
 }
 await root.locator('[data-dot="0"]').click();await page.waitForTimeout(950);
 await mkdir('../docs/design/previews',{recursive:true});await page.screenshot({path:`../docs/design/previews/labs-home-${width}-zh.png`});
 await root.locator('[data-next]').click();await expect(root.locator('[data-dot="1"]')).toHaveAttribute('aria-pressed','true');
 await root.locator('[data-prev]').click();await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','true');
 await root.locator('[data-shuffle]').click();await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','false');
 await root.locator('[data-dot="0"]').focus();await page.keyboard.press('ArrowRight');
 await page.locator('[data-lang=en]').click();await expect(root.locator('h1 .t-en')).toBeVisible();
 await root.locator('[data-dot="0"]').click();await page.waitForTimeout(950);await page.screenshot({path:`../docs/design/previews/labs-home-${width}-en.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.emulateMedia({reducedMotion:'reduce'});expect(await root.locator('[data-scene]').first().evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');
});
