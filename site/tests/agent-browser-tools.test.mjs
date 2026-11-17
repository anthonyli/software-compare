import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../../',import.meta.url);
const c=JSON.parse(fs.readFileSync(new URL('categories/agent-browser-tools.json',root)));
const en=JSON.parse(fs.readFileSync(new URL('site/src/i18n/content-en.json',root)));
const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];
test('independent agent browser tools have sources, bilingual text and complete features',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['agent-browser','browser-use','stagehand','playwright-mcp']);
 for(const p of c.products){assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=3);assert.equal(p.collected_at,'2026-11-17');assert.equal(p.open_source,true);}
 for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);
 const config=fs.readFileSync(new URL('site/src/config.ts',root),'utf8');assert.match(config,/"database-clients", "api-clients", "agent-browser-tools"/);
});
test('tools do not conflate open source with free models, isolated sessions or browser engines',()=>{
 const [cli,bu,sdk,mcp]=c.products;
 assert.equal(cli.license,'Apache-2.0');assert.equal(bu.license,'MIT');assert.equal(sdk.license,'MIT');assert.equal(mcp.license,'Apache-2.0');
 assert.match(cli.summary,/不是自主规划模型/);assert.equal(cli.features.natural_language.value,'partial');
 assert.match(bu.free_tier_limits,/Browser\(\) 默认 Cloud/);assert.match(bu.price_summary,/不含云浏览器和代理/);
 assert.match(mcp.free_tier_limits,/默认持久 profile/);assert.match(mcp.free_tier_limits,/不构成安全边界且不影响重定向/);
 assert.match(sdk.price_summary,/不代表托管服务可免费自建/);assert.equal(sdk.features.existing_session.value,'unknown');
});

test('category renders boundaries and costs rather than only capability badges',()=>{
 const source=fs.readFileSync(new URL('site/src/pages/c/[slug].astro',root),'utf8');
 assert.match(source,/const showContext = .*category.slug === "agent-browser-tools"/);
 assert.match(source,/data-agent-browser-notes/);
 assert.match(source,/category.slug === "agent-browser-tools" \|\| category.slug === "browsers"\) && <p[^>]*><T zh=\{p.price_summary\}/);
});
