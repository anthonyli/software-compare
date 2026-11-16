import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
// Keep visual navigation independent of the vote API rate-limit tests.
test.use({extraHTTPHeaders:{'CF-Connecting-IP':'198.51.100.71'}});
for(const [width,height] of [[390,844],[768,700],[1440,900],[1280,600]]) test(`liquid stage fits ${width}x${height}`,async({page,request})=>{
 await page.setViewportSize({width,height});await page.goto('/');
 const root=page.locator('[data-scenario]');await expect(page.locator('h1')).toHaveCount(1);
 await expect(root.locator('[data-position=active]')).toHaveCount(1);
 await expect(root.locator('[data-next],[data-prev],[data-playback]')).toHaveCount(0);
 expect(await root.evaluate(el=>Math.round(el.getBoundingClientRect().height))).toBe(height);
 const controls=await root.locator('.scenario-controls').boundingBox();expect(controls!.y+controls!.height).toBeLessThanOrEqual(height);
 await expect(page.locator('.site-header')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 for(let i=0;i<6;i++){
  await root.locator(`[data-dot="${i}"]`).click();
  const active=root.locator('[data-position=active]');await expect(active).toHaveAttribute('aria-hidden','false');
  expect((await request.get((await active.locator('a').getAttribute('href'))!)).ok()).toBe(true);
  expect(await root.locator('[data-scene][aria-hidden=true] a').evaluateAll(links=>links.every(a=>(a as HTMLAnchorElement).tabIndex===-1))).toBe(true);
 }
 await root.locator('[data-dot="0"]').click();await expect(root).toHaveAttribute('data-transitioning','false');
 await mkdir('../docs/design/previews',{recursive:true});await page.screenshot({path:`../docs/design/previews/labs-home-${width}-zh.png`});
 await root.locator('[data-dot="0"]').press('ArrowRight');await expect(root.locator('[data-dot="1"]')).toHaveAttribute('aria-pressed','true');
 await root.locator('[data-dot="1"]').press('ArrowLeft');await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','true');
 await root.locator('[data-shuffle]').click();await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','false');
 await page.locator('[data-lang=en]').click();await expect(root.locator('h1 .t-en')).toBeVisible();
 await root.locator('[data-dot="0"]').click();await expect(root).toHaveAttribute('data-transitioning','false');
 await page.screenshot({path:`../docs/design/previews/labs-home-${width}-en.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('automatic liquid reveal, active-progress pause, focus and reduced motion',async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const root=page.locator('[data-scenario]'),active=root.locator('[data-position=active]');
 const initial=await active.locator('a').getAttribute('href');await expect(root).toHaveAttribute('data-autoplay','running');
 await expect(active.locator('a')).not.toHaveAttribute('href',initial!,{timeout:8500});
 await expect(root).toHaveAttribute('data-transitioning','true');
 const during=await root.locator('[data-liquid-path]').evaluateAll(nodes=>nodes.map(el=>el.getAttribute('d')));
 await page.waitForTimeout(500);
 expect(await root.locator('[data-liquid-path]').evaluateAll(nodes=>nodes.map(el=>el.getAttribute('d')))).not.toEqual(during);
 const second=await active.locator('a').getAttribute('href');
 await expect(active.locator('a')).not.toHaveAttribute('href',second!,{timeout:8500});
 await expect(root).toHaveAttribute('data-transitioning','false');
 await active.locator('a').hover();await expect(root).toHaveAttribute('data-autoplay','paused');
 const held=await active.locator('a').getAttribute('href');await page.waitForTimeout(6500);await expect(active.locator('a')).toHaveAttribute('href',held!);
 await page.mouse.move(0,0);await expect(root).toHaveAttribute('data-autoplay','running');
 await root.locator('[data-dot][aria-pressed=true]').click();await page.mouse.move(0,0);await expect(root).toHaveAttribute('data-user-paused','true');
 await page.waitForTimeout(6500);await expect(active.locator('a')).toHaveAttribute('href',held!);
 await root.locator('[data-dot][aria-pressed=true]').click();await page.mouse.move(0,0);await expect(root).toHaveAttribute('data-autoplay','running');
 await expect(active.locator('a')).not.toHaveAttribute('href',held!,{timeout:8500});
 await expect(root).toHaveAttribute('data-transitioning','false');await active.locator('a').focus();await expect(root).toHaveAttribute('data-autoplay','paused');
 await page.locator('[data-lang=en]').focus();await page.locator('footer').scrollIntoViewIfNeeded();await expect(root).toHaveAttribute('data-autoplay','paused');
 await page.evaluate(()=>window.scrollTo(0,0));await expect(root).toHaveAttribute('data-autoplay','running');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(root).toHaveAttribute('data-autoplay','paused');await expect(root).toHaveAttribute('data-transitioning','false');
 const still=await active.locator('a').getAttribute('href');await page.waitForTimeout(6500);await expect(active.locator('a')).toHaveAttribute('href',still!);
 await root.press('ArrowRight');await expect(active.locator('a')).not.toHaveAttribute('href',still!);await expect(root).toHaveAttribute('data-transitioning','false');
});

test('first-entry and manual liquid reveal frames, transparent navigation',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await mkdir('../docs/design/previews',{recursive:true});await page.goto('/');
 const root=page.locator('[data-scenario]');
 await page.screenshot({path:'../docs/design/previews/labs-home-entry.png'});
 await expect(root).toHaveAttribute('data-transitioning','false');
 await root.locator('[data-dot="0"]').click();await expect(root).toHaveAttribute('data-transitioning','false');
 await root.locator('[data-dot="1"]').click();const samples=[];
 for(const [frame,wait] of [[1,100],[2,400],[3,500],[4,900]]){
  await page.waitForTimeout(wait);samples.push(await root.locator('[data-liquid-path="1"]').getAttribute('d'));
  await page.screenshot({path:`../docs/design/previews/labs-home-transition-${frame}.png`});
 }
 expect(samples[0]).not.toBe(samples[1]);expect(samples[1]).not.toBe(samples[2]);
 await expect(root).toHaveAttribute('data-transitioning','false');
 await expect(page.locator('.site-header')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(page.locator('.site-header .brand-mark')).toHaveCSS('color','rgb(245, 245, 237)');
 await page.locator('[data-cat-btn]').click();await expect(page.locator('[data-cat-panel]')).toBeVisible();
});

test('grid is restricted to light catalog; category and product grid preserved',async({page})=>{
 await page.goto('/');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
 expect(await page.locator('[data-scenario]').evaluate(el=>getComputedStyle(el).backgroundImage)).toBe('none');
 await page.locator('#categories').scrollIntoViewIfNeeded();await page.screenshot({path:'../docs/design/previews/labs-home-catalog-grid.png'});
 await page.goto('/c/web-hosting/');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
 await page.goto('/p/web-hosting/vercel/');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
});
