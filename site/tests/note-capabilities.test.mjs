import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('SiYuan clipping/plugins and AppFlowy mobile have direct official evidence',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/note-taking.json',import.meta.url)));
 const one=id=>{const p=d.products.filter(x=>x.id===id);assert.equal(p.length,1);return p[0];};
 const s=one('siyuan'),a=one('appflowy');
 for(const k of ['web_clipper','plugins'])assert.deepEqual(s.features[k],{value:'yes'});
 assert.deepEqual(a.features.mobile,{value:'yes'});
 assert(s.sources.includes('https://github.com/siyuan-note/siyuan#-features'));assert(a.sources.includes('https://appflowy.com/download'));
 assert.deepEqual(s.features.tags,{value:'yes'});assert.equal(a.features.e2e_encrypt.value,'unknown');assert.equal(a.features.plugins.value,'unknown');
});
