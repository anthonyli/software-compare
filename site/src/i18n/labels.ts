// SPDX-License-Identifier: Apache-2.0
import contentEn from "./content-en.json" with { type: "json" };

// Shared content translations are the fallback, without a circular index import.
function contentFallback(text: string): string {
  const dictionary = contentEn as Record<string, string>;
  return Object.prototype.hasOwnProperty.call(dictionary, text) ? dictionary[text] : text;
}

/** Category display names, keyed by slug. */
export const categoryNames: Record<string, { zh: string; en: string }> = {
  "ai-memory": { zh: "AI 记忆助手", en: "AI memory assistants" },
  "word-processors": { zh: "文字处理", en: "Word processors" },
  "spreadsheets": { zh: "电子表格", en: "Spreadsheets" },
  "presentation-tools": { zh: "演示文稿", en: "Presentations" },
  "cad": { zh: "二维 CAD", en: "2D CAD" },
  "texture-materials": { zh: "纹理与材质", en: "Textures & materials" },
  "audio-recorders": { zh: "录音工具", en: "Audio recorders" },
  "transcription-tools": { zh: "语音转写", en: "Speech transcription" },
  "fitness-training": { zh: "健身训练", en: "Fitness training" },
  "cycling-tools": { zh: "骑行训练与分析", en: "Cycling training & analysis" },
  "outdoor-navigation": { zh: "徒步登山与户外导航", en: "Hiking & outdoor navigation" },

  "ai-coding": { zh: "AI 编程工具", en: "AI coding tools" },
  "ai-image-workflows": { zh: "AI 图像工作流", en: "AI image workflows" },
  "animation-3d": { zh: "三维动画与建模", en: "3D animation & modeling" },
  "animation-2d": { zh: "二维动画", en: "2D animation" },
  "compositing": { zh: "节点合成与特效", en: "Node compositing & effects" },
  "database-clients": { zh: "数据库客户端", en: "Database clients" },
  "api-clients": { zh: "API 调试与测试", en: "API debugging & testing" },

  "ai-assistants": { zh: "AI 聊天助手", en: "AI chat assistants" },
  "local-ai": { zh: "本地 AI", en: "Local AI" },
  "image-editors": { zh: "图像编辑与绘画", en: "Image editing & painting" },
  "vector-graphics": { zh: "矢量与界面设计", en: "Vector & interface design" },
  "photo-management": { zh: "摄影与 RAW 处理", en: "Photography & RAW processing" },
  "desktop-publishing": { zh: "桌面排版", en: "Desktop publishing" },
  "note-taking": { zh: "笔记软件", en: "Note-taking" },
  "screenshot-tools": { zh: "截图工具", en: "Screenshot tools" },
  "pdf-tools": { zh: "PDF 工具（阅读/编辑）", en: "PDF tools (read/edit)" },
  launchers: { zh: "启动器/效率启动工具", en: "Launchers" },
  "screen-recorders": { zh: "电脑录屏软件", en: "Screen recorders" },
  "video-editors": { zh: "视频剪辑", en: "Video editors" },
  "audio-editors": { zh: "音频编辑", en: "Audio editors" },
  converters: { zh: "格式转换（音视频/文件转换）", en: "Converters" },
  archivers: { zh: "压缩解压", en: "Archivers" },
  downloaders: { zh: "下载器（多线程/BT）", en: "Downloaders (multi-thread/BT)" },
  "file-sync": { zh: "文件同步/网盘同步", en: "File sync" },
  cleaners: { zh: "电脑缓存/系统清理工具", en: "Cache & system cleaners" },
  "antivirus-security": { zh: "杀毒/安全软件", en: "Antivirus & security" },
  "password-managers": { zh: "密码管理器", en: "Password managers" },
  "vpn-clients": { zh: "VPN 客户端", en: "VPN clients" },
  "code-editors": { zh: "代码编辑器", en: "Code editors" },
  "remote-desktop": { zh: "远程桌面", en: "Remote desktop" },
};

