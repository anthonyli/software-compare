import {test,expect,type Page,type Locator} from '@playwright/test';
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

test('focus, hover and canceled touch preserve autoplay and accessible focus',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 const root=await clockPage(page),active=root.locator('[data-position=active]');
 await selectScene(root,1);await page.clock.runFor(1600);
 await active.locator('a').hover({force:true});await active.locator('a').focus();
 await expect(root).toHaveAttribute('data-autoplay','running');
 const focused=await active.locator('a').getAttribute('href');
 await page.clock.runFor(6200);expect(await active.locator('a').getAttribute('href')).not.toBe(focused);
 await expect(root).toBeFocused();
 expect(await root.locator('[aria-hidden=true]').evaluateAll(nodes=>nodes.some(el=>el.contains(document.activeElement)))).toBe(false);
 await root.click({position:{x:10,y:150},force:true});await root.press('Space');
 await root.evaluate(el=>el.dispatchEvent(new TouchEvent('touchstart',{touches:[new Touch({identifier:1,target:el,clientX:100,clientY:100})]})));
 await root.dispatchEvent('touchcancel');await expect(root).toHaveAttribute('data-autoplay','running');
 const touched=await active.locator('a').getAttribute('href');await page.clock.runFor(6200);expect(await active.locator('a').getAttribute('href')).not.toBe(touched);
 await root.locator('[data-shuffle]').click({force:true});await page.clock.runFor(1400);await expect(root).toHaveAttribute('data-autoplay','running');
 const shuffled=await active.locator('a').getAttribute('href');await page.clock.runFor(6200);expect(await active.locator('a').getAttribute('href')).not.toBe(shuffled);
});

test('first-entry and manual liquid reveal frames, transparent navigation',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await mkdir('../docs/design/previews',{recursive:true});
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});
 await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));await page.goto('/');await page.clock.runFor(100);
 const root=page.locator('[data-scenario]');
 await page.screenshot({path:'../docs/design/previews/labs-home-entry.png'});
 await page.clock.runFor(2500);await expect(root).toHaveAttribute('data-transitioning','false');
 await root.locator('[data-dot="0"]').click({force:true});await page.clock.runFor(2500);await expect(root).toHaveAttribute('data-transitioning','false');
 await root.locator('[data-dot="1"]').click({force:true});const samples=[],radii=[];
 for(const [frame,wait] of [[1,400],[2,125],[3,150],[4,625]]){
  await page.clock.runFor(wait);radii.push(Number(await root.getAttribute('data-reveal-radius')));samples.push(await root.locator('[data-liquid-path="1"]').getAttribute('d'));
  await page.screenshot({path:`../docs/design/previews/labs-home-transition-${frame}.png`});
 }
 expect(radii[2]).toBeLessThan(radii[1]);expect(radii[3]).toBeGreaterThan(radii[2]);
 expect(samples[0]).not.toBe(samples[1]);expect(samples[1]).not.toBe(samples[2]);
 await expect(root).toHaveAttribute('data-transitioning','false');
 await expect(page.locator('.site-header')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
 await expect(page.locator('.site-header .brand-mark')).toHaveCSS('color','rgb(21, 22, 21)');
 await page.clock.resume();await page.locator('[data-cat-btn]').click();await expect(page.locator('[data-cat-panel]')).toBeVisible();
});

