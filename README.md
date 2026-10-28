# dsh-cite

[English](README.en.md)

![dsh-cite 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/assets/cover-whale-girl.png)

把 DOI 列表或 BibTeX 整理成可核对的本地文献库。支持导入预览、去重、Crossref 补全、引文与 BibTeX 导出，并保留原始来源用于核查。

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-cite/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-cite/pulls)。

从 DSH 原生侧栏打开工作台；配置与操作边界见[工作台说明](docs/WORKBENCH.md)。

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

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