export const groupNames: Record<string, { zh: string; en: string }> = {
  lifestyle: { zh: "运动与户外", en: "Fitness & outdoors" },
  ai: { zh: "AI 工具", en: "AI tools" },
  creative: { zh: "设计与摄影", en: "Design & photography" },
  office: { zh: "办公效率", en: "Productivity" },
  media: { zh: "影音媒体", en: "Media" },
  files: { zh: "文件工具", en: "Files" },
  system: { zh: "系统工具", en: "System" },
  security: { zh: "安全隐私", en: "Security & privacy" },
  dev: { zh: "开发工具", en: "Developer tools" },
  other: { zh: "其他", en: "Other" },
};

/** Feature column labels keyed by "slug:key". */
export const featureColumns: Record<string, { zh: string; en: string }> = {
  "screen-recorders:region_recording": { zh: "区域录制", en: "Region recording" },
  "screen-recorders:webcam_overlay": { zh: "摄像头叠加", en: "Webcam overlay" },
  "screen-recorders:system_audio": { zh: "系统音频", en: "System audio" },
  "screen-recorders:microphone": { zh: "麦克风", en: "Microphone" },
  "screen-recorders:builtin_editor": { zh: "内置编辑", en: "Built-in editor" },
  "screen-recorders:export_gif": { zh: "导出GIF", en: "GIF export" },
  "screen-recorders:rec_4k_60fps": { zh: "4K/60fps", en: "4K/60fps" },
  "screen-recorders:livestream": { zh: "直播", en: "Livestream" },
  "screen-recorders:annotation": { zh: "标注", en: "Annotation" },
  "screen-recorders:cloud_share": { zh: "云分享", en: "Cloud share" },
  "screen-recorders:free_no_watermark": { zh: "无水印免费版", en: "Free, no watermark" },

  "cleaners:browser_cache": { zh: "浏览器缓存清理", en: "Browser cache" },
  "cleaners:system_junk": { zh: "系统垃圾", en: "System junk" },
  "cleaners:registry": { zh: "注册表清理", en: "Registry cleaning" },
  "cleaners:duplicate_files": { zh: "重复文件查找", en: "Duplicate files" },
  "cleaners:uninstall_leftovers": { zh: "卸载残留", en: "Uninstall leftovers" },
  "cleaners:startup_manager": { zh: "启动项管理", en: "Startup manager" },
  "cleaners:privacy": { zh: "隐私清理", en: "Privacy cleanup" },
  "cleaners:scheduled": { zh: "定时清理", en: "Scheduled cleaning" },
  "cleaners:ads_or_bundle": { zh: "广告/捆绑软件提示", en: "Ads / bundling notices" },

  "launchers:app_launch": { zh: "应用启动", en: "App launch" },
  "launchers:file_search": { zh: "文件搜索", en: "File search" },
  "launchers:clipboard_history": { zh: "剪贴板历史", en: "Clipboard history" },
  "launchers:calculator": { zh: "计算器", en: "Calculator" },
  "launchers:plugins": { zh: "插件/扩展", en: "Plugins" },
  "launchers:hotkey": { zh: "自定义热键", en: "Custom hotkeys" },
  "launchers:window_management": { zh: "窗口管理", en: "Window management" },
  "launchers:scripting": { zh: "脚本/自动化", en: "Scripting / automation" },
  "launchers:snippets": { zh: "片段 Snippets", en: "Snippets" },
  "launchers:web_search": { zh: "网页快速搜索", en: "Quick web search" },
  "launchers:ai_features": { zh: "AI 功能", en: "AI features" },

  "video-editors:timeline": { zh: "时间线剪辑", en: "Timeline editing" },
  "video-editors:multi_track": { zh: "多轨道", en: "Multi-track" },
  "video-editors:color_grade": { zh: "调色", en: "Color grading" },
  "video-editors:effects": { zh: "特效/转场", en: "Effects / transitions" },
  "video-editors:keyframes": { zh: "关键帧", en: "Keyframes" },
  "video-editors:titles": { zh: "字幕/标题", en: "Titles / captions" },
  "video-editors:audio_mix": { zh: "音频混合", en: "Audio mixing" },
  "video-editors:chroma_key": { zh: "绿幕抠像", en: "Chroma key" },
  "video-editors:proxy": { zh: "代理剪辑", en: "Proxy editing" },
  "video-editors:export_4k": { zh: "导出 4K", en: "4K export" },
  "video-editors:gpu_accel": { zh: "GPU 加速", en: "GPU acceleration" },

  "archivers:zip": { zh: "ZIP 压缩/解压", en: "ZIP compress/extract" },
  "archivers:rar_extract": { zh: "解压 RAR", en: "Extract RAR" },
  "archivers:rar_create": { zh: "创建 RAR", en: "Create RAR" },
  "archivers:seven_zip": { zh: "7z 压缩/解压", en: "7z compress/extract" },
  "archivers:tar_gz": { zh: "TAR/GZ 等 UNIX 包", en: "TAR/GZ and UNIX archives" },
  "archivers:iso": { zh: "ISO 镜像", en: "ISO images" },
  "archivers:encryption": { zh: "加密压缩", en: "Encrypted archives" },
  "archivers:split": { zh: "分卷压缩", en: "Split archives" },
  "archivers:repair": { zh: "修复损坏压缩包", en: "Repair damaged archives" },
  "archivers:context_menu": { zh: "资源管理器右键菜单", en: "Explorer context menu" },
  "archivers:preview": { zh: "不解压预览", en: "Preview without extracting" },

  "note-taking:markdown": { zh: "Markdown", en: "Markdown" },
  "note-taking:rich_text": { zh: "富文本", en: "Rich text" },
  "note-taking:folders": { zh: "笔记本/文件夹", en: "Notebooks / folders" },
  "note-taking:tags": { zh: "标签", en: "Tags" },
  "note-taking:web_clipper": { zh: "网页剪藏", en: "Web clipper" },
  "note-taking:sync": { zh: "多端同步", en: "Multi-device sync" },
  "note-taking:offline": { zh: "离线使用", en: "Offline use" },
  "note-taking:e2e_encrypt": { zh: "端到端加密", en: "End-to-end encryption" },
  "note-taking:attachments": { zh: "附件", en: "Attachments" },
  "note-taking:plugins": { zh: "插件扩展", en: "Plugins" },
  "note-taking:collaboration": { zh: "协作共享", en: "Collaboration" },
  "note-taking:mobile": { zh: "移动端", en: "Mobile" },

  "pdf-tools:read": { zh: "阅读", en: "Read" },
  "pdf-tools:annotate": { zh: "批注高亮", en: "Annotate / highlight" },
  "pdf-tools:edit_text": { zh: "编辑原文", en: "Edit text" },
  "pdf-tools:ocr": { zh: "OCR", en: "OCR" },
  "pdf-tools:merge_split": { zh: "合并/拆分", en: "Merge / split" },
  "pdf-tools:convert": { zh: "格式转换", en: "Convert" },
  "pdf-tools:form_fill": { zh: "填写表单", en: "Fill forms" },
  "pdf-tools:sign": { zh: "电子签名", en: "E-signature" },
  "pdf-tools:encrypt": { zh: "加密/权限", en: "Encryption / permissions" },
  "pdf-tools:compress": { zh: "压缩 PDF", en: "Compress PDF" },

  "file-sync:realtime": { zh: "实时同步", en: "Real-time sync" },
  "file-sync:selective": { zh: "选择性同步", en: "Selective sync" },
  "file-sync:p2p_lan": { zh: "P2P/局域网直连", en: "P2P / LAN" },
  "file-sync:e2e_encrypt": { zh: "端到端加密", en: "End-to-end encryption" },
  "file-sync:versions": { zh: "文件版本/回收站", en: "Versions / trash" },
  "file-sync:conflict": { zh: "冲突处理", en: "Conflict handling" },
  "file-sync:self_host": { zh: "可自建服务器", en: "Self-hosted server" },
  "file-sync:mobile": { zh: "手机客户端", en: "Mobile apps" },
  "file-sync:share_link": { zh: "分享链接", en: "Share links" },
  "file-sync:block_level": { zh: "块级/增量同步", en: "Block-level / incremental" },
  "file-sync:ignore_rules": { zh: "忽略规则", en: "Ignore rules" },

  "screenshot-tools:region_capture": { zh: "区域截图", en: "Region capture" },
  "screenshot-tools:window_capture": { zh: "窗口截图", en: "Window capture" },
  "screenshot-tools:scrolling_capture": { zh: "滚动长截图", en: "Scrolling capture" },
  "screenshot-tools:delay_timer": { zh: "延时截图", en: "Timed capture" },
  "screenshot-tools:annotation": { zh: "标注编辑", en: "Annotation" },
  "screenshot-tools:ocr": { zh: "OCR 识别", en: "OCR" },
  "screenshot-tools:pin_to_screen": { zh: "贴图钉屏", en: "Pin to screen" },
  "screenshot-tools:color_picker": { zh: "取色器", en: "Color picker" },
  "screenshot-tools:cloud_share": { zh: "上传分享", en: "Upload / share" },
  "screenshot-tools:history": { zh: "历史记录", en: "History" },

  "code-editors:extensions": { zh: "插件/扩展生态", en: "Extensions" },
  "code-editors:lsp": { zh: "LSP/语言服务器", en: "LSP / language server" },
  "code-editors:git_integration": { zh: "Git 集成", en: "Git integration" },
  "code-editors:integrated_terminal": { zh: "集成终端", en: "Integrated terminal" },
  "code-editors:debugger": { zh: "调试器", en: "Debugger" },
  "code-editors:ai_assistant": { zh: "AI 编程助手", en: "AI coding assistant" },
  "code-editors:multi_cursor": { zh: "多光标", en: "Multi-cursor" },
  "code-editors:remote_dev": { zh: "远程开发", en: "Remote development" },
  "code-editors:live_share": { zh: "协作编辑", en: "Live share" },
  "code-editors:customizable": { zh: "高度可定制", en: "Highly customizable" },

  "audio-editors:waveform": { zh: "波形编辑", en: "Waveform editing" },
  "audio-editors:multitrack": { zh: "多轨混音", en: "Multitrack mixing" },
  "audio-editors:plugins": { zh: "效果器/插件", en: "Effects / plugins" },
  "audio-editors:noise_reduce": { zh: "降噪", en: "Noise reduction" },
  "audio-editors:spectral": { zh: "频谱编辑", en: "Spectral editing" },
  "audio-editors:record": { zh: "录音", en: "Recording" },
  "audio-editors:batch": { zh: "批量处理", en: "Batch processing" },
  "audio-editors:midi": { zh: "MIDI/音序", en: "MIDI / sequencing" },
  "audio-editors:podcast": { zh: "播客工具", en: "Podcast tools" },
  "audio-editors:export_formats": { zh: "多格式导出", en: "Multi-format export" },

  "downloaders:http_multi": { zh: "HTTP 多线程下载", en: "HTTP multi-thread" },
  "downloaders:bittorrent": { zh: "BitTorrent/磁力", en: "BitTorrent / magnet" },
  "downloaders:ed2k": { zh: "电驴/eD2k", en: "eD2k" },
  "downloaders:stream_m3u8": { zh: "流媒体/M3U8", en: "Streams / M3U8" },
  "downloaders:video_site": { zh: "视频网站解析下载", en: "Video site download" },
  "downloaders:schedule": { zh: "定时任务", en: "Scheduled tasks" },
  "downloaders:speed_limit": { zh: "限速", en: "Speed limit" },
  "downloaders:rss": { zh: "RSS 订阅下载", en: "RSS downloads" },
  "downloaders:remote_webui": { zh: "远程 Web 界面", en: "Remote web UI" },
  "downloaders:browser_ext": { zh: "浏览器扩展", en: "Browser extension" },

  "converters:video": { zh: "视频转换", en: "Video conversion" },
  "converters:audio": { zh: "音频转换", en: "Audio conversion" },
  "converters:image": { zh: "图片转换", en: "Image conversion" },
  "converters:document": { zh: "文档转换", en: "Document conversion" },
  "converters:batch": { zh: "批量转换", en: "Batch conversion" },
  "converters:hw_accel": { zh: "硬件加速", en: "Hardware acceleration" },
  "converters:extract_audio": { zh: "提取音轨", en: "Extract audio" },
  "converters:compress": { zh: "压缩/改分辨率", en: "Compress / resize" },
  "converters:presets": { zh: "预设档位", en: "Presets" },
  "converters:gui": { zh: "图形界面", en: "Graphical interface" },

  "antivirus-security:realtime_protection": { zh: "实时防护", en: "Real-time protection" },
  "antivirus-security:malware_scan": { zh: "恶意软件扫描", en: "Malware scan" },
  "antivirus-security:ransomware_protection": { zh: "勒索软件防护", en: "Ransomware protection" },
  "antivirus-security:firewall": { zh: "防火墙", en: "Firewall" },
  "antivirus-security:web_protection": { zh: "网页防护", en: "Web protection" },
  "antivirus-security:phishing_protection": { zh: "钓鱼防护", en: "Phishing protection" },
  "antivirus-security:email_scan": { zh: "电子邮件扫描", en: "Email scan" },
  "antivirus-security:heuristic": { zh: "行为/启发式检测", en: "Heuristic / behavior" },
  "antivirus-security:vpn_bundle": { zh: "VPN 捆绑", en: "Bundled VPN" },
  "antivirus-security:password_manager": { zh: "密码管理器捆绑", en: "Bundled password manager" },
  "antivirus-security:game_mode": { zh: "游戏模式", en: "Game mode" },
  "antivirus-security:cross_platform": { zh: "跨平台桌面", en: "Cross-platform desktop" },

  "vpn-clients:split_tunneling": { zh: "分裂隧道", en: "Split tunneling" },
  "vpn-clients:kill_switch": { zh: "Kill Switch", en: "Kill switch" },
  "vpn-clients:multi_hop": { zh: "多跳/双重 VPN", en: "Multi-hop / double VPN" },
  "vpn-clients:wireguard": { zh: "WireGuard 协议", en: "WireGuard" },
  "vpn-clients:openvpn": { zh: "OpenVPN 协议", en: "OpenVPN" },
  "vpn-clients:no_logs": { zh: "无日志政策（官方声明）", en: "No-logs policy (vendor claim)" },
  "vpn-clients:independent_audit": { zh: "独立审计", en: "Independent audit" },
  "vpn-clients:open_source_client": { zh: "客户端开源", en: "Open-source client" },
  "vpn-clients:self_host": { zh: "自建服务器", en: "Self-hosted server" },
  "vpn-clients:obfuscation": { zh: "混淆/伪装", en: "Obfuscation" },
  "vpn-clients:device_limit": { zh: "多设备同时连接", en: "Multi-device connections" },

  "password-managers:browser_extension": { zh: "浏览器扩展", en: "Browser extension" },
  "password-managers:desktop_app": { zh: "桌面应用", en: "Desktop app" },
  "password-managers:mobile_app": { zh: "移动应用", en: "Mobile app" },
  "password-managers:password_generator": { zh: "密码生成", en: "Password generator" },
  "password-managers:autofill": { zh: "自动填充", en: "Autofill" },
  "password-managers:totp": { zh: "内置 TOTP/验证器", en: "Built-in TOTP" },
  "password-managers:passkeys": { zh: "通行密钥 Passkeys", en: "Passkeys" },
  "password-managers:password_sharing": { zh: "密码共享", en: "Password sharing" },
  "password-managers:emergency_access": { zh: "紧急访问", en: "Emergency access" },
  "password-managers:breach_monitoring": { zh: "数据泄露监测", en: "Breach monitoring" },
  "password-managers:self_host": { zh: "自托管/纯本地", en: "Self-hosted / local" },
  "password-managers:e2e_encryption": { zh: "端到端加密", en: "End-to-end encryption" },

  "remote-desktop:unattended_access": { zh: "无人值守访问", en: "Unattended access" },
  "remote-desktop:file_transfer": { zh: "文件传输", en: "File transfer" },
  "remote-desktop:clipboard_sync": { zh: "剪贴板同步", en: "Clipboard sync" },
  "remote-desktop:multi_monitor": { zh: "多显示器", en: "Multi-monitor" },
  "remote-desktop:audio": { zh: "音频传输", en: "Audio" },
  "remote-desktop:e2e_encryption": { zh: "端到端加密", en: "End-to-end encryption" },
  "remote-desktop:self_host": { zh: "自建服务器", en: "Self-hosted server" },
  "remote-desktop:mobile_control": { zh: "移动端控制", en: "Mobile control" },
  "remote-desktop:free_for_commercial": { zh: "免费商用", en: "Free for commercial use" },
  "remote-desktop:session_recording": { zh: "会话录制", en: "Session recording" },
  "remote-desktop:wake_on_lan": { zh: "远程开机/WOL", en: "Wake-on-LAN" },
};