test('grid is restricted to light catalog; category and product grid preserved',async({page})=>{
 await page.goto('/');await expect(page.locator('body')).toHaveCSS('background-color','rgb(245, 245, 237)');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
 expect(await page.locator('[data-scenario]').evaluate(el=>getComputedStyle(el).backgroundImage)).toBe('none');
 await page.locator('#categories').scrollIntoViewIfNeeded();await page.screenshot({path:'../docs/design/previews/labs-home-catalog-grid.png'});
 await page.goto('/c/web-hosting/');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
 await page.goto('/p/web-hosting/vercel/');expect(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
});

test('six scene-specific organic contours keep their own silhouette',async({page})=>{
 await page.setViewportSize({width:1316,height:884});await mkdir('../docs/design/previews',{recursive:true});
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
 await page.goto('/');await page.clock.runFor(2500);
 const root=page.locator('[data-scenario]'),shapes=[];
 for(let i=0;i<6;i++){
  await root.locator(`[data-dot="${(i+5)%6}"]`).click({force:true});await page.clock.runFor(2500);
  await root.locator(`[data-dot="${i}"]`).click({force:true});await page.clock.runFor(525);
  shapes.push(await root.locator(`[data-liquid-path="${i}"]`).getAttribute('d'));
  await page.screenshot({path:`../docs/design/previews/labs-home-shape-${i}.png`});await page.clock.runFor(2500);
 }
 expect(new Set(shapes).size).toBe(6);
});


test('quick recoil keeps its shape while scene cards tell their own story',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
 await page.goto('/');await page.clock.runFor(1400);
 const root=page.locator('[data-scenario]');
 const initialDot=await root.locator('[data-dot][aria-pressed=true]').getAttribute('data-dot');
 await root.locator(`[data-dot="${initialDot==='2'?1:2}"]`).click({force:true});await page.clock.runFor(1400);
 await root.locator('[data-dot="3"]').click({force:true});
 await page.clock.runFor(525);const reach=Number(await root.getAttribute('data-reveal-radius'));
 await page.clock.runFor(150);expect(Number(await root.getAttribute('data-reveal-radius'))).toBeLessThan(reach);
 await page.clock.runFor(225);expect(Math.abs(Number(await root.getAttribute('data-reveal-rotation')))).toBeGreaterThan(.3);
 await page.screenshot({path:'../docs/design/previews/labs-home-rotation.png'});
 await page.clock.runFor(400);await expect(root).toHaveAttribute('data-transitioning','false');
 const card=root.locator('[data-position=active] .art-window');
 const near=await card.boundingBox();await page.screenshot({path:'../docs/design/previews/labs-home-depth-start.png'});
 await page.clock.runFor(2000);const nearer=await card.boundingBox();
 expect(Math.hypot(nearer!.x-near!.x,nearer!.y-near!.y)).toBeGreaterThan(1);await page.screenshot({path:'../docs/design/previews/labs-home-depth-later.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 expect(await card.evaluate(el=>el.getAnimations().length)).toBe(0);
});


// Compare rendered poses as well as the clock: a moving progress bar alone
// cannot prove the card or its SVG story is still alive.
async function pose(root:Locator) {
 return root.locator('[data-position=active]').evaluate(el=>({
  href:el.querySelector('a')!.getAttribute('href'),
  cards:Array.from(el.querySelectorAll('.art-window,.art-mini,.floating-tag,.art-label'),card=>{
   const box=card.getBoundingClientRect(),style=getComputedStyle(card);
   return [box.x,box.y,box.width,box.height,style.translate,style.rotate];
  }),
  story:Array.from(el.querySelectorAll('.scene-art svg *'),part=>{
   const style=getComputedStyle(part);return [style.transform,style.opacity,style.strokeDashoffset];
  }),
 }));
}
async function clockPage(page:Page) {
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});
 await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
 await page.goto('/');await page.clock.runFor(1600);
 return page.locator('[data-scenario]');
}
async function selectScene(root:Locator,index:number) {
 if(await root.locator(`[data-dot="${index}"]`).getAttribute('aria-pressed')==='true')
  await root.locator(`[data-dot="${(index+1)%6}"]`).click({force:true});
 await root.locator(`[data-dot="${index}"]`).click({force:true});
}
async function elapsed(root:Locator) {return Number(await root.getAttribute('data-camera-progress'));}
async function progressScale(root:Locator) {
 return root.locator('[data-dot][aria-pressed=true] i').evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).a);
}
async function watchFrames(page:Page) {
 await page.evaluate(()=>{
  const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);
  let requested=0,fired=0;const pending=new Set<number>();
  window.requestAnimationFrame=callback=>{
   requested++;const id=request(time=>{pending.delete(id);fired++;callback(time);});pending.add(id);return id;
  };
  window.cancelAnimationFrame=id=>{pending.delete(id);cancel(id);};
  Object.defineProperty(window,'__carouselFrames',{get:()=>({requested,fired,pending:pending.size})});
 });
}
async function frames(page:Page) {return page.evaluate(()=>(window as any).__carouselFrames);}

