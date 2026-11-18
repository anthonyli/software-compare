import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='izotope-rx');
test('RX recording and batching are scoped to Standard and Advanced',()=>{
 for(const k of ['record','batch']) assert.deepEqual(p.features[k],{value:'partial',note:'Standard / Advanced'});
 assert(p.sources.includes('https://www.izotope.com/products/rx-standard'));
 assert.equal(p.features.midi.value,'no');
 assert.equal(p.latest_release,'未知');
});
