import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';const c=JSON.parse(fs.readFileSync(new URL('../../categories/animation-3d.json',import.meta.url)));const en=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));test('Dust3D scopes procedural animation and Mac binaries',()=>{const p=c.products.find(x=>x.id==='dust3d');assert(p);assert.equal(p.license,'MIT');assert.equal(p.features.animation_3d.value,'partial');assert.match(p.free_tier_limits,/Intel Mac/);for(const k of ['summary','free_tier_limits','price_summary','pricing_model'])assert(en[p[k]]);});

test('3ds Max distinguishes Windows requirements, commercial terms and Arnold rendering licenses',()=>{
 const p=JSON.parse(fs.readFileSync(new URL('../../categories/animation-3d.json',import.meta.url))).products.find(p=>p.id==='3ds-max');
 const dict=JSON.parse(fs.readFileSync(new URL('../src/i18n/content-en.json',import.meta.url)));
 assert(p);assert.equal(p.open_source,false);assert.equal(p.license,'Proprietary');
 assert.deepEqual(p.platforms,['Windows']);
 assert.deepEqual(Object.values(p.features).map(f=>f.value),['yes','yes','yes','yes']);
 assert.match(p.free_tier_limits,/30 天试用，仅限评估，不可用于商业或生产，也不可延长.*64 位 Windows 11.*不支持原生 macOS.*2027[.]3/);
 assert.deepEqual(p.prices.map(r=>[r.price,r.currency,r.period]),[['255','USD','月'],['2010','USD','年']]);
 assert.match(p.price_summary,/三年 6,025 美元.*不是中国区报价.*Indie.*资格限制/);
 assert.match(p.features.rigging_3d.note,/CAT 与 Biped.*Skin/);
 assert.match(p.features.animation_3d.note,/关键帧.*Track View/);
 assert.match(p.features.rendering_3d.note,/交互式无水印.*批量或命令行.*单独的 Arnold 许可/);
 const source=fs.readFileSync(new URL('../src/lib/display.ts',import.meta.url),'utf8');
 const leak=source.slice(source.indexOf('const LEAK ='),source.indexOf('export const PRICE_CAVEAT'));
 const fn=source.slice(source.indexOf('export function cleanPublicText'),source.indexOf('export function parseCurrency')).replace('export function','function').replace('(input: string | null | undefined): string','(input)');
 const clean=new Function(leak+fn+';return cleanPublicText;')();
 for(const raw of [p.summary,p.price_summary,p.free_tier_limits,...p.prices.map(r=>r.note),...Object.values(p.features).map(f=>f.note)]){const key=clean(raw);assert(key);assert(dict[key],key);assert.doesNotMatch(dict[key],/[\u4e00-\u9fff]/);}
});
