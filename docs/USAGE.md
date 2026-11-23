# dsh-cite 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 标识符保真

BibTeX 导入、导出保留 URL 与 DOI；数学比较符不作为任意 HTML 删除。Crossref 的已知 JATS 格式单独处理，避免影响原始标识符。

## 本次改进

可直接查询带成对括号的 DOI。网络或响应读取超时会给出明确错误；取消后不继续等待。文献库离线导入与外部 Crossref 检索分别验收。

## 文献工作台

1. 从原生侧栏打开「引文库」（或打开「设置 → Cite」），默认进入**「文献引力星图」**画布；顶部与左上悬浮控制台均支持 1 键在**「星图 / 列表」**之间切换。
2. 切到「导入预览」，选择 DOI 列表或 BibTeX（每行一条 DOI，或上传 `.bib` 文件，也可点击「填入示例 DOI / BibTeX」）；点击「本地预览」核对缺失字段与重复提示，确认无误后点击「保存所选」。上传不会改写原文件。
3. 在「文献引力星图」画布中，可自由拖拽任意文献节点调整排布（SVG 引力连线实时追踪同作者、同刊物、同期 ±2 年与 Crossref 聚类），左上悬浮控制台支持切换 `GB/T 7714 / APA / IEEE / MLA / Chicago` 格式、即时高亮搜索节点与按「有字段缺失 / 已查询 Crossref」筛选。
4. 点击节点点亮 `✦` 邻域后，在右下角**悬浮 Zettelkasten 索引卡**一键执行「复制引文」「复制 BibTeX」「Crossref 补全」（只补空字段并保留本地差异）或「编辑元数据」（带修订冲突保护与重复 DOI 校验的原子修改），也可查看「原始输入」或安全删除。需要批量勾选补全/删除时，1 键切回经典三栏「列表」视图即可。
5. 「导出备份」页先给出导出前检查：可切换「全部文献」或「仅所选」范围，并列出范围条数、引文格式、缺标题 / 作者 / 年份的条目数，以及「完整备份始终包含全库与原始输入」。确认无误后再下载 BibTeX、参考文献文本或完整备份。

多窗口冲突不会被静默覆盖：提示会说明库已在别处更新、当前输入仍然保留，并提供「重新预览当前输入」这一条恢复路径；冲突期间「保存所选」保持禁用并给出原因。导出前检查里的范围、条数与缺失字段来自当前本地数据，切换范围会立即重新计算。

界面跟随 DSH 的中文 / English 设置，不翻译或复制文献数据。导出支持 GB/T 7714、APA、IEEE、MLA、Chicago 五种基本格式；不同文献类型、学校或期刊的细节要求需另行核对。

每批最多 256 KiB / 100 条，库最多 500 条；本地解析有 5 秒时间限制。文献库保存在 `DSH_HOME/data/dsh-cite/library.json`。并发窗口的修订检查会阻止旧预览覆盖新数据；遇到冲突，保留输入并刷新、重新预览。损坏的库文件会保留，不会自动重置。

BibTeX 解析使用 Citation.js 的本地解析器，支持宏、嵌套括号、机构作者和复合姓氏。工作台采用常用字段模型；未映射的自定义字段仍存在完整备份的原始输入中，不能把导出的 BibTeX 当成逐字往返复制。完整备份目前用于核对和恢复原始资料，尚无一键 JSON 恢复入口。

## 工具

| 工具 | 作用 | 关键参数 |
| :-- | :-- | :-- |
| `cite_lookup` | 查文献元数据（DOI 精确查询 / 题录检索） | `doi` 或 `query` 至少一个；`limit` 1-10 默认 5 |
| `cite_format` | 生成基本格式引文 | `doi` 必填；`style`：gb-t-7714 / apa / ieee / mla / chicago |
| `cite_bibtex` | 生成 BibTeX 条目 | `doi` 必填；`key` 可选 |
| `cite_check` | 从文本提取 DOI 并并发校验是否存在（并发 3，保持输入顺序） | `text` 必填；`maxChecks` 1-50 默认 10 |
| `cite_health` | 自检：探测 Crossref 连通性并报告延迟 | 无 |
| `cite_batch` | 本地文献工作台，与设置页共用文献库 | `action`（或 `operation`）：list / preview / import / enrich / remove / job / cancel / export |

`cite_batch` 的 `preview` 接受 `kind: doi / bibtex`、`text` 和可选 `label`；返回预览编号和零起始行编号。`import` 接受 `preview` 与 `selection` 数组。`enrich` 接受已保存条目的 `ids` 与当前 `revision`，返回 `job` 编号；用 `job` / `cancel` 操作查询或取消。`remove` 支持按单条 `id`、`citekey`（唯一匹配时生效）或批量 `ids` 配合 `expectedRevision` 冲突保护原子删除条目。`export` 的 `kind` 为 bibtex / references / backup，可指定 `style`、`lang`；条目选择为可选 `ids`，完整备份不得附带选择。

## 安装

```bash
dsh plugin --profile web add dsh-cite
```

## 卸载

```bash
dsh plugin --profile web remove dsh-cite
```

卸载后重启 Web 服务。如需彻底清理，可再手动删除自己 profile `cordis.patch.yml` 中覆盖的插件行。

## 示例

示例论文：[Deep learning, Nature (2015)](https://www.nature.com/articles/nature14539)。

```text
用户：给我 10.1038/nature14539 的 GB/T 7714 引用
Agent：
  cite_format { doi: "10.1038/nature14539", style: "gb-t-7714" }
  → LeCun Y, Bengio Y, Hinton G. Deep learning[J]. Nature, 2015, 521(7553): 436-444.

用户：检查这段参考文献的 DOI 是否有效
Agent：
  cite_check { text: "..." }
```

## 配置

```yaml
- id: cite
  name: 'dsh-cite'
  config:
    timeoutMs: 15000      # Crossref 请求超时（毫秒，默认 15000，也可用 DSH_CITE_TIMEOUT_MS）
    # userAgent: ''       # 自定义 User-Agent（建议带上可联系邮箱，也可用 DSH_CITE_USER_AGENT）
    hideWorkbench: false  # 设为 true 可隐藏左侧栏「引文库」入口（仍保留设置页与模型工具）
```

## 说明

- 数据源：Crossref REST API，无需 API key
- 引文为纯文本输出；格式按常见模板生成，正式投稿前请核对目标期刊的细节要求
- 本地导入、去重、格式化和备份不会联网。在线补全把选中的 DOI 发给 Crossref；原有查询、搜索和健康检查工具也会联系 Crossref。不会上传 BibTeX 文件、原始来源或整库。
- 不需要关闭 VPN 或强制使用代理；能否在线查询取决于当前网络能否访问 Crossref。失败不会丢失本地文献，可稍后重试。

本插件及新增依赖 Citation.js、proper-lockfile 均使用 MIT 许可；发布包不包含宿主密钥。

## 开发

```bash
pnpm test       # 构建并执行测试
```

## License

MIT（见 [LICENSE](../LICENSE)）
