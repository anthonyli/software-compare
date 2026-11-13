# Compare / 软件对比 — 运行与部署

Astro 生成静态页面；Cloudflare Pages 提供静态托管，Pages Functions 提供匿名点赞 API，D1 保存共享票数。
GitHub Actions 每天检查 GitHub 数据，更新独立的 `../github-data.json` 后构建部署。
官网资料仍来自原始 JSON，不自动抓取或覆盖价格、功能、平台和许可证。

## 本地启动

需要 Node.js 22 和 npm。

```bash
cd site
npm ci
npm run dev
```

打开 `http://localhost:8787`。启动时会生成本地 `.dev.vars` 密钥，构建页面，
应用本地 D1 迁移，然后监听源码变化重新构建。点赞保存在 `.wrangler/state`，
重启后仍然存在；不会访问或修改线上 D1。`.dev.vars` 和 `.wrangler` 不提交 Git。

`npm run dev:ui` 只启动 Astro（4321），`npm run preview` 只预览静态产物；
它们没有 Worker API，点赞会明确提示不可用。验证完整功能请使用 `npm run dev`。

## 首次配置 Cloudflare

1. 在 Cloudflare 建立 D1 数据库（数据库名 `software-compare`），或运行
   `npx wrangler login`、`npx wrangler d1 create software-compare`。记录数据库 UUID 和账户 ID。
2. 准备 API Token，限定目标账户并授予 Cloudflare Pages Edit、D1 Edit；
   如果还要管理自定义域名，另配置相关域名权限。域名绑定不是同步脚本的职责。
3. 创建支持外部 DNS 子域名的 Pages 项目：`npx wrangler pages project create software-compare --production-branch main --force`。
   新版 Wrangler 默认将新 Pages 项目转成 Workers；首次创建时使用 `--force` 明确选择 Pages，后续发布不需要此参数。
4. 准备一个随机 Cookie 签名密钥：使用 `openssl rand -hex 32` 生成，作为密钥保存，
   不写进 Git。更换此密钥会让已有浏览器身份失效，因此正常部署应复用同一个值。
5. 在 GitHub 仓库 Settings → Secrets and variables → Actions 配置下表中的 Secret 和 Variable。
   正式站点地址在工作流的 `env.PUBLIC_SITE_URL` 中管理，修改域名时一并更新。

| 类型 | 名称 | 内容 |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| Secret | `COOKIE_SECRET` | 上一步生成的随机密钥，至少 32 字符 |
| Variable | `CLOUDFLARE_D1_DATABASE_ID` | D1 数据库 UUID |
| Workflow env | `PUBLIC_SITE_URL` | 正式 HTTPS 根地址，本项目为 `https://compare.pageon.cc`；不读取旧的同名仓库变量 |

生产 Pages 项目固定名为 `software-compare`。正式域名为 `https://compare.pageon.cc`。
`PUBLIC_SITE_URL` 只用于 canonical、sitemap 和页面链接，不会自动购买或绑定域名。
配置脚本会拒绝空值、占位数据库 ID 和 `.example` 域名。

仓库内 `wrangler.jsonc` 的全零数据库 ID **仅供本地运行**。
生产配置由 `npm run configure:cloudflare` 读取变量后生成到忽略文件
`wrangler.deploy.json`，部署脚本读取该文件，在临时目录准备 Pages 生产配置，迁移使用同一个数据库 ID。

将代码推到 `main` 后，部署工作流执行测试、构建、D1 迁移及 Pages 部署。
部署脚本把 Cookie 密钥写入权限为 0600 的临时 JSON，通过 `wrangler pages secret bulk`
保存到 Pages，再发布构建产物；结束后删除临时文件，不把密钥嵌入静态页面。
`npm run build` 自动复制现有 Worker API 到 Pages 的 `_worker.js`；`_routes.json` 仅让 `/api/*`
调用函数，其他文件由 Pages 静态托管。

本地手动部署：先在当前进程环境提供上表五个变量，再执行 `npm run deploy`。
此命令会修改远程数据库并发布网站；首次运行前确认账户和数据库正确。

## 自定义子域名（保留阿里云 DNS）

只绑定 `compare.pageon.cc`，不更换 `pageon.cc` 的 DNS 服务器，也不修改主站、`pet` 或邮件记录。

