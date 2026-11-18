import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='garageband');
test('GarageBand noise reduction is limited to Noise Gate',()=>{
 assert.deepEqual(p.features.noise_reduce,{value:'partial',note:'Noise Gate'});
 assert(p.sources.includes('https://support.apple.com/en-ae/102011'));
 assert(p.sources.includes('https://support.apple.com/en-az/guide/garageband-iphone/chs39283a21/ios'));
 assert.equal(p.features.spectral.value,'no');
 assert.equal(p.features.batch.value,'no');
 assert.deepEqual(p.platforms,['macOS','iOS']);
});
