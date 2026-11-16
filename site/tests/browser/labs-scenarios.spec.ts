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

test('autoplay advances twice, transitions, pauses and resumes', async({page})=>{
 test.setTimeout(70000);
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 const root=page.locator('[data-scenario]');const active=root.locator('[data-position=active]');
 const initial=await active.locator('a').getAttribute('href');
 await expect(root).toHaveAttribute('data-autoplay','running');
 await expect(active.locator('a')).not.toHaveAttribute('href',initial!,{timeout:6500});
 const second=await active.locator('a').getAttribute('href');
 // The active panel really travels through different transforms, not just a text swap.
 const during=await active.evaluate(el=>getComputedStyle(el).transform);
 await page.waitForTimeout(1000);
 expect(await active.evaluate(el=>getComputedStyle(el).transform)).not.toBe(during);
 await expect(active.locator('a')).not.toHaveAttribute('href',second!,{timeout:6500});
 await root.hover();await expect(root).toHaveAttribute('data-autoplay','paused');
 const held=await active.locator('a').getAttribute('href');await page.waitForTimeout(5000);
 await expect(active.locator('a')).toHaveAttribute('href',held!);
 await page.mouse.move(0,0);await expect(root).toHaveAttribute('data-autoplay','running');
 await root.locator('[data-playback]').click();await page.mouse.move(0,0);
 await expect(root).toHaveAttribute('data-autoplay','paused');await page.waitForTimeout(5000);
 await expect(active.locator('a')).toHaveAttribute('href',held!);
 await root.locator('[data-playback]').click();await page.mouse.move(0,0);
 await expect(root).toHaveAttribute('data-autoplay','running');
 await expect(active.locator('a')).not.toHaveAttribute('href',held!,{timeout:6500});
 await active.locator('a').focus();await expect(root).toHaveAttribute('data-autoplay','paused');
 const focused=await active.locator('a').getAttribute('href');await page.waitForTimeout(5000);
 await expect(active.locator('a')).toHaveAttribute('href',focused!);
 await page.locator('[data-lang=en]').focus();await expect(root).toHaveAttribute('data-autoplay','running');
 await page.locator('footer').scrollIntoViewIfNeeded();await expect(root).toHaveAttribute('data-autoplay','paused');
 await page.evaluate(()=>window.scrollTo(0,0));await expect(root).toHaveAttribute('data-autoplay','running');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(root).toHaveAttribute('data-autoplay','paused');
 await expect(root.locator('[data-playback]')).toBeDisabled();
 const still=await active.locator('a').getAttribute('href');await page.waitForTimeout(5000);
 await expect(active.locator('a')).toHaveAttribute('href',still!);
 await root.locator('[data-next]').click();await expect(active.locator('a')).not.toHaveAttribute('href',still!);
});
