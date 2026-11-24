import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const data = JSON.parse(read('categories/desktop-virtual-machines.json'));
const en = JSON.parse(read('site/src/i18n/content-en.json'));
const keys = ['vm_intel_mac_host', 'vm_apple_silicon_host', 'vm_arm_guest', 'vm_x86_guest_on_apple_silicon', 'vm_windows_3d', 'vm_snapshots', 'vm_host_guest_sharing'];

test('desktop virtualization keeps host chips, guest OS and app emulation separate', () => {
  assert.equal(data.category_slug, 'desktop-virtual-machines');
  assert.match(data.notes, /不是远程桌面.*不代表性能实测/);
  assert.deepEqual(data.features.map(({ key }) => key), keys);
  assert.deepEqual(data.products.map(({ id }) => id), ['parallels-desktop', 'utm', 'vmware-fusion']);
  assert.deepEqual(data.products.map(p => keys.map(k => p.features[k].value)), [
    ['partial', 'yes', 'yes', 'partial', 'yes', 'yes', 'yes'],
    ['yes', 'yes', 'yes', 'yes', 'partial', 'partial', 'yes'],
    ['yes', 'yes', 'yes', 'no', 'yes', 'yes', 'partial'],
  ]);
  for (const p of data.products) {
    assert.deepEqual(p.platforms, ['macOS']);
    assert.deepEqual(Object.keys(p.features), keys);
    assert(Object.values(p.features).every(c => Boolean(c.note)));
    assert(p.sources.length >= 4);
  }
  const [parallels, utm, fusion] = data.products;
  assert.match(parallels.features.vm_intel_mac_host.note, /27 不支持 Intel Mac.*26 系列/);
  assert.match(parallels.features.vm_x86_guest_on_apple_silicon.note, /26 的 Pro、Business、Enterprise.*预览.*未核实 27.*不是 Windows Arm 的单应用模拟/);
  assert.match(parallels.features.vm_windows_3d.note, /OpenGL 4\.3.*macOS Sequoia 15.*Apple M3/);
  assert.match(utm.features.vm_windows_3d.note, /QEMU.*实验.*macOS 13\+.*DirectX 11.*macOS 14\+.*DirectX 12.*Rosetta/);
  assert.match(utm.features.vm_snapshots.note, /QEMU 快照.*Apple 后端需 macOS 27\+/);
  assert.match(fusion.features.vm_arm_guest.note, /不支持 Arm macOS 来宾/);
  assert.match(fusion.features.vm_x86_guest_on_apple_silicon.note, /不等于运行 x86 来宾/);
  assert.match(fusion.features.vm_host_guest_sharing.note, /截至 25H2.*仅列 Linux 来宾，不含 Windows Arm/);
});

test('desktop VM releases, licensing, download accounts and trials remain channel-specific', () => {
  const [parallels, utm, fusion] = data.products;
  assert.deepEqual(data.products.map(p => [p.open_source, p.license, p.latest_release, p.latest_release_date]), [
    [false, '专有许可', '27.1.0 (58756)', '2026-10-29'],
    [true, 'Apache-2.0', 'v5.0.9', '2026-11-18'],
    [false, '专有许可', '26H1u1', null],
  ]);
  assert.match(parallels.free_tier_limits, /14 天 Pro 试用，无需信用卡，但需登录或注册/);
  assert.match(parallels.price_summary, /当前大版本.*Windows 授权另计.*App Store 版/);
  assert.deepEqual(parallels.prices.map(p => [p.price, p.period]), [['99.99','year'], ['219.99','once'], ['119.99','year']]);
  assert.match(utm.price_summary, /GitHub 提供免费.*US\$9\.99/);
  assert.deepEqual(utm.prices, [], 'a paid store price must not hide the free GitHub channel in the hero and matrix');
  assert.match(fusion.price_summary, /免费供个人、教育及商业使用，无需许可证密钥/);
  assert.match(fusion.free_tier_limits, /基础账号及合规核验.*未核实 26H2/);
});

test('desktop VM route, comparison and cover are localized in the developer group', () => {
  const strings = v => typeof v === 'string' ? [v] : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [];
  for (const s of strings(data).filter(s => /[\u4e00-\u9fff]/.test(s))) {
    assert.equal(typeof en[s], 'string', s);
    assert.doesNotMatch(en[s], /[\u4e00-\u9fff]/, s);
  }
  assert.match(read('site/src/config.ts'), /"tui-frameworks", "terminal-emulators", "desktop-virtual-machines"/);
  assert.match(read('site/src/i18n/labels.ts'), /"desktop-virtual-machines": \{ zh: "桌面虚拟机", en: "Desktop virtual machines" \}/);
  assert.match(read('site/public/categories/desktop-virtual-machines.svg'), /viewBox="0 0 480 260"/);
});
