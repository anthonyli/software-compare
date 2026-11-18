import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('../../categories/audio-editors.json',import.meta.url),'utf8'));
for(const [id,key,source] of [
 ['ocenaudio','record','https://www.ocenaudio.com/changelog'],
 ['hydrogen','export_formats','https://github.com/hydrogen-music/hydrogen/blob/712c25f5bd42942edcb927cd3668f21991efbee2/src/gui/src/ExportSongDialog.cpp']
])test(`${id} has verified ${key} with official evidence`,()=>{
 const p=data.products.find(p=>p.id===id);assert.deepEqual(p.features[key],{value:'yes'});assert(p.sources.includes(source));
});
