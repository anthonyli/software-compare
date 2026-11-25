import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root = new URL('../../', import.meta.url);
const read = file => JSON.parse(fs.readFileSync(new URL(file, root), 'utf8'));
const categories = [...read('data.json').categories, ...fs.readdirSync(new URL('categories/', root)).filter(f => f.endsWith('.json')).map(f => read(`categories/${f}`))];
const added = ['ai-assistants','image-editors','vector-graphics','photo-management','desktop-publishing','ai-coding','ai-image-workflows','animation-3d','animation-2d','compositing','database-clients','api-clients','audio-recorders','transcription-tools','fitness-training','cycling-tools','outdoor-navigation','file-backup'];
const slug = c => c.category_slug || c.id;
const config = fs.readFileSync(new URL('site/src/config.ts', root), 'utf8');
const translations = read('site/src/i18n/content-en.json');
test('catalog category and product routes are unique', () => {
 assert.equal(new Set(categories.map(slug)).size, categories.length);
 for (const c of categories) {
  assert.match(slug(c), /^[a-z0-9-]+$/);
  const ids = c.products.map(p => p.id);
  assert.equal(new Set(ids).size, ids.length, slug(c));
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
 }
});
test('new categories have navigation and sourced complete comparison data', () => {
 for (const id of added) {
  const c = categories.find(c => slug(c) === id);
  assert(c, id); assert(config.includes(`"${id}"`)); assert(c.products.length > 0);
  assert.match(c.collected_at, /^\d{4}-\d{2}-\d{2}$/);
  assert(c.collected_at >= '2026-11-13');
  assert.equal(new Date(c.collected_at).toISOString().slice(0,10), c.collected_at);
  const keys = c.features.map(f => f.key); assert.equal(new Set(keys).size, keys.length);
  for (const p of c.products) {
   assert(p.sources.length > 0);
   for (const url of [p.official_url,...p.sources]) assert.match(url, /^https?:\/\//);
   assert.equal(typeof p.open_source, 'boolean'); assert(p.platforms.length > 0); assert(p.license);
   assert.deepEqual(Object.keys(p.features).sort(), [...keys].sort(), p.id);
   for (const f of Object.values(p.features)) assert(['yes','no','partial','paid','unknown','na'].includes(f.value));
  }
 }
});
test('new catalog text has English translations', () => {
 const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
 const newCats = categories.filter(c => added.includes(slug(c)));
 const recorders = categories.find(c => slug(c) === 'screen-recorders').products.filter(p => ['focusee','screen-studio'].includes(p.id));
 for (const text of strings([...newCats,...recorders]).filter(s => /[\u4e00-\u9fff]/.test(s))) assert(translations[text], `Missing English: ${text}`);
});
test('requested screen recorders have complete feature rows', () => {
 const c = categories.find(c => slug(c) === 'screen-recorders');
 for (const id of ['focusee','screen-studio']) {
  const items = c.products.filter(p => p.id === id); assert.equal(items.length, 1);
  assert.equal(items[0].collected_at, '2026-11-13');
  assert.deepEqual(Object.keys(items[0].features).sort(), c.feature_keys.map(f => f.key).sort());
 }
});
test('every category has a self-contained, correctly sized SVG cover', () => {
 for (const c of categories) {
  const id = slug(c);
  const path = new URL(`site/public/categories/${id}.svg`, root);
  assert(fs.existsSync(path), `Missing category cover: ${id}`);
  const svg = fs.readFileSync(path, 'utf8');
  assert.match(svg, /viewBox="0 0 480 260"/, id);
  assert.match(svg, /<\/svg>/, id);
  assert.doesNotMatch(svg, /<script\b|<foreignObject\b|(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i, id);
 }
});
test('category covers retain the original illustration system, not the main-cover prompt', () => {
 for (const c of categories) {
  const id = slug(c);
  const svg = fs.readFileSync(new URL(`site/public/categories/${id}.svg`, root), 'utf8');
  assert(svg.includes(`id="dots-${id}"`), id);
  assert(svg.includes(`id="soft-${id}"`), id);
  assert(svg.includes(`id="wash-${id}"`), id);
  assert.doesNotMatch(svg, /compare-v2|id="grid"|comparison-bar brand signature/);
 }
});

test('AI navigation has exactly the three requested categories and retains local products', () => {
 const aiLine = config.split('\n').find(line => line.includes('id: "ai"'));
 for (const id of ['ai-assistants','ai-coding','ai-image-workflows']) assert(aiLine.includes(`"${id}"`));
 assert(!aiLine.includes('local-ai'));
 assert(!categories.some(c => slug(c) === 'local-ai'));
 const chat = categories.find(c => slug(c) === 'ai-assistants');
 for (const id of ['chatgpt','claude','gemini','jan','lm-studio','ollama']) assert(chat.products.some(p => p.id === id));
 assert(chat.products.length >= 12);
});

test('file backup distinguishes default checks, external scheduling and optional Borg encryption', () => {
 const category = categories.find(c => slug(c) === 'file-backup');
 const [restic, kopia, borg] = category.products;
 assert.deepEqual(category.products.map(p => p.id), ['restic', 'kopia', 'borgbackup', 'time-machine', 'windows-file-history', 'arq-7']);
 assert.deepEqual(category.products.map(p => p.features.backup_schedule.value), ['no', 'yes', 'no', 'yes', 'yes', 'yes']);
 assert.match(restic.features.backup_verify.note, /默认.*--read-data/);
 assert.match(kopia.features.backup_verify.note, /默认.*--verify-files-percent=100/);
 assert.equal(borg.features.backup_encryption.value, 'partial');
 assert.match(borg.features.backup_destinations.note, /1\.4.*SSH.*不按原生 S3/);
 assert(!borg.platforms.includes('Windows'));
});

test('Time Machine distinguishes local and network storage, verification and migration', () => {
 const p = categories.find(c => slug(c) === 'file-backup').products.find(p => p.id === 'time-machine');
 assert.deepEqual(p.platforms, ['macOS']);
 assert.equal(p.open_source, false);
 assert.match(p.free_tier_limits, /APFS.*同盘/);
 assert.equal(p.features.backup_encryption.value, 'partial');
 assert.match(p.features.backup_destinations.note, /SMB NAS.*不直连 S3/);
 assert.equal(p.features.backup_retention.value, 'partial');
 assert.match(p.features.backup_restore.note, /不是启动盘克隆/);
 assert.equal(p.features.backup_verify.value, 'partial');
 assert.match(p.features.backup_verify.note, /网络备份.*不替代恢复演练/);
});

test('Windows File History is not a cloud sync or a system image', () => {
 const p = categories.find(c => slug(c) === 'file-backup').products.find(p => p.id === 'windows-file-history');
 assert.deepEqual(p.platforms, ['Windows']);
 assert.match(p.free_tier_limits, /加入库.*不是 OneDrive 同步或系统映像/);
 assert.equal(p.features.backup_encryption.value, 'unknown');
 assert.equal(p.features.backup_verify.value, 'unknown');
 assert.match(p.features.backup_destinations.note, /外接盘或网络位置.*不直连 S3/);
 assert.match(p.features.backup_restore.note, /其他位置.*覆盖/);
});

test('Arq separates optional cloud recall, storage plans and destination-dependent verification', () => {
 const p = categories.find(c => slug(c) === 'file-backup').products.find(p => p.id === 'arq-7');
 assert.deepEqual(p.platforms, ['macOS', 'Windows']);
 assert.deepEqual(p.prices.map(({ price, period }) => [price, period]), [['59.99', 'once'], ['69.99', 'year']]);
 assert.match(p.price_summary, /存储自备.*5 台.*1 TB/);
 assert.match(p.free_tier_limits, /占位符.*保持登录/);
 assert.equal(p.features.backup_encryption.value, 'partial');
 assert.equal(p.features.backup_verify.value, 'partial');
 assert.match(p.features.backup_verify.note, /NAS 或 SFTP/);
});

test('Harmony confirms separate 2D editions without guessing store prices', () => {
 const p = categories.find(c => slug(c) === 'animation-2d').products.find(p => p.id === 'toon-boom-harmony');
 assert.deepEqual(p.platforms, ['Windows', 'macOS', 'Linux']);
 assert.equal(p.open_source, false);
 assert.deepEqual(p.prices, []);
 assert.match(p.price_summary, /Essentials、Advanced、Premium.*实时商店金额未核实/);
 assert.match(p.features.raster_animation.note, /Advanced.*原生位图图层/);
 assert.equal(p.features.node_effects.value, 'partial');
 assert.match(p.features.node_effects.note, /节点视图按 Premium 计/);
});

test('Glaxnimate does not conflate partial web-format support with bitmap drawing', () => {
 const p = categories.find(c => slug(c) === 'animation-2d').products.find(p => p.id === 'glaxnimate');
 assert.equal(p.license, 'GPL-3.0-or-later');
 assert.deepEqual(p.platforms, ['Linux', 'Windows', 'macOS']);
 assert.equal(p.features.vector_animation.value, 'yes');
 assert.match(p.free_tier_limits, /不是所有特性都兼容.*SMIL/);
 assert.equal(p.features.raster_animation.value, 'unknown');
 assert.match(p.features.raster_animation.note, /位图描摹.*未确认原生位图/);
});

test('Friction records the stable release and does not count experimental Android support', () => {
 const p = categories.find(c => slug(c) === 'animation-2d').products.find(p => p.id === 'friction');
 assert.deepEqual([p.latest_release, p.latest_release_date], ['1.0.0', '2026-11-08']);
 assert.deepEqual(p.platforms, ['Windows', 'macOS', 'Linux']);
 assert.match(p.free_tier_limits, /不提供内置 Lottie.*GLES3.*不是 Android 安装包/);
 assert.match(p.latest_release_date_note, /WebM.*图像序列.*macOS 26/);
 assert(p.sources.includes('https://friction.graphics/releases/friction-100.html'));
});
