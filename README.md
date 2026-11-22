**简体中文** · [English](README.en.md)

# Cite

**DeepSeek Harness 引文工作台：在「文献引力星图画布」中拖拽编排文献、实时预览引文与关联网络，并支持一键切回经典三栏「列表」视图。**

适配 DeepSeek Harness `>=0.2.2-rc.3`，内置 13 套明亮护眼工作台风格（原生清透 / 米白纸感 / Claude 暖书卷 / 8-Bit 掌机 / 晴空薄荷 / 晴昼琉璃 / 护眼墨水屏 / 工程晒图 / 波普孔版 / 千禧复古 / 宋韵朱砂 / 晴空水晶 / 铅字晨报）与 8 套中英字体搭配（默认幼圆等宽，跨插件同步）及柔和岩板深色模式。

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.zh.md)**

## 界面截图

[![文献引力星图画布展示可拖拽文献节点、SVG 引力连线、悬浮星图控制台与悬浮 Zettelkasten 索引卡](docs/assets/screenshots/library-zh.jpg)](docs/assets/screenshots/library-zh.jpg)

| 导入预览与去重 | DOI 核查 |
| --- | --- |
| [![导入预览标出库内重复和同批重复的 DOI](docs/assets/screenshots/import-zh.jpg)](docs/assets/screenshots/import-zh.jpg) | [![Crossref 返回公开 DOI 的核查结果](docs/assets/screenshots/doi-check-zh.jpg)](docs/assets/screenshots/doi-check-zh.jpg) |

*截图来自 Harness Web `0.2.2-rc.3` 中运行的 `dsh-cite` 文献引力星图工作台。*

## 功能

- **默认「文献引力星图画布」+ 一键切回经典「列表」**：整库文献以无重叠引力星图平铺在点阵星域画布上，自动绘制同作者、同刊物、同期（±2 年）与 Crossref 聚类 SVG 引力连线；任意节点可自由指针拖拽排布、点击点亮 `✦` 邻域并柔化无关节点，顶栏与左上悬浮胶囊均支持 1 键切回经典三栏「列表」视图。
- **悬浮 Zettelkasten 索引卡与原生元数据编辑**：右下角悬浮卡片盒实时预览当前论文的 `GB/T 7714` / `APA` / `IEEE` / `MLA` / `Chicago` 引文，一键完成**「复制引文」「复制 BibTeX」「Crossref 补全」「编辑元数据」**（带版本冲突保护与重复 DOI 校验的原子修改），并支持查看原始来源与安全确认删除。
- **离线导入预览与去重**：导入 DOI 列表或 BibTeX 前，支持一键填入示例题录，离线检查库内重复、同批重复与缺失字段。
- **Crossref DOI 核查与一键送入导入**：批量核查文稿中的 DOI（核查通过后一键送入导入预览），或补全已存文献的空字段并保留本地差异对比。
- **交互式 `? 引导` 聚光灯导览**：顶栏内置 4 步星图专属聚光灯导览（覆盖悬浮控制台、拖拽星图节点、Zettelkasten 卡片盒与风格/导入导出），内置一键复制对话核验指令。
- **13 套工作台风格 + 8 套字体搭配**：跨插件同步至弹层菜单与弹窗，适配 DSH `>=0.2.2-rc.3` 宿主控件、窗口留白与 `prefers-reduced-motion: reduce`。

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-cite`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-cite
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.2-rc.3` 为准。

## 开始使用

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-zh-light.svg" alt="在「文献引力星图」中拖拽编排文献、核查 DOI 与导出引文。 · 流程示意" width="100%">
</picture>

### 典型使用流程：从星图梳理文献到定稿排版

1. **核查初稿或试水示例**：从左侧栏打开「引文库」，默认进入**「文献引力星图」**画布。若手上已有论文初稿，切到「DOI 核查」粘贴文稿校验真伪，核查通过的 DOI 可点**「送入导入预览」**一键带入；首次体验也可在「导入预览」点**「填入示例 DOI / BibTeX」**快速入库。
2. **在引力星图中梳理与筛选**：回到「引文库」星图画布，直接**拖拽任意文献节点**调整空间排布（SVG 引力连线实时追踪同作者、同刊物、同期 ±2 年与 Crossref 聚类）；在左上**悬浮控制台**输入关键词即时高亮星图节点、按「有字段缺失 / 已查询 Crossref」筛选，需要批量勾选操作时可 1 键切到经典三栏**「列表」**视图。
3. **在悬浮索引卡完成 Crossref 补全与元数据修订**：点击任意文献节点点亮 `✦` 邻域，在右下角**悬浮 Zettelkasten 索引卡**中点击**「Crossref 补全」**（只补空字段并保留本地差异）或**「编辑元数据」**直接修订标题、作者、年份、刊物与 DOI；误导入的条目可点击「删除」在弹窗确认移除。
4. **一键定稿排版与来源备份**：在左上控制台切换 `GB/T 7714`、`APA`、`IEEE`、`MLA` 或 `Chicago`，在悬浮索引卡 1 键**「复制引文」**或**「复制 BibTeX」**，或打开「导出备份」批量下载 `.bib`、参考文献文本与含原始输入的完整 `.json` 备份。

随时可点击工作台右上角的 **`? 引导`** 重新打开分步导览，或在对话中直接发给 DSH 助手：

- `帮我核验这篇论文的 DOI 与真实元数据并导入引文库`
- `请读取我的本地引文库（cite_batch list），按 GB/T 7714 格式整理成可直接粘贴到论文末尾的参考文献列表，并提醒字段缺失项。`
- `请读取我的本地引文库（cite_batch list），按 APA 格式输出参考文献列表，并检查年份、卷期和页码是否完整。`

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