test('cards and SVG stories advance through two complete automatic loops',async({page})=>{
 test.setTimeout(150000);await page.setViewportSize({width:1440,height:900});
 const root=await clockPage(page);await selectScene(root,0);await page.clock.runFor(1600);
 const visited=new Set<string>();
 for(let visit=0;visit<12;visit++){
  const before=await pose(root),start=await elapsed(root);visited.add(before.href!);
  expect(start).toBeLessThan(.3);
  expect(await progressScale(root)).toBeCloseTo(start,2);
  await page.clock.runFor(1800);
  const after=await pose(root);
  expect(after.href).toBe(before.href);
  expect(after.cards).not.toEqual(before.cards);
  expect(after.story.length).toBeGreaterThan(0);
  expect(after.story).not.toEqual(before.story);
  expect(await elapsed(root)).toBeGreaterThan(start);
  expect(await progressScale(root)).toBeCloseTo(await elapsed(root),2);
  await page.clock.runFor(4200);
  expect((await pose(root)).href).not.toBe(before.href);
 }
 expect(visited.size).toBe(6);
});

test('language changes and repeated active-dot clicks preserve the shared deadline',async({page})=>{
 const root=await clockPage(page);await selectScene(root,1);await page.clock.runFor(1600);
 const before=await pose(root),start=await elapsed(root);
 for(const language of ['en','zh-CN','en']) {
  await page.locator(`[data-lang=${language}]`).click({force:true});
  await root.locator('[data-dot="1"]').click({force:true});
  expect(await elapsed(root)).toBeCloseTo(start,3);
 }
 await page.clock.runFor(1600);const after=await pose(root);
 expect(after.cards).not.toEqual(before.cards);expect(after.story).not.toEqual(before.story);
 expect(await progressScale(root)).toBeCloseTo(await elapsed(root),2);
 await page.clock.runFor(3000);
 await expect(root.locator('[data-dot="2"]')).toHaveAttribute('aria-pressed','true');
});

test('offscreen pause stops frames and resumes cards, SVG and progress together',async({page})=>{
 const root=await clockPage(page);await selectScene(root,1);await page.clock.runFor(2200);await watchFrames(page);
 await page.locator('footer').scrollIntoViewIfNeeded();await expect(root).toHaveAttribute('data-autoplay','paused');
 const start=await elapsed(root),before=await pose(root),pausedFrames=await frames(page);
 await page.clock.runFor(9000);
 expect(await elapsed(root)).toBe(start);expect(await pose(root)).toEqual(before);
 expect(await frames(page)).toEqual(pausedFrames);expect(pausedFrames.pending).toBe(0);
 await page.evaluate(()=>window.scrollTo(0,0));await expect(root).toHaveAttribute('data-autoplay','running');
 const resumed=await pose(root);await page.clock.runFor(1600);const after=await pose(root);
 expect(after.href).toBe(before.href);expect(after.cards).not.toEqual(resumed.cards);expect(after.story).not.toEqual(resumed.story);
 expect(await elapsed(root)).toBeGreaterThan(start);expect(await progressScale(root)).toBeCloseTo(await elapsed(root),2);
 await page.clock.runFor(2500);expect((await pose(root)).href).not.toBe(before.href);
});

test('visibility events preserve elapsed time without scheduling hidden frames',async({page})=>{
 // Deterministic event coverage complements the real-tab test below. This does
 // not claim to reproduce browser tab visibility itself.
 const root=await clockPage(page);await selectScene(root,1);await page.clock.runFor(3800);await watchFrames(page);
 await page.evaluate(()=>{
  Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});
  document.dispatchEvent(new Event('visibilitychange'));
 });
 await expect(root).toHaveAttribute('data-autoplay','paused');
 const start=await elapsed(root),before=await pose(root),pausedFrames=await frames(page);
 await page.clock.runFor(10000);
 expect(await elapsed(root)).toBe(start);expect(await pose(root)).toEqual(before);expect(await frames(page)).toEqual(pausedFrames);
 expect(pausedFrames.pending).toBe(0);
 await page.evaluate(()=>{delete (document as any).hidden;document.dispatchEvent(new Event('visibilitychange'));});
 await expect(root).toHaveAttribute('data-autoplay','running');await page.clock.runFor(1000);
 const after=await pose(root);expect(after.href).toBe(before.href);
 expect(after.cards).not.toEqual(before.cards);expect(after.story).not.toEqual(before.story);
 expect(await progressScale(root)).toBeCloseTo(await elapsed(root),2);
 await page.clock.runFor(1400);expect((await pose(root)).href).not.toBe(before.href);
});

