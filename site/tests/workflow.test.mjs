import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('production workflow syncs GitHub on push before building',async()=>{
 const workflow=await fs.readFile(new URL('../../.github/workflows/deploy.yml',import.meta.url),'utf8');
 assert.match(workflow,/push:\n    branches: \[main\]/);
 const steps=workflow.split(/(?=^      - )/m);
 const sync=steps.find(step=>step.includes('run: node scripts/sync-github.mjs'));
 assert.ok(sync,'production publish must include GitHub sync');
 assert.doesNotMatch(sync,/^        if:/m,'sync must not skip main pushes');
 assert.match(sync,/GITHUB_TOKEN: \$\{\{ github.token \}\}/);
 assert.ok(workflow.indexOf('run: node scripts/sync-github.mjs')<workflow.indexOf('run: npm run build'));
 assert.match(workflow,/cancel-in-progress: false/);
 assert.doesNotMatch(workflow,/git push[^\n]*--force/);
});
