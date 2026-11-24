import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/ai-agent-workbenches.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const keys = ['workbench_multi_agent','workbench_worktrees','workbench_terminal_diff','workbench_owned_remote','workbench_managed_compute','workbench_approvals'];

test('agent workbenches separate worktrees, self-managed hosts, managed compute and approval', () => {
  assert.equal(data.category_slug, 'ai-agent-workbenches');
  assert.match(data.notes, /不是单个编程 Agent、终端模拟器或 Agent 浏览器.*Git 工作树.*不是系统沙箱/);
  assert.match(en[data.notes], /not a system sandbox/);
  assert.deepEqual(data.features.map(({ key }) => key), keys);
  assert.deepEqual(data.products.map(({ id }) => id), ['orca','t3-code','conductor']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['yes','yes','yes','yes','unknown','partial'],
    ['yes','yes','yes','yes','no','partial'],
    ['yes','yes','yes','no','paid','partial'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(Object.keys(p.features), keys);
    assert(Object.values(p.features).every(c => Boolean(c.note)));
    assert(p.sources.length >= 6);
  }
  const [orca, t3, conductor] = data.products;
  const orcaManagedCompute = orca.features.workbench_managed_compute.note;
  assert.match(orcaManagedCompute, /自备服务方.*不是 Orca 托管 VPS.*隐私政策提到用户选择的托管沙箱.*Orca 是否自行提供以及价格均未核实/);
  assert.match(en[orcaManagedCompute], /privacy policy mentions hosted sandboxes that users choose.*availability and pricing of any Orca-managed sandbox remain unverified/);
  assert.match(orca.price_summary, /Orca 是否自行提供托管沙箱及其价格均未核实/);
  assert.match(en[orca.price_summary], /Availability and pricing of any Orca-managed sandbox remain unverified/);
  assert(orca.sources.includes('https://orca.dev/privacy'));
  assert(conductor.sources.includes('https://www.conductor.build/changelog'));
  assert.match(orca.features.workbench_approvals.note, /默认全权限.*不.*逐次询问.*不是系统沙箱/);
  assert.match(t3.features.workbench_owned_remote.note, /T3 Connect 中继.*主机必须在线/);
  assert.match(t3.features.workbench_managed_compute.note, /接入方式.*不.*厂商计算沙箱/);
  assert.match(t3.features.workbench_approvals.note, /初始默认全权限.*监督审批.*管理员可限制/);
  assert.match(conductor.features.workbench_owned_remote.note, /尚不支持用自己的云机器.*遥控本机不是自管远程执行/);
  assert.match(conductor.features.workbench_managed_compute.note, /Vercel 的托管 Linux 沙箱.*厂商管理.*已撤销之前的关停计划/);
  assert.match(conductor.features.workbench_approvals.note, /当前用户权限.*工作区的密钥.*相应权限/);
});

test('agent workbench releases, desktop platforms, agent providers and costs stay scoped', () => {
  const [orca,t3,conductor] = data.products;
  assert.deepEqual(data.products.map(p => [p.open_source,p.license,p.latest_release,p.latest_release_date,p.platforms]), [
    [true,'MIT','v1.4.273','2026-11-24',['macOS','Windows','Linux']],
    [true,'MIT','v0.1.11','2026-11-20',['macOS','Windows','Linux']],
    [false,'专有许可','0.99.1',null,['macOS']],
  ]);
  assert.match(orca.free_tier_limits, /配对伴侣.*不是手机上的原生执行环境.*单独标为预发布/);
  assert.match(t3.free_tier_limits, /nightly 分开.*接入客户端.*至少一个已配置并登录/);
  assert.match(t3.features.workbench_multi_agent.note, /Codex.*Kiro.*ACP Agent/);
  assert.match(conductor.features.workbench_multi_agent.note, /Claude Code、Codex、OpenCode.*Cursor API.*密钥/);
  assert.match(conductor.price_summary, /本地使用免费.*Pro、Teams、Enterprise.*未核实当前计划金额/);
});

test('AI category wiring, features, source notes and cover are bilingual', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"ai-coding", "ai-agent-workbenches", "ai-image-workflows"/);
  assert.match(read('site/src/i18n/labels.ts'), /"ai-agent-workbenches": \{ zh: "AI 编程 Agent 工作台", en: "AI coding agent workbenches" \}/);
  assert.match(read('site/public/categories/ai-agent-workbenches.svg'), /viewBox="0 0 480 260"/);
});
