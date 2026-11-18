import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/pdf-tools.json',import.meta.url),'utf8')).products.find(p=>p.id==='naps2');
test('NAPS2 verified PDF compression keeps its scan-oriented scope',()=>{
 assert.deepEqual(p.features.compress,{value:'yes'});
 for(const url of ['https://www.naps2.com/doc/editing#compress','https://www.naps2.com/doc/settings'])assert(p.sources.includes(url));
 assert.match(p.free_tier_limits,/扫描到 PDF\/图像/);
 assert.match(p.free_tier_limits,/不是通用 PDF 编辑器/);
 assert.equal(p.features.edit_text.value,'no');
 assert.equal(p.features.annotate.value,'unknown');
});
