# 产品 Logo

产品 Logo 显示在桌面分类对比表、移动端分类卡片和产品详情。站点品牌与分类封面独立。未找到可信的图标时只展示产品名的首字，不计为已收录 Logo。

- 用 catalog 产品 ID 作为主键，同一产品跨分类沿用同一图标。
- 优先使用官方应用图标、项目资产或官方品牌资源。多个产品共用网站时，不把网站 favicon 当成独立产品图标。官方项目页面明确引用的专用 favicon 可用；存在版权或品牌限制时按来源规则处理，不推断项目开源许可涵盖商标。
- 把经核对的 HTTPS 来源写入 `site/src/lib/product-logo-sources.json`。对应资源放在 `site/public/product-logos/<id>.webp`，透明背景优先，长边不超过 96 像素，单个文件不超过 24 KiB。展示时仅请求同站文件，不热链厂商网站或另接图标服务。
- 核对 24px 附近是否仍可识别，不拉伸源图。占位不冒充官方图标；可跟踪未核实的项，分批补齐。
- 分类和详情已有可读的产品名称，图标对辅助技术标记为装饰，不重复朗读。首屏详情图使用显式尺寸，列表资源延迟加载。

首批收录 8 个 RSS 阅读器。入口和素材校验见 `site/tests/product-logos.test.mjs` 和 `site/tests/browser/product-logos.spec.ts`。

第二批：Brave、Dia、ego lite、Helium，从各自官网的品牌页、专用产品站或产品应用图标获取。先有产品条目、后补 Logo 是正常流程；回归测试验证已发布的批次和资源完整性，不要求新条目已有官方图标。

图标可使用经官方产品标识复核的公开目录素材。下载地址留在素材表供维护核对；列表和产品页只显示图标，不额外挂来源标签。需要页面署名的素材先跳过或找符合展示要求的版本。

Kaku 与 Itsycal 使用上游仓库的应用图标。乔木目录中的同名图标已比对，最终使用上游原图而非目录副本，仅转换为小体积 WebP。上游许可随静态资产保存在 `site/public/licenses/product-logos/`，不在列表或详情另加提示。

Zed 采用[官方品牌页](https://zed.dev/brand)提供的稳定版应用图标，保持颜色和比例，用于标识该产品，不暗示官方合作或背书。

WezTerm 使用作者维护的[上游应用图标](https://github.com/wezterm/wezterm/blob/b1bc74d31ffb9f3869923e10029a5cf986d28982/assets/icon/terminal.png)，也是[项目打包所用图标](https://github.com/wezterm/wezterm/discussions/2396)。仅等比例转为 WebP，用于软件名称旁的识别图标，不暗示背书。上游 MIT 版权许可随对应静态资产分发。
