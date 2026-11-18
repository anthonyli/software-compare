import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const products=JSON.parse(fs.readFileSync(new URL('../../categories/image-editors.json',import.meta.url),'utf8')).products;
for(const [id,key,note,source] of [
 ['photodemon','plugins','Photoshop 8bf / 32-bit','https://github.com/tannerhelland/PhotoDemon/blob/7c39e83783361c436292570aeda54da75a2d9c8c/Modules/Plugin_8bf.bas'],
 ['pixelitor','animation','GIF','https://github.com/lbalazscs/Pixelitor/blob/86552ad72f443faddb91dd955ed4391e65704490/src/main/java/pixelitor/io/LayerAnimation.java'],
])test(`${id} exposes verified limited capability rather than unrestricted support`,()=>{
 const p=products.find(p=>p.id===id);assert.deepEqual(p.features[key],{value:'partial',note});assert(p.sources.includes(source));
});
