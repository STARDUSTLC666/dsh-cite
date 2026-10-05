# dsh-cite 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 本次改进

可直接查询带成对括号的 DOI。网络或响应读取超时会给出明确错误；取消后不继续等待。文献库离线导入与外部 Crossref 检索分别验收。

## 文献工作台

1. 打开「设置 → Cite」，选择 DOI 列表或 BibTeX。DOI 每行一条，也可上传 `.bib` 文件。
2. 点击「本地预览」，核对缺失字段与重复提示，选择要保存的条目。精确 DOI 重复不能再次导入；无 DOI 的可能重复项默认不选，可人工确认后选择。
3. 点击「保存所选」。输入在关闭设置后仍保留；刷新整个浏览器前应保存。上传不会改写原文件。
4. 需要元数据时，选择库中条目，点击「从 Crossref 在线补全所选项」。只补空字段；已有内容不覆盖，差异显示在「元数据与来源」中。失败项可重新选择后重试，取消本次任务不会写入该任务的补全结果。
5. 切换基本引文格式，或在条目详情中预览单条引文。BibTeX / 参考文献文本下载范围为所选项，未选择时下载全库；完整备份始终包括全库及原始来源。

界面跟随 DSH 的中文 / English 设置，不翻译或复制文献数据。导出沿用四种基本格式；不同文献类型、学校或期刊的细节要求需另行核对。

每批最多 256 KiB / 100 条，库最多 500 条；本地解析有 5 秒时间限制。文献库保存在 `DSH_HOME/data/dsh-cite/library.json`。并发窗口的修订检查会阻止旧预览覆盖新数据；遇到冲突，保留输入并刷新、重新预览。损坏的库文件会保留，不会自动重置。

BibTeX 解析使用 Citation.js 的本地解析器，支持宏、嵌套括号、机构作者和复合姓氏。工作台采用常用字段模型；未映射的自定义字段仍存在完整备份的原始输入中，不能把导出的 BibTeX 当成逐字往返复制。完整备份目前用于核对和恢复原始资料，尚无一键 JSON 恢复入口。

## 工具

| 工具 | 作用 | 关键参数 |
| :-- | :-- | :-- |
| `cite_lookup` | 查文献元数据（DOI 精确查询 / 题录检索） | `doi` 或 `query` 至少一个；`limit` 1-10 默认 5 |
| `cite_format` | 生成基本格式引文 | `doi` 必填；`style`：gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | 生成 BibTeX 条目 | `doi` 必填；`key` 可选 |
| `cite_check` | 从文本提取 DOI 并并发校验是否存在（并发 3，保持输入顺序） | `text` 必填；`maxChecks` 1-50 默认 10 |
| `cite_health` | 自检：探测 Crossref 连通性并报告延迟 | 无 |
| `cite_batch` | 本地文献工作台，与设置页共用文献库 | `action`：list / preview / import / enrich / job / cancel / export |

`cite_batch` 的 `preview` 接受 `kind: doi / bibtex`、`text` 和可选 `label`；返回预览编号和零起始行编号。`import` 接受 `preview` 与 `selection` 数组。`enrich` 接受已保存条目的 `ids` 与当前 `revision`，返回 `job` 编号；用 `job` / `cancel` 操作查询或取消。`export` 的 `kind` 为 bibtex / references / backup，可指定 `style`、`lang`；条目选择为可选 `ids`，完整备份不得附带选择。

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
    timeoutMs: 15000   # Crossref 请求超时（也可用 DSH_CITE_TIMEOUT_MS）
    # userAgent: ...   # 自定义 User-Agent（也可用 DSH_CITE_USER_AGENT）
    userAgent: ''      # 自定义 UA（建议带上可联系邮箱）
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
