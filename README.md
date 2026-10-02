# dsh-cite

[English](README.en.md)

查询 DOI 和文献元数据，生成参考文献与 BibTeX。

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://img.shields.io/npm/dm/dsh-cite)](https://www.npmjs.com/package/dsh-cite)

## 功能

- 按 DOI 精确查询，或检索文献题录。
- 格式化为 GB/T 7714、APA、MLA 或 Chicago。
- 生成 BibTeX，并检查文本中的 DOI。

## 安装

桌面版可在「插件」面板按包名 `dsh-cite` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-cite
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

安装后可说：“把这些 DOI 整理成 APA 参考文献，并生成 BibTeX。”

## 依赖与配置

通过 Crossref 查询元数据，需要网络连接；不需要额外账号密钥。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-cite/issues)

## License

[MIT](LICENSE)
