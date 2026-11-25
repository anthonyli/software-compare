import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/personal-ai-assistants.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const [grok, gemini] = data.products;
const keys = ['pa_background','pa_schedule','pa_connector','pa_review','pa_sharing','pa_local_only'];

test('delegated task, connection, approval and cloud retention stay distinct from chat', () => {
  assert.deepEqual(data.features.map(f => f.key), keys);
  assert.deepEqual(data.products.map(p => p.id), ['grok-bot','gemini-tasks']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','yes','yes','no'],
    ['yes','yes','yes','yes','no','no'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(p.sources.length >= 6);
  }
  assert.match(data.notes, /不重复比较通用聊天、编程工作台或记忆工具.*不能把接入等同于全权访问/);
  assert.match(grok.summary, /不是普通 Grok 聊天客户端/);
  assert.match(grok.features.pa_review.note, /不是逐项人工批准/);
  assert.match(grok.features.pa_local_only.note, /需要云存储.*同一台.*Legacy Privacy Mode 不支持/);
  assert.match(gemini.summary, /不是通用 Gemini 聊天或 Google Tasks 待办应用/);
  assert.match(gemini.features.pa_review.note, /部分已连接操作并不逐项确认/);
  assert.match(gemini.features.pa_local_only.note, /要求开启历史.*不使服务成为纯本机/);
});

test('current Grok mobile builds and account-specific task limits are sourced without claiming parity', () => {
  assert.deepEqual([grok.latest_release,grok.latest_release_date],['v1.2.3','2026-11-18']);
  assert(grok.sources.includes('https://x.ai/changelog/bot'));
  assert.match(grok.free_tier_limits, /v1\.2\.3（2026-11-18）为最新产品版本.*1\.0.*不是当前版本/);
  assert.deepEqual(grok.platforms,['macOS','Windows','Linux','iOS','iPadOS','Android']);
  assert.deepEqual(gemini.platforms,['Web','macOS','iOS','iPadOS','Android']);
  assert.match(grok.free_tier_limits, /Apple 芯片和 Intel.*x64 和 Arm64.*iOS\/iPadOS 18\+、Android 9\+/);
  assert.deepEqual(grok.prices.map(x => [x.price,x.currency,x.period]), [['30','USD','month'],['100','USD','month'],['200','USD','month']]);
  assert.match(grok.price_summary, /Free 和 Plus 不含.*周用量池.*预付额度.*旧 Cursor 套餐规则不同/);
  assert.match(gemini.free_tier_limits, /年满 18 岁.*个人 Google 账号且开启历史.*iPhone、iPad 和 Android.*工作或学校账号暂不支持/);
  assert.match(gemini.features.pa_schedule.note, /免费\/Plus.*10 个活跃任务日程.*最多每日一次.*Pro\/Ultra 最多 50 个/);
  assert.match(gemini.price_summary, /美国、澳大利亚、加拿大、印度、日本、韩国.*其他 Gemini 支持地区需 Google AI Pro 或 Ultra.*欧洲经济区、尼日利亚、瑞士和英国.*付费也不例外/);
});

test('the localized AI task catalog does not replace chat, coding, or memory comparisons', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  const config=read('site/src/config.ts');
  assert.match(config, /id: "ai".*"ai-assistants".*"ai-agent-workbenches".*"ai-memory", "personal-ai-assistants"/);
  assert.match(read('site/src/i18n/labels.ts'), /"personal-ai-assistants": \{ zh: "个人 AI 助理（任务与提醒）", en: "Personal AI assistants for tasks" \}/);
  assert.match(read('site/src/pages/c/[slug].astro'), /category.slug === "personal-ai-assistants".*data-personal-ai-assistant-notes.*tr\(category.notes\)/);
  assert.match(read('site/public/categories/personal-ai-assistants.svg'), /viewBox="0 0 480 260"/);
});
