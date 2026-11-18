import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='lite-xl');
test('Lite XL multi-cursor support has fixed core evidence without broadening plugin claims',()=>{
 assert.deepEqual(p.features.multi_cursor,{value:'yes'});
 for(const path of ['commands/doc.lua','keymap.lua'])assert(p.sources.includes('https://github.com/lite-xl/lite-xl/blob/0af4dae0e2748d6afe7bded41c13d96f627cb520/data/core/'+path));
 assert.equal(p.features.lsp.value,'partial');assert.equal(p.features.debugger.value,'unknown');assert.equal(p.features.live_share.value,'unknown');assert.match(p.free_tier_limits,/语言服务器/);assert.match(p.free_tier_limits,/第三方插件/);
});
