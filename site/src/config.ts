/**
 * 站点名称、域名等集中配置，改一处即可。
 */
export const siteConfig = {
  name: "软件对比",
  tagline: "对照价格、免费限制与功能，选出适合你的工具",
  description:
    "对比常用电脑软件的价格、免费限制、平台和功能差异，覆盖办公、影音、文件、系统、安全和开发工具。数据采集于 2026-11-12。",
  siteUrl: process.env.PUBLIC_SITE_URL || "http://localhost:4321",
  collectedAt: "2026-11-12",
  timezone: "Asia/Shanghai (UTC+8)",
  lang: "zh-CN",
};

/** 首页分组：slug 必须与数据里的品类 id 一致。 */
export const categoryGroups: { id: string; name: string; slugs: string[] }[] = [
  { id: "ai", name: "AI 工具", slugs: ["ai-assistants", "local-ai", "ai-coding", "ai-image-workflows"] },
  { id: "creative", name: "设计与摄影", slugs: ["image-editors", "vector-graphics", "photo-management", "desktop-publishing", "animation-3d", "animation-2d", "compositing"] },
  {
    id: "office",
    name: "办公效率",
    slugs: ["note-taking", "screenshot-tools", "pdf-tools", "launchers"],
  },
  {
    id: "media",
    name: "影音媒体",
    slugs: ["screen-recorders", "video-editors", "audio-editors", "converters"],
  },
  {
    id: "files",
    name: "文件工具",
    slugs: ["archivers", "downloaders", "file-sync"],
  },
  {
    id: "system",
    name: "系统工具",
    slugs: ["cleaners"],
  },
  {
    id: "security",
    name: "安全隐私",
    slugs: ["antivirus-security", "password-managers", "vpn-clients"],
  },
  {
    id: "dev",
    name: "开发工具",
    slugs: ["code-editors", "remote-desktop", "database-clients", "api-clients"],
  },
];

export const featureLabels: Record<string, string> = {
  yes: "✓",
  no: "✗",
  partial: "部分",
  paid: "付费档",
  unknown: "—",
  na: "—",
};

export const featureLabelFull: Record<string, string> = {
  yes: "支持",
  no: "不支持",
  partial: "部分支持",
  paid: "付费档提供",
  unknown: "未知",
  na: "不适用",
};

/** 首页与导航用的品类一字记号，纯展示，不改变数据。 */
export const categoryMonograms: Record<string, string> = {
  "ai-coding": "助",
  "ai-image-workflows": "生",
  "animation-3d": "立",
  "animation-2d": "动",
  "compositing": "合",
  "database-clients": "库",
  "api-clients": "接",

  "ai-assistants": "智", "local-ai": "模", "image-editors": "绘", "vector-graphics": "矢", "photo-management": "摄", "desktop-publishing": "版",
  "note-taking": "记",
  "screenshot-tools": "截",
  "pdf-tools": "档",
  "launchers": "启",
  "screen-recorders": "录",
  "video-editors": "剪",
  "audio-editors": "音",
  "converters": "转",
  "archivers": "压",
  "downloaders": "下",
  "file-sync": "同",
  "cleaners": "清",
  "antivirus-security": "安",
  "password-managers": "密",
  "vpn-clients": "网",
  "code-editors": "码",
  "remote-desktop": "远",
};

/** 首页卡片色块，仅用于展示，不代表产品官方品牌色。 */
export const categoryTints: Record<string, string> = {
  "ai-coding": "#E8F1FF",
  "ai-image-workflows": "#E8F1FF",
  "animation-3d": "#E8F1FF",
  "animation-2d": "#E8F1FF",
  "compositing": "#E8F1FF",
  "database-clients": "#E8F1FF",
  "api-clients": "#E8F1FF",

  "ai-assistants": "#E7EEFF", "local-ai": "#E4F4F2", "image-editors": "#FFE4EA", "vector-graphics": "#F1E9FF", "photo-management": "#FFF0D6", "desktop-publishing": "#E8F1FF",
  "note-taking": "#E8F1FF",
  "screenshot-tools": "#E8F8F0",
  "pdf-tools": "#FFF3C9",
  "launchers": "#F1E9FF",
  "screen-recorders": "#D9F3EA",
  "video-editors": "#FFE4EA",
  "audio-editors": "#E9F0FF",
  "converters": "#FFF0D6",
  "archivers": "#F0E7FF",
  "downloaders": "#E5F4FF",
  "file-sync": "#E7F8EE",
  "cleaners": "#FFE8D8",
  "antivirus-security": "#FDE8EF",
  "password-managers": "#EDE7FF",
  "vpn-clients": "#E4F4F2",
  "code-editors": "#E7EEFF",
  "remote-desktop": "#E8F6FF",
};
