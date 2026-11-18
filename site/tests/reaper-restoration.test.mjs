import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='reaper');
test('REAPER included noise reduction and spectral editing have official evidence',()=>{
 for(const key of ['noise_reduce','spectral']) assert.deepEqual(p.features[key],{value:'yes'});
 for(const url of ['https://www.reaper.fm/about.php','https://www.reaper.fm/reaplugs/']) assert(p.sources.includes(url));
 assert.deepEqual(p.features.batch,{value:'yes'});
 assert.equal(p.latest_release,'7.85'); assert.equal(p.license,'专有软件');
 assert.match(p.free_tier_limits,/60 天/);
});
