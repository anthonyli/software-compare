import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/archivers.json',import.meta.url),'utf8')).products.find(p=>p.id==='ark');
test('Ark uses its official project license, not metadata license or release availability',()=>{
 assert.equal(p.license,'GPL-2.0-or-later');assert.equal(p.open_source,true);
 for(const path of ['app/org.kde.ark.appdata.xml','app/main.cpp'])assert(p.sources.includes('https://github.com/KDE/ark/blob/adce1ae0b77cb369b1aa835102d1e986cfdae66d/'+path));
});
