import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('Kdenlive titles and basic chroma key cite official manual',()=>{
 const d=JSON.parse(readFileSync(new URL('../../categories/video-editors.json',import.meta.url)));
 const rows=d.products.filter(p=>p.id==='kdenlive');assert.equal(rows.length,1);const p=rows[0];
 for(const k of ['titles','chroma_key'])assert.deepEqual(p.features[k],{value:'yes'});
 assert(p.sources.includes('https://docs.kdenlive.org/en/titles_and_graphics/titles/titles.html'));
 assert(p.sources.includes('https://docs.kdenlive.org/en/effects_and_filters/video_effects/alpha_mask_keying/chroma_key.html'));
 for(const k of ['gpu_accel'])assert.equal(p.features[k].value,'unknown');
});
