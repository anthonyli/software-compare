import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='flowblade');
for(const key of ['titles','audio_mix'])test(`Flowblade has officially documented ${key}`,()=>{
 assert.deepEqual(p.features[key],{value:'yes'});
 assert(p.sources.includes('https://github.com/jliljebl/flowblade/blob/54b68c4532e4d50e3f617a38a680315eb159f11e/flowblade-trunk/Flowblade/res/help/tools.html'));
});
