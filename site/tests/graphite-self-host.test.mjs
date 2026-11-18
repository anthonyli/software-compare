import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const d=JSON.parse(readFileSync(new URL('../../categories/vector-graphics.json',import.meta.url)));
const p=d.products.find(p=>p.id==='graphite');
test('Graphite self-hosting is limited to a source-built web bundle',()=>{
 assert.equal(p.features.self_host.value,'partial');
 for(const text of ['cargo run build web','frontend/dist','Rust + Node.js','deployment setup required','not a collaboration server'])assert(p.features.self_host.note.includes(text));
 assert.equal(p.features.collaboration.value,'unknown');
 for(const path of ['.github/workflows/build.yml','tools/cargo-run/src/main.rs','frontend/vite.config.ts'])assert(p.sources.includes('https://github.com/GraphiteEditor/Graphite/blob/c6686a65c31230e9db8d3316d5361c551b450f43/'+path));
 for(const text of ['RC','路线图','HTTP'])assert(p.free_tier_limits.includes(text));
});