export const pricingModels: Record<string, string> = {
  完全免费: "Free",
  免费增值: "Freemium",
  订阅: "Subscription",
  付费: "Paid",
  未知: "Unknown",
};

export const maintenanceStatuses: Record<string, string> = {
  活跃: "Active",
  未知: "Unknown",
  停更: "Discontinued",
  已归档: "Archived",
  停滞: "Stalled",
  暂停维护: "Paused",
};

export const platforms: Record<string, string> = {
  Windows: "Windows",
  macOS: "macOS",
  Linux: "Linux",
  iOS: "iOS",
  Android: "Android",
  Web: "Web",
  Chrome: "Chrome",
  FreeBSD: "FreeBSD",
  BSD: "BSD",
  "BSD 等": "BSD and others",
  "iOS 等": "iOS and others",
  "多种 Unix": "Various Unix",
  鸿蒙: "HarmonyOS",
  浏览器扩展: "Browser extension",
  自托管服务器: "Self-hosted server",
  云工作负载: "Cloud workloads",
  "Kubernetes 等": "Kubernetes and others",
  其他多种客户端: "Various other clients",
  部分其他: "Some others",
  "Web（连接 Windows/Linux/macOS 等远程机）":
    "Web (connects to Windows/Linux/macOS and other remotes)",
};

