import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/video-editors.json',import.meta.url),'utf8')).products.find(p=>p.id==='flowblade');
test('Flowblade documents selectable render profiles and includes UHD dimensions',()=>{
 assert.deepEqual(p.features.export_4k,{value:'yes'});
 assert(p.sources.includes('https://jliljebl.github.io/flowblade/webhelp/rendering.html'));
 assert(p.sources.includes('https://github.com/jliljebl/flowblade/blob/b02805fb0e85a7eac978aab6638f37fdc0456cc3/flowblade-trunk/Flowblade/res/profiles/uhd_2160p_30'));
 assert.equal(p.features.gpu_accel.value,'unknown');
 assert.deepEqual(p.platforms,['Linux']);
});
