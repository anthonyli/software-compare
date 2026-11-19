import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='flowblade');
test('Flowblade proxy editing is documented without inferring rendering acceleration',()=>{
 assert.deepEqual(p.features.proxy,{value:'yes'});
 assert(p.sources.includes('https://github.com/jliljebl/flowblade/blob/54b68c4532e4d50e3f617a38a680315eb159f11e/flowblade-trunk/Flowblade/res/help/proxy.html'));
 assert.deepEqual(p.platforms,['Linux']);
 for(const key of ['gpu_accel'])assert.equal(p.features[key].value,'unknown');
});