1. 在 Pages 项目 → Custom domains 中添加 `compare.pageon.cc`。
2. 在阿里云为 `pageon.cc` 新增一条 `CNAME`：主机记录 `compare`，记录值使用 Pages 页面显示的
   实际项目域名（`*.pages.dev`），默认线路，TTL 10 分钟。
3. 等待 Cloudflare 显示 Active 并签发 HTTPS 证书。
4. 工作流的 `env.PUBLIC_SITE_URL` 设置为 `https://compare.pageon.cc` 后重新部署。

不要将 CNAME 指向 `*.workers.dev`。原 Workers 部署仅保留作迁移备份，后续每日发布到 Pages。
D1 继续复用原数据库；Cookie 属于各自域名，旧 workers.dev 域名的浏览器身份不会自动带到新域名。

## 每日 GitHub 同步

- `.github/workflows/deploy.yml` 每天 **09:17 Asia/Shanghai（01:17 UTC）**执行，
  也支持 Actions 页面手动 Run workflow。GitHub 的定时任务可能延迟；公共仓库
  长期无活动时也可能被停用，应留意 Actions 通知，不能把这个时间视作准点保证。
- 使用工作流内置 `GITHUB_TOKEN`，顺序请求并缓存 ETag；只请求官方 GitHub API。
- 同步 Stars、最新正式 GitHub Release、归档状态、最近推送时间。
  不凭长期无 Release 自动判定停更，也不修改人工维护的官网资料。
- 同一仓库跨品类只请求一次。API 限流时停止剩余请求，下一次运行再尝试；
  服务器错误和网络失败有有限重试。
- 每个仓库的仓库信息和 Release 都校验成功后才一起替换快照；失败保留旧值，
  记录最近检查时间并标记 `pending`。Release 404 仅在仓库请求成功后解释为
  “未发布 GitHub Release”，不删除原始资料中的版本记录。
- 页脚显示原始资料采集时间、GitHub 最近检查时间和成功/待核实数量；
  产品页显示该仓库最后成功同步时间。不会将构建时间伪装为数据更新时间。
- 快照通过测试后提交到仓库，再在同一工作流内部署；不依赖机器人提交再次触发 Actions。
  若主分支保护禁止机器人直接提交，需要允许此同步提交，或将流程改为 PR 审核。

手动检查（从仓库根目录）：

```bash
# 在环境中提供 GITHUB_TOKEN，避免未认证额度不足；不要将令牌写入脚本。
node scripts/sync-github.mjs --dry-run
node scripts/sync-github.mjs
```

同步结果保存在 `github-data.json`，原始 `data.json`、`categories/*.json` 不被修改。
完整同步成功时间只有全部仓库成功才前进；部分失败会在工作流摘要和页面上明确展示。

## 匿名点赞规则

- 同一软件使用稳定的产品 `id`，跨品类共用票数。构建会拒绝不同名称复用同一 ID。
- HttpOnly 签名 Cookie 标识浏览器，有效期一年；没有账户登录。
- D1 以 `(product_id, voter_id)` 唯一约束去重，数据库触发器原子维护计数。
- 写入表达“已点赞/未点赞”的目标状态，重复请求不会重复加票。
- 按点赞数降序，同票按名称排序；仍可选择 Stars 或名称排序。
- 每次加载、点赞成功、窗口重新获得焦点时更新数据；同浏览器其他标签页会收到刷新提示。
  没有持续轮询或实时推送，其他访客停留不动的页面不会自动刷新。
- 同源写入校验；按 IP 的 HMAC 摘要做限流，不存储原始 IP。
  每 IP 每小时最多创建 30 个匿名身份，每分钟最多 30 次点赞写入，过期限流记录会清理。
- 清除 Cookie、换浏览器或换设备仍可能重复投票，因此这是社区人气，不是实名投票。
  限流不能彻底阻止有组织的刷票。

## 验证

```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

浏览器测试启动独立的本地 Pages Functions/D1（8788），仅重置 `.wrangler/test-state`；
不会清理日常开发库或远程数据库。CI 使用相同测试。

许可与数据来源说明见 [`../README.md`](../README.md) 和 [`../LICENSE`](../LICENSE)。
