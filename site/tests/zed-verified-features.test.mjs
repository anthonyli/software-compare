import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='zed');
for(const [key,note,path] of [['debugger','DAP','debugger.md'],['remote_dev','SSH','remote-development.md']])test(`Zed has verified ${key} with protocol scope`,()=>{
 assert.deepEqual(p.features[key],{value:'yes',note});assert(p.sources.includes('https://github.com/zed-industries/zed/blob/e8bc16acee5ae1937600d571d441c4b5d7b0d288/docs/src/'+path));
});
