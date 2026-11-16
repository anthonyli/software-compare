import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('homepage uses native, initially collapsed information disclosure and keeps pricing visible',()=>{
 const s=readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
 assert.match(s,/<details data-home-details>/);
 assert.match(s,/<summary[^>]*>[\s\S]*?关于 Compare[\s\S]*?About Compare/);
 assert.match(s,/<p data-free-access>[\s\S]*?第三方软件可能收费/);
 assert.match(s,/data-pricing-details/);
 assert.ok(!s.includes('lg:py-20'));
});
