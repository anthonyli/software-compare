#!/usr/bin/env node
import fs from 'node:fs';
const spec = JSON.parse(fs.readFileSync(new URL('../docs/design/category-cover-spec.json', import.meta.url), 'utf8'));
const slug = process.argv[2];
if (!slug || !Object.hasOwn(spec.categories, slug)) {
 console.error('Usage: node scripts/category-cover-prompt.mjs <category-slug>\nKnown categories: '+Object.keys(spec.categories).join(', '));
 process.exit(1);
}
const { background, scene } = spec.categories[slug];
console.log(`${spec.commonPrefix}\n\n背景色 ${background}。${scene}\n\nstrictly no typography`);
