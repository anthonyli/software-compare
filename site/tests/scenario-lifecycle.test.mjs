import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {transformSync} from 'esbuild';

// Execute the shipped Astro script, not a second implementation of its logic.
// The harness supplies browser host interfaces only. Layout/paint is covered by
// browser/labs-scenarios.spec.ts, which still needs an actual browser.
const source = readFileSync(new URL('../src/components/ScenarioCarousel.astro', import.meta.url), 'utf8');
const start = source.indexOf('<script>') + '<script>'.length;
const end = source.indexOf('</script>', start);
assert.ok(start >= '<script>'.length && end > start);
const {code} = transformSync(source.slice(start, end), {loader: 'ts', target: 'es2022'});

class Element {
  constructor(name) {
    this.name = name; this.dataset = {}; this.textContent = '';
    this.attributes = new Map(); this.listeners = new Map(); this.children = new Map();
    this.style = {
      setProperty(name, value) { this[name] = String(value); },
      getPropertyValue(name) { return this[name] ?? ''; },
    };
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  addEventListener(type, listener) {
    const list = this.listeners.get(type) ?? []; list.push(listener); this.listeners.set(type, list);
  }
  dispatch(type, properties = {}) {
    const event = {type, target: this, defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }, ...properties};
    for (const listener of this.listeners.get(type) ?? []) listener(event);
    return event;
  }
  querySelector(selector) {
    assert.ok(this.children.has(selector), `Unmodeled selector ${selector} on ${this.name}`);
    return this.children.get(selector);
  }
  contains(element) { return element === this || [...this.children.values()].some(child => child.contains(element)); }
}