export const sourceLabels: Record<string, string> = {
  GitHub: "GitHub",
  SourceForge: "SourceForge",
  "官方源码（git.dec05eba.com）": "Official source (git.dec05eba.com)",
  "官方源码（Forgejo）": "Official source (Forgejo)",
};

export const featureValueShort: Record<string, { zh: string; en: string }> = {
  yes: { zh: "✓", en: "✓" },
  no: { zh: "✗", en: "✗" },
  partial: { zh: "部分", en: "Partial" },
  paid: { zh: "付费档", en: "Paid" },
  unknown: { zh: "—", en: "—" },
  na: { zh: "—", en: "—" },
};

export const featureValueFull: Record<string, { zh: string; en: string }> = {
  yes: { zh: "支持", en: "Yes" },
  no: { zh: "不支持", en: "No" },
  partial: { zh: "部分支持", en: "Partial" },
  paid: { zh: "付费档提供", en: "On paid plans" },
  unknown: { zh: "未知", en: "Unknown" },
  na: { zh: "不适用", en: "N/A" },
};

export function catPair(slug: string, fallbackZh = ""): { zh: string; en: string } {
  return categoryNames[slug] || { zh: fallbackZh || slug, en: fallbackZh || slug };
}

export function groupPair(id: string, fallbackZh = ""): { zh: string; en: string } {
  return groupNames[id] || { zh: fallbackZh || id, en: fallbackZh || id };
}

export function featurePair(slug: string, key: string, fallbackZh = ""): { zh: string; en: string } {
  return featureColumns[`${slug}:${key}`] || { zh: fallbackZh || key, en: contentFallback(fallbackZh || key) };
}

export function pricingEn(zh: string | null | undefined): string {
  if (!zh) return "";
  return pricingModels[zh] || contentFallback(zh);
}

export function maintenanceEn(zh: string | null | undefined): string {
  if (!zh) return "";
  return maintenanceStatuses[zh] || zh;
}

export function platformEn(zh: string): string {
  return platforms[zh] || zh;
}

export function sourceLabelEn(zh: string | null | undefined): string {
  if (!zh) return "";
  return sourceLabels[zh] || zh;
}