test('returning from another real browser tab resumes visible card animation',async({page,context})=>{
 // Playwright enables focus emulation even in headed Chromium. Disable it
 // on both tabs so visibility events come from the real browser tab switch.
 const session=await context.newCDPSession(page);
 await session.send('Emulation.setFocusEmulationEnabled',{enabled:false});
 await page.goto('/');await page.bringToFront();
 await mkdir('../docs/design/previews',{recursive:true});
 if(test.info().project.use.headless===false) await page.screenshot({path:'../docs/design/previews/labs-home-native-initial.png'});
 const root=page.locator('[data-scenario]');await selectScene(root,1);
 console.log('native initial',await page.evaluate(()=>({visibility:document.visibilityState,focused:document.hasFocus(),progress:document.querySelector<HTMLElement>('[data-scenario]')!.dataset.cameraProgress})));
 await expect(root).toHaveAttribute('data-transitioning','false');
 const other=await context.newPage();
 const otherSession=await context.newCDPSession(other);
 await otherSession.send('Emulation.setFocusEmulationEnabled',{enabled:false});
 await other.goto('about:blank');await other.bringToFront();
 // Some headless Chromium builds keep every tab visible. Run with --headed
 // to exercise native visibility in those builds, rather than faking it here.
 const nativeHidden=await page.waitForFunction(()=>document.hidden,undefined,{polling:100,timeout:3000}).then(()=>true,()=>false);
 if(test.info().project.use.headless!==false) test.skip(!nativeHidden,'Browser keeps headless tabs visible; native tab visibility requires --headed.');
 expect(nativeHidden,'A headed browser must really hide the original tab').toBe(true);
 await expect(root).toHaveAttribute('data-autoplay','paused');
 const paused=await pose(root),start=await elapsed(root);
 await other.waitForTimeout(7000);expect(await elapsed(root)).toBe(start);expect(await pose(root)).toEqual(paused);
 await page.bringToFront();await expect.poll(()=>page.evaluate(()=>document.visibilityState)).toBe('visible');
 await expect(root).toHaveAttribute('data-autoplay','running');
 const resumed=await pose(root);await page.screenshot({path:'../docs/design/previews/labs-home-native-resumed.png'});await page.waitForTimeout(700);const later=await pose(root);
 await page.screenshot({path:'../docs/design/previews/labs-home-native-later.png'});
 console.log('native resumed',JSON.stringify({before:resumed.cards[0],after:later.cards[0]}));
 expect(later.href).toBe(resumed.href);expect(later.cards).not.toEqual(resumed.cards);expect(later.story).not.toEqual(resumed.story);
 await other.close();
});

test('reduced motion has a stable illustration and switching it off rebuilds motion',async({page})=>{
 const root=await clockPage(page);await selectScene(root,1);await page.clock.runFor(1800);await watchFrames(page);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(root).toHaveAttribute('data-autoplay','paused');await expect(root).toHaveAttribute('data-transitioning','false');
 const still=await pose(root),pausedFrames=await frames(page);
 expect(still.story.length).toBeGreaterThan(0);
 await page.clock.runFor(9000);expect(await pose(root)).toEqual(still);expect(await frames(page)).toEqual(pausedFrames);
 expect(pausedFrames.pending).toBe(0);
 for(let i=0;i<6;i++) {
  await root.locator(`[data-dot="${i}"]`).click({force:true});
  await expect(root).toHaveAttribute('data-transitioning','false');
  const illustration=await pose(root);expect(illustration.story.length).toBeGreaterThan(0);
  await page.clock.runFor(600);expect(await pose(root)).toEqual(illustration);
 }
 const selected=(await pose(root)).href;
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(root).toHaveAttribute('data-autoplay','running');
 expect(await elapsed(root)).toBeLessThan(.05);await page.clock.runFor(1600);const before=await pose(root);
 await page.clock.runFor(1600);const after=await pose(root);
 expect(after.href).toBe(selected);expect(after.cards).not.toEqual(before.cards);expect(after.story).not.toEqual(before.story);
 expect(await progressScale(root)).toBeCloseTo(await elapsed(root),2);
 await page.clock.runFor(3000);expect((await pose(root)).href).not.toBe(selected);
});

