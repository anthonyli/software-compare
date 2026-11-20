import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url),'utf8'));const c=read('categories/cli-frameworks.json'),en=read('site/src/i18n/content-en.json');
test('CLI frameworks retain licenses and core versus add-on boundaries',()=>{
 assert.deepEqual(c.products.map(p=>p.id),['cobra','clap','commander','click','typer','oclif']);
 assert.deepEqual(c.products.map(p=>p.license),['Apache-2.0','MIT OR Apache-2.0','MIT','BSD-3-Clause','MIT','MIT']);
 assert.deepEqual(c.products.map(p=>p.features.shell_completion.value),['yes','partial','unknown','yes','yes','partial']);
 assert.deepEqual(c.products.map(p=>p.features.interactive_prompts.value),['unknown','unknown','unknown','yes','yes','partial']);
 assert.match(c.products[1].features.shell_completion.note,/clap_complete/);assert.match(c.products[5].features.interactive_prompts.note,/Inquirer/);
 assert.match(c.products[3].free_tier_limits,/python script.py/);assert.match(c.notes,/不是 AI/);
 for(const p of c.products){assert.equal(p.open_source,true);assert.deepEqual(Object.keys(p.features),c.features.map(f=>f.key));assert(p.sources.length>=2);for(const k of ['github_stars','latest_release','latest_release_date','maintenance_status'])assert.equal(p[k],null);}
});
test('CLI framework Chinese strings have English translations',()=>{const strings=v=>typeof v==='string'?[v]:v&&typeof v==='object'?Object.values(v).flatMap(strings):[];for(const s of strings(c).filter(s=>/[\u4e00-\u9fff]/.test(s)))assert(en[s],s);});
