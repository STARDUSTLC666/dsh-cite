**简体中文** · [English](README.en.md)

# Cite

**把零散 DOI 和 BibTeX 整理成可用的文献库。**

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-light.svg" alt="把零散 DOI 和 BibTeX 整理成可用的文献库。 · 流程示意" width="100%">
</picture>

## 功能

- 导入前查看重复项与缺失字段。
- 主动从 Crossref 补全，核对差异后保留。
- 导出引用文本、BibTeX 或包含来源的完整备份。

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-cite`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-cite
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.1-rc.3` 为准。

## 开始使用

1. 从左侧栏打开“引文库”，准备 DOI 列表或 BibTeX 文件。
2. 先做本地导入预览，检查条目、重复项和字段，再保存选中的文献。
3. 需要联网补全时，选择条目后主动执行 Crossref 补全，核对返回字段。
4. 选择要引用的文献，导出参考文献或 BibTeX，并按需要下载文献库备份。

可以这样说：

> 帮我查询这些 DOI 的题录信息，并指出需要人工核对的字段。

## 开始前要知道

联网补全需要访问 Crossref；引用格式与文献信息仍应在交付前核对。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-cite/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-cite/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-cite/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-cite/blob/master/LICENSE)

<a id="依赖与配置"></a>
