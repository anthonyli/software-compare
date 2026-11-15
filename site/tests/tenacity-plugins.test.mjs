import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Tenacity basic plugins cite official site and version-scoped manual',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/audio-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='tenacity');assert.equal(rows.length,1);const p=rows[0];
 assert.deepEqual(p.features.plugins,{value:'yes'});
 for(const s of ['https://tenacityaudio.org/','https://tenacityaudio.org/docs/index.html','https://tenacityaudio.org/docs/_content/Effects_Plugins_and_Modules.html','https://tenacityaudio.org/docs/_content/Preferences.html'])assert(p.sources.includes(s));
 assert.equal(p.latest_release,'未知');for(const k of ['batch','spectral'])assert.equal(p.features[k].value,'unknown');
});
