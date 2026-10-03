# dsh-cite

[English](README.en.md)

把 DOI 列表或 BibTeX 整理成可核对的本地文献库，再导出参考文献与 BibTeX。

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://img.shields.io/npm/dm/dsh-cite)](https://www.npmjs.com/package/dsh-cite)

## 功能

- 批量粘贴 DOI 或上传 `.bib`，本地预览后选择保存；提示精确重复、可能重复和缺失字段。
- 显式从 Crossref 补全作者、年份等空字段；保留已有内容并显示差异，支持部分失败重试。
- 切换 GB/T 7714、APA、MLA 或 Chicago 基本引文格式，下载 BibTeX、参考文献文本及含原始来源的完整备份。
- 原有 DOI 查询、题录搜索和 DOI 检查工具继续可用。

## 安装

桌面版可在「插件」面板按包名 `dsh-cite` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-cite
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

打开「设置 → Cite」，粘贴 DOI 或上传 `.bib`，点击「本地预览」，核对后「保存所选」。需要联网查询时再选择文献并点击「从 Crossref 在线补全所选项」。界面跟随 DSH 的中文 / English 设置，文献内容保持原文。

也可对 Agent 说：“先本地预览这些 DOI，把我选中的条目保存到文献库，再导出 APA 参考文献和 BibTeX。”

## 依赖与配置

本地导入、去重、文献库和格式切换不需要网络。在线补全及原有查询工具通过 Crossref，需要网络连接，不需要额外账号密钥。每批最多 256 KiB / 100 条，文献库最多 500 条。

引文采用原插件的基本模板；正式提交前核对学校或期刊要求。BibTeX 导出只包含已映射字段，完整备份保留未映射字段所在的原始输入。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-cite/issues)

## License

[MIT](LICENSE)
