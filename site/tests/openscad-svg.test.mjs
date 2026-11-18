import {test} from 'node:test';
import assert from 'node:assert/strict';import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync(new URL('../../categories/cad.json',import.meta.url),'utf8')).products.find(p=>p.id==='openscad');
test('OpenSCAD vector output is narrowly verified as 2D SVG',()=>{
 assert.deepEqual(p.features.vector_export,{value:'partial',note:'2021.01 · 2D · SVG'});
 assert.equal(p.features.dwg.value,'unknown');
 assert(p.sources.includes('https://github.com/openscad/openscad/blob/41f58fe57c03457a3a8b4dc541ef5654ec3e8c78/src/export_svg.cc'));
});
