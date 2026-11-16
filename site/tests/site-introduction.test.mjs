import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('site introduction identifies audience, directory scope and public feedback',()=>{
 const home=readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
 const layout=readFileSync(new URL('../src/layouts/Layout.astro',import.meta.url),'utf8');
 assert(home.includes('data-product-intro')); assert(home.includes('个人、内容创作者、开发者和小团队'));
 assert(home.includes('not a software download host')); assert(home.includes('data-product-tags'));
 assert(layout.includes('https://github.com/anthonyli/software-compare/issues'));
 assert(layout.includes('GitHub Issues (public)')); assert(layout.includes('Posts are public'));
});
