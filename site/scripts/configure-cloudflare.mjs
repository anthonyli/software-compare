import fs from 'node:fs/promises';
const {CLOUDFLARE_D1_DATABASE_ID, PUBLIC_SITE_URL}=process.env;
if(!/^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/i.test(CLOUDFLARE_D1_DATABASE_ID || '') || CLOUDFLARE_D1_DATABASE_ID==='00000000-0000-0000-0000-000000000000') throw new Error('Set CLOUDFLARE_D1_DATABASE_ID to your D1 database ID.');
const url=new URL(PUBLIC_SITE_URL || 'http://localhost');
if(url.protocol!=='https:' || url.pathname!=='/' || url.hostname.endsWith('.example') || url.search || url.hash) throw new Error('Set PUBLIC_SITE_URL to your production HTTPS origin.');
const config=JSON.parse(await fs.readFile('wrangler.jsonc','utf8'));
config.d1_databases[0].database_id=CLOUDFLARE_D1_DATABASE_ID;
await fs.writeFile('wrangler.deploy.json',JSON.stringify(config,null,2)+'\n');
console.log('Production Worker configuration prepared.');