test('rapid selections cancel outgoing reveals and keep only the final scene interactive',async({page})=>{
 const root=await clockPage(page);
 for(const index of [1,4,2,5,0,3,1]) {
  await root.locator(`[data-dot="${index}"]`).click({force:true});await page.clock.runFor(80);
 }
 await page.clock.runFor(1600);await expect(root).toHaveAttribute('data-transitioning','false');
 await expect(root.locator('[data-position=active]')).toHaveCount(1);
 await expect(root.locator('[data-position=outgoing]')).toHaveCount(0);
 await expect(root.locator('[data-dot="1"]')).toHaveAttribute('aria-pressed','true');
 expect(await root.locator('[data-scene][aria-hidden=true] a').evaluateAll(links=>links.every(link=>(link as HTMLAnchorElement).tabIndex===-1))).toBe(true);
 const before=await pose(root);await page.clock.runFor(1400);expect((await pose(root)).cards).not.toEqual(before.cards);
});

test.describe('mobile touch carousel',()=>{
 test.use({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 test('horizontal swipes change scenes, vertical scroll and canceled gestures do not',async({page,context})=>{
  const root=await clockPage(page);await selectScene(root,0);await page.clock.runFor(1600);
  const session=await context.newCDPSession(page);
  async function gesture(start:{x:number,y:number},end:{x:number,y:number},cancel=false) {
   await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...start,id:1}]});
   await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...end,id:1}]});
   await session.send('Input.dispatchTouchEvent',{type:cancel?'touchCancel':'touchEnd',touchPoints:[]});
  }
  await gesture({x:320,y:620},{x:100,y:625});
  await expect(root.locator('[data-dot="1"]')).toHaveAttribute('aria-pressed','true');
  await page.clock.runFor(1600);
  await gesture({x:100,y:620},{x:320,y:625});
  await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','true');
  await page.clock.runFor(1600);
  await gesture({x:320,y:620},{x:100,y:625},true);
  await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','true');
  await gesture({x:210,y:620},{x:190,y:400});
  await expect(root.locator('[data-dot="0"]')).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
});

for(const [width,height] of [[390,844],[390,667],[1440,900]]) test(`all six story cards stay visible at ${width}x${height}`,async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width,height});const root=await clockPage(page);
 await mkdir('../docs/design/previews',{recursive:true});
 for(const language of ['zh-CN','en']){
  await page.locator(`[data-lang=${language}]`).click({force:true});
  for(let i=0;i<6;i++){
   await selectScene(root,i);await page.clock.runFor(4320);
   await expect(root).toHaveAttribute('data-transitioning','false');
   const active=root.locator('[data-position=active]');
   const cta=(await active.locator('.scene-link').boundingBox())!;
   for(const selector of ['.art-window','.art-mini']){
    const card=(await active.locator(selector).boundingBox())!;
    expect(card.x+card.width).toBeGreaterThan(40);expect(card.x).toBeLessThan(width-40);
    expect(card.y+card.height).toBeLessThan(height-50);
    const overlaps=card.x<cta.x+cta.width&&card.x+card.width>cta.x&&card.y<cta.y+cta.height&&card.y+card.height>cta.y;
    expect(overlaps,`${language} scene ${i}: card overlaps CTA`).toBe(false);
   }
   await page.screenshot({path:`../docs/design/previews/labs-home-story-${width}x${height}-${i}-${language}.png`});
  }
 }
 await page.emulateMedia({reducedMotion:'reduce'});await selectScene(root,1);
 await page.screenshot({path:`../docs/design/previews/labs-home-story-${width}x${height}-reduced.png`});
});
