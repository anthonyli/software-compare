import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/photo-management.json',import.meta.url),'utf8')).products.find(p=>p.id==='digikam');
test('digiKam versioning is verified without implying universal save behavior',()=>{
 assert.deepEqual(p.features.non_destructive,{value:'yes',note:'Versioning'});
 assert(p.sources.includes('https://github.com/KDE/digikam-doc/blob/d8283d990cc1f921956111879e390a28e26d7a3e/setup_application/editor_settings.rst'));
});
test('digiKam tethering is explicitly limited to gPhoto2',()=>{
 assert.deepEqual(p.features.tethering,{value:'partial',note:'gPhoto2'});
 assert(p.sources.includes('https://github.com/KDE/digikam-doc/blob/d8283d990cc1f921956111879e390a28e26d7a3e/menu_descriptions/menu_importtool.rst'));
});
