# AI 对比表修正与目录补全（2026-11-14 北京时间）

## 用户纠正与实施范围

用户所指“第二张表格列表”是分类页的功能对照表，不是顶部新增的三栏“怎么比较”文案。保留已确认的三个 AI 分类及原有工具，去掉占屏三栏说明，直接在表格和移动卡片呈现条件、费用、用途与数据边界。不是模型质量排名，也没有安装运行、性能测试、上传用户数据或生成视频。

参考 https://ai-bot.cn/ 的当前聊天、编程、图像分类发现候选；目录含广告/动态排序/旧名称，不能作为功能、许可和价格的最终证据。不新增用户先前删除的 AI 分类，不复制整个目录或以收录数量代替核实。

## 新增覆盖

- 聊天：DeepSeek、豆包、千问、Kimi、腾讯元宝、Perplexity、Duck.ai。保留 ChatGPT、Claude、Gemini 与本地工具。共 13 项。
- 编程：Cursor、GitHub Copilot、Claude Code、Qoder CN（原通义灵码）、TRAE。共 8 项。
- 图像：Midjourney、Adobe Firefly、Recraft、即梦 AI。保留 ComfyUI 和 InvokeAI。共 6 项。

每项官方来源列在对应 `categories/*.json` 的 `sources`，由产品详情页展示。未确认的能力使用 `unknown`，不写成不支持；有套餐、插件、版本条件时使用 `partial` 并说明。聊天应用不因厂商发布开源权重就标为开源。当前日期仅表示这次资料核实，不代表实测或未来永久有效。

## 重要证据与边界

- Qoder CN：阿里官方产品/计费文档已使用新名称；不可沿用目录对通义灵码的“全部免费”旧描述。资料入口 https://help.aliyun.com/zh/lingma/introduction-of-lingma 。
- 腾讯元宝官网是动态页，能力参考腾讯开发者发布的官方 App Store 说明；精确额度和训练政策未核实，不作肯定承诺。
- Recraft：https://www.recraft.ai/pricing 明确区分免费公开作品（不授予商用）与付费期间作品（私密及商业权利），API Units 与订阅分开。
- Midjourney：https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans 明确 Stealth 仅 Pro/Mega；企业年营收门槛与套餐相关。未以 Relax 模式概括任意任务无限。
- 即梦：https://jimeng.jianying.com/ 确认智能画布、局部重绘/扩图及积分制；首期优惠与续费不同，不把促销价当固定价格。
- Adobe Firefly：https://www.adobe.com/products/firefly.html 列出图片编辑/扩图和合作模型；不同模型与生成额度需分别核对。

## 验证要求

单元测试检查唯一 ID、完整功能键、官方来源、英译以及原有产品不丢失；浏览器覆盖桌面/移动布局、展开/收起限制、实际新增行数及旧地址重定向。生产仍经现有 PR 检查和 main 自动部署。没有为了核实功能开通付费方案、登录支付或消耗 Credits。
