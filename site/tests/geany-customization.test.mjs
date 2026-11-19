import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/code-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='geany');
test('Geany customization has fixed official manual evidence and preserves boundaries',()=>{
 assert.deepEqual(p.features.customizable,{value:'yes'});
 assert(p.sources.includes("https://github.com/geany/geany/blob/0e02cc52a7634d1fed8511bd44730ea0ab791d9f/doc/geany.txt"));
 assert.equal(p.features.integrated_terminal.value,'partial');assert.equal(p.features.lsp.value,'partial');assert.match(p.free_tier_limits,/GTK/);assert.match(p.free_tier_limits,/网络/);
});
