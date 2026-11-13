import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const root=new URL('../../',import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const spec=read('docs/design/category-cover-spec.json');
const cats=[...read('data.json').categories,...fs.readdirSync(new URL('categories/',root)).filter(f=>f.endsWith('.json')).map(f=>read(`categories/${f}`))];
const slugs=cats.map(c=>c.category_slug||c.id).sort();
test('every category has a separate palette, scene and illustration asset',()=>{
 assert.deepEqual(Object.keys(spec.categories).sort(),slugs);
 assert.deepEqual(fs.readdirSync(new URL('site/public/categories/',root)).filter(f=>f.endsWith('.svg')).map(f=>f.slice(0,-4)).sort(),slugs);
 assert.equal(spec.width,480);assert.equal(spec.height,260);
 for(const slug of slugs){
  const brief=spec.categories[slug];assert.match(brief.background,/^#[A-F0-9]{6}$/);assert(brief.scene.trim().length>15);
  const svg=fs.readFileSync(new URL(`site/public/categories/${slug}.svg`,root),'utf8');
  assert(svg.includes(`viewBox="0 0 ${spec.width} ${spec.height}"`),slug);
  assert(svg.includes(`<rect width="480" height="260" fill="${brief.background}"`),slug);
  assert.doesNotMatch(svg,/<(?:text|image|script|foreignObject)\b/i,slug);
  assert.doesNotMatch(svg,/compare-v2|id="grid"|comparison-bar brand signature/,slug);
 }
});
test('prompt CLI combines the common prefix, category color and scene without main-cover branding',()=>{
 const prompt=execFileSync(process.execPath,[new URL('scripts/category-cover-prompt.mjs',root).pathname,'fitness-training'],{encoding:'utf8'});
 assert(prompt.startsWith(spec.commonPrefix));assert(prompt.includes(spec.categories['fitness-training'].background));assert(prompt.includes(spec.categories['fitness-training'].scene));
 assert(prompt.includes('strictly no typography'));assert(!prompt.includes('wordmark'));
 assert.throws(()=>execFileSync(process.execPath,[new URL('scripts/category-cover-prompt.mjs',root).pathname,'not-a-category'],{stdio:'pipe'}));
});
