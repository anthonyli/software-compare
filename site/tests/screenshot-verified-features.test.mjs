import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync(new URL('../../categories/screenshot-tools.json',import.meta.url),'utf8'));
for(const [id,key,source] of [
 ['flameshot','pin_to_screen','https://github.com/flameshot-org/flameshot/blob/f4f2e4e879f0e9b4cb7efb59f6b3f44ed05b1843/src/tools/pin/pintool.cpp'],
 ['sharex','history','https://github.com/ShareX/ShareX/blob/08bfff15e748a945944e609aca7faffbe888c7af/ShareX/TaskHelpers.cs'],
])test(`${id} ${key} is verified with fixed official source`,()=>{
 const p=c.products.find(p=>p.id===id);assert.deepEqual(p.features[key],{value:'yes'});assert(p.sources.includes(source));
});
