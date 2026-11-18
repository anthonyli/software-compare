import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='tenacity');
test('Tenacity software license follows official manual rather than documentation license',()=>{
 assert.equal(p.license,'GPL-2.0-or-later');assert.equal(p.open_source,true);
 assert(p.sources.includes('https://tenacityaudio.org/docs/'));
 assert.equal(p.features.spectral.value,'unknown');assert.equal(p.features.batch.value,'unknown');
 assert.deepEqual(p.platforms,['Windows','macOS','Linux']);
});