function browser({reducedMotion = false, width = 1440} = {}) {
  let now = 0, frameId = 0, callbacks = 0;
  const frames = new Map(), root = new Element('carousel'), document = new Element('document');
  root.clientWidth = width; root.clientHeight = 900;
  document.hidden = false; document.documentElement = new Element('html'); document.documentElement.lang = 'zh';
  document.children.set('[data-scenario]', root); document.activeElement = null;
  root.focus = () => { document.activeElement = root; };
  const scenes = Array.from({length: 6}, (_, i) => {
    const scene = new Element(`scene ${i}`), link = new Element(`link ${i}`);
    link.tabIndex = i === 0 ? 0 : -1; scene.children.set('a', link);
    for (const selector of ['.art-window', '.art-mini', '.floating-tag', '.art-label']) {
      scene.children.set(selector, new Element(`${selector} ${i}`));
    }
    return scene;
  });
  const dots = scenes.map((_, i) => {
    const dot = new Element(`dot ${i}`); dot.children.set('i', new Element(`progress ${i}`));
    dot.setAttribute('data-zh', `场景 ${i}`); dot.setAttribute('data-en', `Scene ${i}`); return dot;
  });
  const paths = scenes.map((_, i) => new Element(`liquid path ${i}`));
  const rim = new Element('liquid rim'), status = new Element('announcement'), shuffle = new Element('shuffle');
  root.children.set('[data-liquid-rim]', rim); root.children.set('.scenario-status', status); root.children.set('[data-shuffle]', shuffle);
  root.querySelectorAll = selector => {
    const matches = {'[data-scene]': scenes, '[data-dot]': dots, '[data-liquid-path]': paths};
    assert.ok(selector in matches, `Unmodeled selector ${selector}`); return matches[selector];
  };
  const media = new Element('media query'); media.matches = reducedMotion;
  const observers = {MutationObserver: [], IntersectionObserver: [], ResizeObserver: []};
  const observer = kind => class {
    constructor(callback) { this.callback = callback; observers[kind].push(this); }
    observe(target) { this.target = target; }
  };
  const deterministicMath = Object.create(Math); deterministicMath.random = () => 0;
  runInNewContext(code, {
    document, Math: deterministicMath, performance: {now: () => now},
    matchMedia: query => { assert.equal(query, '(prefers-reduced-motion: reduce)'); return media; },
    requestAnimationFrame(callback) { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame(id) { frames.delete(id); },
    MutationObserver: observer('MutationObserver'), IntersectionObserver: observer('IntersectionObserver'),
    ResizeObserver: observer('ResizeObserver'),
  }, {filename: 'ScenarioCarousel.astro script'});
  const activeIndex = () => scenes.findIndex(scene => scene.dataset.position === 'active');
  return {
    root, document, scenes, dots, paths, rim, status, shuffle,
    get activeIndex() { return activeIndex(); },
    get active() { return scenes[activeIndex()]; },
    get progress() { return Number(root.dataset.cameraProgress); },
    get pendingFrames() { return frames.size; },
    get frameCallbacks() { return callbacks; },
    card(index = activeIndex()) { return scenes[index].querySelector('.art-window'); },
    click(index) { dots[index].dispatch('click'); },
    runFor(milliseconds) {
      const end = now + milliseconds;
      // Callbacks queued during a frame only run on the following frame.
      while (now < end) {
        now = Math.min(end, now + 20);
        const ready = [...frames.entries()]; frames.clear();
        for (const [, callback] of ready) { callbacks++; callback(now); }
      }
    },
    visibility(hidden) { document.hidden = hidden; document.dispatch('visibilitychange'); },
    intersection(isIntersecting) {
      for (const item of observers.IntersectionObserver) item.callback([{target: item.target, isIntersecting}]);
    },
    language(lang) {
      document.documentElement.lang = lang;
      for (const item of observers.MutationObserver) item.callback([{target: item.target, attributeName: 'lang'}]);
    },
    reduced(matches) { media.matches = matches; media.dispatch('change', {matches}); },
    resize(newWidth) {
      root.clientWidth = newWidth;
      for (const item of observers.ResizeObserver) item.callback([{target: item.target}]);
    },
  };
}

function assertSharedClock(page) {
  const storyProgress = Number(page.active.style.getPropertyValue('--scene-progress'));
  const storyTime = -Number.parseFloat(page.active.style.getPropertyValue('--story-time'));
  const bar = Number(page.dots[page.activeIndex].querySelector('i').style.transform.slice(7, -1));
  assert.ok(Math.abs(page.progress - storyProgress) < .0001, 'card and story clock agree');
  assert.ok(Math.abs(bar - storyProgress) < .0001, 'progress bar and story clock agree');
  assert.ok(Math.abs(storyTime / 6000 - storyProgress) < .0001, 'SVG timeline agrees');
}
function cardPose(page) { return `${page.card().style.translate}|${page.card().style.rotate}`; }
function assertAccessibleSelection(page) {
  assert.equal(page.scenes.filter(scene => scene.dataset.position === 'active').length, 1);
  assert.equal(page.dots.filter(dot => dot.getAttribute('aria-pressed') === 'true').length, 1);
  page.scenes.forEach((scene, i) => {
    assert.equal(scene.getAttribute('aria-hidden'), String(i !== page.activeIndex));
    assert.equal(scene.querySelector('a').tabIndex, i === page.activeIndex ? 0 : -1);
  });
}

test('card, story and progress bar advance together through two complete loops', () => {
  const page = browser(), gestures = new Set();
  for (let visit = 0; visit < 12; visit++) {
    assert.equal(page.activeIndex, visit % 6); assert.equal(page.progress, 0); assert.equal(page.pendingFrames, 1);
    page.runFor(1600); const first = cardPose(page); assertSharedClock(page);
    page.runFor(1800); const later = cardPose(page); assertSharedClock(page);
    assert.notEqual(later, first, `scene ${visit % 6} changes its card pose`); gestures.add(later);
    assertAccessibleSelection(page); page.runFor(2600);
  }
  assert.equal(gestures.size, 6, 'six distinct gestures'); assert.equal(page.activeIndex, 0);
});

test('language changes and repeated active-dot clicks preserve the deadline', () => {
  const page = browser(); page.click(1); page.runFor(4000);
  const pose = cardPose(page), progress = page.progress;
  for (let i = 0; i < 8; i++) { page.click(1); page.language(i % 2 ? 'zh' : 'en'); }
  assert.equal(page.progress, progress); assert.equal(cardPose(page), pose);
  assert.equal(page.pendingFrames, 1); assertSharedClock(page);
  page.language('en'); assert.match(page.status.textContent, /Scene 1/);
  page.runFor(1900); assert.equal(page.activeIndex, 1);
  page.runFor(100); assert.equal(page.activeIndex, 2);
});

test('a tab hidden beyond six seconds keeps remaining time and resumes moving', () => {
  const page = browser(); page.click(1); page.runFor(5000); page.visibility(true);
  const progress = page.progress, pose = cardPose(page), callbacks = page.frameCallbacks;
  assert.equal(page.root.dataset.autoplay, 'paused'); assert.equal(page.pendingFrames, 0);
  page.runFor(20000);
  assert.equal(page.activeIndex, 1); assert.equal(page.progress, progress); assert.equal(cardPose(page), pose);
  assert.equal(page.frameCallbacks, callbacks, 'no RAF callback runs in a hidden tab');
  page.visibility(false); assert.equal(page.progress, progress); assert.equal(page.pendingFrames, 1);
  page.runFor(500);
  assert.ok(page.progress > progress); assert.notEqual(cardPose(page), pose); assertSharedClock(page);
  page.runFor(500); assert.equal(page.activeIndex, 2);
});

test('offscreen and visibility pauses compose, including an unfinished liquid reveal', () => {
  const page = browser(); page.click(2); page.runFor(400); page.intersection(false);
  const path = page.paths[2].getAttribute('d'), progress = page.progress, callbacks = page.frameCallbacks;
  assert.equal(page.root.dataset.transitioning, 'true');
  page.visibility(true); page.runFor(10000); page.visibility(false);
  assert.equal(page.pendingFrames, 0); assert.equal(page.root.dataset.autoplay, 'paused');
  assert.equal(page.frameCallbacks, callbacks); assert.equal(page.paths[2].getAttribute('d'), path);
  page.intersection(true); assert.equal(page.progress, progress); assert.equal(page.pendingFrames, 1);
  page.runFor(200); assert.notEqual(page.paths[2].getAttribute('d'), path); assertSharedClock(page);
  page.runFor(700); assert.equal(page.root.dataset.transitioning, 'false');
});

test('reduced motion has a meaningful static story and restores both timelines', () => {
  const page = browser(); page.click(1); page.runFor(3000); page.reduced(true);
  assert.equal(page.root.dataset.autoplay, 'paused'); assert.equal(page.root.dataset.transitioning, 'false');
  assert.equal(page.root.dataset.reducedMotion, 'true'); assert.equal(page.pendingFrames, 0);
  assert.equal(page.active.style.getPropertyValue('--scene-progress'), '0.72');
  assert.equal(page.active.style.getPropertyValue('--story-time'), '-4320ms');
  assert.equal(page.card().style.translate, ''); assert.equal(page.card().style.rotate, '');
  const callbacks = page.frameCallbacks;
  page.runFor(15000); assert.equal(page.activeIndex, 1); assert.equal(page.frameCallbacks, callbacks);
  page.click(2); page.runFor(10000);
  assert.equal(page.activeIndex, 2); assert.equal(page.pendingFrames, 0); assertAccessibleSelection(page);
  page.reduced(false); assert.equal(page.progress, 0); assert.equal(page.pendingFrames, 1);
  assert.equal(page.root.dataset.transitioning, 'false');
  const pose = cardPose(page); page.runFor(1200);
  assert.ok(page.progress > 0); assert.notEqual(cardPose(page), pose); assertSharedClock(page);
  page.runFor(4800); assert.equal(page.activeIndex, 3);
});

test('initial reduced motion and preference changes while hidden cannot orphan cards', () => {
  const page = browser({reducedMotion: true});
  assert.equal(page.pendingFrames, 0); assert.equal(page.root.dataset.transitioning, 'false');
  page.visibility(true); page.reduced(false); page.runFor(10000);
  assert.equal(page.pendingFrames, 0); assert.equal(page.progress, 0);
  page.visibility(false); const first = cardPose(page); page.runFor(2000);
  assert.notEqual(cardPose(page), first); assertSharedClock(page);
  page.reduced(true); page.reduced(false); page.reduced(true); page.reduced(false);
  assert.equal(page.pendingFrames, 1); assert.equal(page.progress, 0);
  page.runFor(2000); assert.ok(page.progress > 0); assertSharedClock(page);
});

test('rapid switching cancels old reveals and keeps focus outside hidden scenes', () => {
  const page = browser(); page.document.activeElement = page.active.querySelector('a');
  for (const index of [1, 5, 2, 4, 0, 3]) {
    page.click(index); page.runFor(100);
    assert.equal(page.activeIndex, index); assert.equal(page.pendingFrames, 1); assertAccessibleSelection(page);
  }
  assert.equal(page.document.activeElement, page.root); page.runFor(1300);
  assert.equal(page.activeIndex, 3); assert.equal(page.root.dataset.transitioning, 'false');
  assert.equal(page.scenes.filter(scene => scene.dataset.position === 'outgoing').length, 0);
  assert.equal(page.scenes.filter(scene => scene.style.clipPath !== 'none').length, 0); assertSharedClock(page);
});

test('mobile swipes navigate once; cancelled, vertical and multitouch gestures do not', () => {
  const page = browser({width: 390}), touch = (x, y, identifier = 1) => ({clientX: x, clientY: y, identifier});
  page.root.dispatch('touchstart', {touches: [touch(300, 400)]});
  page.root.dispatch('touchend', {changedTouches: [touch(100, 410)]});
  assert.equal(page.activeIndex, 1); assert.equal(page.pendingFrames, 1);
  page.root.dispatch('touchend', {changedTouches: [touch(100, 410)]});
  assert.equal(page.activeIndex, 1, 'a repeated touchend cannot replay a swipe');
  page.root.dispatch('touchstart', {touches: [touch(300, 400)]}); page.root.dispatch('touchcancel');
  page.root.dispatch('touchend', {changedTouches: [touch(100, 410)]}); assert.equal(page.activeIndex, 1);
  page.root.dispatch('touchstart', {touches: [touch(300, 400)]});
  page.root.dispatch('touchend', {changedTouches: [touch(230, 650)]});
  assert.equal(page.activeIndex, 1, 'vertical page scrolling does not navigate');
  page.root.dispatch('touchstart', {touches: [touch(300, 400), touch(200, 400, 2)]});
  page.root.dispatch('touchend', {changedTouches: [touch(100, 410)]}); assert.equal(page.activeIndex, 1);
  page.root.dispatch('touchstart', {touches: [touch(100, 400)]});
  page.root.dispatch('touchend', {changedTouches: [touch(300, 410)]}); assert.equal(page.activeIndex, 0);
  page.runFor(1500); const first = cardPose(page); page.runFor(1500);
  assert.notEqual(cardPose(page), first); assertSharedClock(page);
  assertAccessibleSelection(page); assert.equal(page.pendingFrames, 1);
});

test('keyboard and surprise navigation preserve one active scene and one clock', () => {
  const page = browser(), right = page.root.dispatch('keydown', {key: 'ArrowRight'});
  assert.equal(right.defaultPrevented, true); assert.equal(page.activeIndex, 1);
  page.root.dispatch('keydown', {key: 'ArrowLeft'}); assert.equal(page.activeIndex, 0);
  page.shuffle.dispatch('click'); assert.notEqual(page.activeIndex, 0);
  assert.equal(page.pendingFrames, 1); assertAccessibleSelection(page); page.runFor(2000); assertSharedClock(page);
});
