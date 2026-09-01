# dsh-cite

![npm](https://img.shields.io/npm/v/dsh-cite) ![downloads](https://img.shields.io/npm/dm/dsh-cite) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-cite) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-cite?style=social)

> 给一个 DOI，还你规范参考文献——GB/T 7714 / APA / MLA / Chicago / BibTeX。

DeepSeek Harness 参考文献工具插件：通过 Crossref API 查询文献元数据并格式化引用。五个工具（含 `cite_health` 自检）、零运行时依赖、全平台通用。

## 工具

| 工具 | 作用 | 关键参数 |
| :-- | :-- | :-- |
| `cite_lookup` | 查文献元数据（DOI 精确查询 / 题录检索） | `doi` 或 `query` 至少一个；`limit` 1-10 默认 5 |
| `cite_format` | 生成规范引文 | `doi` 必填；`style`：gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | 生成 BibTeX 条目 | `doi` 必填；`key` 可选 |
| `cite_check` | 从文本提取 DOI 并并发校验是否存在（并发 3，保持输入顺序） | `text` 必填；`maxChecks` 1-50 默认 10 |
| `cite_health` | 自检：探测 Crossref 连通性并报告延迟 | 无 |

## 兼容性

在 `@deepseek-ai/dsh@0.1.2-alpha.2` 上验证（2026-08-31）。遵循 cordis 组合包补丁模型（`cordis.patch.yml` + `dsh.bundle.patch`），运行时不 import 任何 `@deepseek-ai/*` 内部模块。

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

```text
用户：给我 10.1038/nature12345 的 GB/T 7714 引用
Agent：
  cite_format { doi: "10.1038/nature12345", style: "gb-t-7714" }
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
- 不采集、不上传任何本地文献数据

## 开发

```bash
pnpm test       # 构建 + 18 个测试
```

MIT
## License

MIT（见 [LICENSE](LICENSE)）
