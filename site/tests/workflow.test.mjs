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

test('daily sync deploys workspace metadata without Git commits and caches only published snapshots',async()=>{
 const workflow=await fs.readFile(new URL('../../.github/workflows/deploy.yml',import.meta.url),'utf8');
 assert.match(workflow,/cron: '17 1 \* \* \*'/);
 assert.match(workflow,/permissions:\n  contents: read/);
 assert.doesNotMatch(workflow,/contents: write|git (?:add|commit|push|config)/);
 const restore=workflow.indexOf('uses: actions/cache/restore@v4');
 const sync=workflow.indexOf('run: node scripts/sync-github.mjs');
 const build=workflow.indexOf('run: npm run build');
 const deploy=workflow.indexOf('run: node scripts/deploy.mjs');
 const save=workflow.indexOf('uses: actions/cache/save@v4');
 assert.ok(restore>0 && restore<sync && sync<build && build<deploy && deploy<save);
 assert.equal((workflow.match(/path: github-data.json/g)||[]).length,2);
 assert.equal((workflow.match(/key: github-snapshot-v1-\$\{\{ github.run_id \}\}-\$\{\{ github.run_attempt \}\}/g)||[]).length,2);
 assert.match(workflow,/restore-keys: github-snapshot-v1-/);
 const cacheSteps=workflow.split(/(?=^      - )/m).filter(step=>step.includes('uses: actions/cache/'));
 assert.equal(cacheSteps.length,2);
 for(const step of cacheSteps) assert.match(step,/continue-on-error: true/);
 assert.doesNotMatch(cacheSteps[1],/always\(\)|failure\(\)/);
 assert.match(workflow,/cancel-in-progress: false/);
});
