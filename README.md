**简体中文** · [English](README.en.md)

# Cite

> **在「文献引力星图」中拖拽编排文献、核查 DOI 并一键导出标准引文。**

DeepSeek Harness（`>=0.2.2-rc.3`）学术引文工作台：融合空间星图画布、悬浮 Zettelkasten 索引卡与经典三栏列表（1 键切换），支持 13 套明亮风格 × 8 套双层字体。

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

**[核心能力](#核心能力) · [界面截图](#界面截图) · [安装](#安装) · [快速上手](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)**

## 界面截图

[![文献引力星图画布展示可拖拽文献节点、SVG 引力连线、悬浮星图控制台与悬浮 Zettelkasten 索引卡](docs/assets/screenshots/library-zh.jpg)](docs/assets/screenshots/library-zh.jpg)

| 导入预览与去重 | DOI 核查 |
| --- | --- |
| [![导入预览标出库内重复和同批重复的 DOI](docs/assets/screenshots/import-zh.jpg)](docs/assets/screenshots/import-zh.jpg) | [![Crossref 返回公开 DOI 的核查结果](docs/assets/screenshots/doi-check-zh.jpg)](docs/assets/screenshots/doi-check-zh.jpg) |

*截图来自 Harness Web `0.2.2-rc.3` 中运行的 `dsh-cite` 文献引力星图工作台。*

## 核心能力

| 模块 | 核心特性 |
| :--- | :--- |
| **文献引力星图画布** | 无重叠点阵星域平铺文献，实时绘制同作者 / 同刊物 / 同期（±2 年）/ Crossref 聚类 SVG 连线；自由拖拽节点并点击点亮 `✦` 邻域，1 键切回经典三栏「列表」 |
| **悬浮 Zettelkasten 索引卡** | 实时预览 `GB/T 7714` / `APA` / `IEEE` / `MLA` / `Chicago` 引文，1 键复制引文与 BibTeX、Crossref 补全或原子级编辑元数据（带冲突与重复 DOI 保护） |
| **离线导入预览与去重** | 导入 DOI / BibTeX 前先离线检测库内重复、同批重复与缺失字段，支持一键填入示例题录体验 |
| **Crossref DOI 核查联动** | 批量核查论文初稿中的 DOI 真伪，通过后一键送入导入预览；补全空字段时保留本地差异对比与原始来源备份 |
| **导览与跨插件外观** | 顶栏内置 4 步 `? 引导` 聚光灯导览，支持 13 套明亮风格与 8 套双层字体（默认跟随风格专属字），适配减少动态效果偏好 |

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-cite`，或使用命令行：

```bash
dsh plugin --profile desktop add dsh-cite
```

网页版将 `desktop` 改为 `web`，安装后重启 DSH。宿主要求：`>=0.2.2-rc.3`。

## 开始使用

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-light.svg" alt="在「文献引力星图」中拖拽编排文献、核查 DOI 与导出引文。 · 流程示意" width="100%">
</picture>

1. **核查初稿或试水示例**：打开左侧栏「引文库」；在「DOI 核查」粘贴文稿校验真伪并一键送入导入预览，或在「导入预览」填入示例题录快速体验。
2. **星图梳理与筛选**：在星图画布拖拽文献节点排布关系，用左上悬浮控制台检索高亮或按字段完整度筛选；批量操作时可 1 键切回「列表」视图。
3. **补全与修订元数据**：点选节点点亮 `✦` 邻域，在右下 Zettelkasten 索引卡执行「Crossref 补全」「编辑元数据」或安全确认删除。
4. **定稿导出与备份**：切换 5 种引文格式一键复制，或在「导出备份」批量下载 `.bib`、参考文献文本及含原始来源的 `.json` 备份。

### 常用对话示例

- **核查并入库**：`帮我核验这篇论文的 DOI 与真实元数据并导入引文库`
- **输出国标参考文献**：`读取本地引文库（cite_batch list），按 GB/T 7714 格式整理参考文献列表，并提醒字段缺失项。`
- **输出 APA 并体检**：`读取本地引文库（cite_batch list），按 APA 格式输出参考文献，并检查年份、卷期和页码是否完整。`

## 开始前要知道

- 联网核查与补全需访问 Crossref；参考文献格式与题录信息请在正式交付前复核。
- 详细配置、工具清单与排错见 [完整说明](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；Suite 管理的组件随整包更新。

## 文档与反馈

- [完整使用、配置与边界](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md) · [更新记录](https://github.com/STARDUSTLC666/dsh-cite/blob/master/CHANGELOG.md) · [验证历史](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/VALIDATION.md)
- 欢迎 Star、提交 [Issues](https://github.com/STARDUSTLC666/dsh-cite/issues) 与 [PR](https://github.com/STARDUSTLC666/dsh-cite/pulls)（反馈请附版本与复现步骤，并移除凭据）。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-cite/blob/master/LICENSE)

<a id="依赖与配置"></a>
