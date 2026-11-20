# Sumatra PDF 表单版本边界核实

核实日期：2026-11-19。关联 #644。

- https://www.sumatrapdfreader.org/docs/Fill-PDF-forms 明确标注 Available in pre-release 3.7，支持填写已有文本、复选/单选和列表字段并保存 PDF。只读字段不可改；保存后表单仍可编辑。
- https://www.sumatrapdfreader.org/download-free-pdf-viewer 当前稳定下载为 Windows 3.6.1，预发布另有入口。

因此 form_fill 从 unknown 改为 partial，并以专属中英文注释限定 Windows 3.7 预发布。不推断 3.6.1 或 Web 支持、不声称可自动识别扫描表单；保留 release 元数据及其他功能不变。本次不更新其他可能变化的功能，需分别核实。

没有安装/运行 Sumatra、填写真实表单或访问生产；测试只验证 Compare 数据与页面显示，不代表目标软件实测。
