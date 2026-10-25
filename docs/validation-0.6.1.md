# 0.6.1 验证记录

日期：2026-10-26。官方 Windows 宿主：DSH 0.2.1-rc.3。

## 行为变化

文献正文与标识符分开规范化：保留数学比较符、SICI DOI 和 URL 中的特殊字符。只在明确的元数据入口处理已知格式标签，BibTeX 导出可再次导入。

## 验证与限制

- Windows 本地：47 项，47 通过、0 跳过；没有把跳过计为通过。
- 官方 RC.3 Web 实际完成导入预览、保存、文献库下载 BibTeX、重新上传与 DOI 去重；桌面宽度和 390px 窄屏截图检查通过，无页面异常。未调用真实 Crossref 补全服务。
- GitHub 的跨平台 CI 和 npm 发布完整性以该版本工作流及 registry 为准；本记录不把本地测试等同于已发布。

## English

Citation text and identifiers are normalized separately. Math comparisons, legacy SICI DOIs and URL punctuation survive import/export; known formatting tags are handled only by metadata adapters.

Runtime/account limits are listed above. Synthetic peers and model adapters do not establish live account delivery or model quality.
