import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/archivers.json',import.meta.url),'utf8')).products.find(p=>p.id==='file-roller');
test('File Roller preserves the official or-later permission, not metadata licensing',()=>{
 assert.equal(p.license,'GPL-2.0-or-later');assert.equal(p.open_source,true);
 for(const path of ['data/org.gnome.FileRoller.metainfo.xml.in','src/fr-window.c'])assert(p.sources.includes('https://github.com/GNOME/file-roller/blob/8ab872836c7f126c8def2762ff2496b4efe971cd/'+path));
});
