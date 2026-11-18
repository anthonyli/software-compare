import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='reaper');
test('REAPER batch conversion is verified without extrapolating other capabilities',()=>{
 assert.deepEqual(p.features.batch,{value:'yes'});
 for(const url of ['https://dlz.reaper.fm/userguide/ReaperUserGuide726c.pdf','https://www.reaper.fm/userguide.php','https://www.reaper.fm/download.php']) assert(p.sources.includes(url));
 for(const key of ['noise_reduce','spectral']) assert.equal(p.features[key].value,'unknown');
 assert.equal(p.latest_release,'7.85');
 assert.equal(p.license,'专有软件');
 assert.match(p.free_tier_limits,/60 天/);
});
