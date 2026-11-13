import fs from 'node:fs/promises';

// Pages advanced mode runs the same vote API as the original Worker.
await fs.copyFile('worker/index.js', 'dist/_worker.js');
await fs.writeFile('dist/_routes.json', JSON.stringify({
  version: 1,
  include: ['/api/*'],
  exclude: [],
}, null, 2) + '\n');
