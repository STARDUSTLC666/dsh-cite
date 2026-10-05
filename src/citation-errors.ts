/** English UI messages; bibliographic content and original source text stay unchanged. */
export function englishCitationError(raw: string): string {
  if (/^Crossref.*超时/.test(raw)) return 'Crossref timed out. Retry later; your local entries were preserved.'
  if (/^Crossref 请求失败：/.test(raw)) return raw.replace(/^Crossref 请求失败：/, 'Crossref request failed: ')
  if (/^DOI 在 Crossref 中不存在：/.test(raw)) return raw.replace(/^DOI 在 Crossref 中不存在：/, 'DOI not found in Crossref: ')
  if (/^Crossref 返回 HTTP/.test(raw)) return 'Crossref returned HTTP ' + (/HTTP (\d+)/.exec(raw)?.[1] || 'error') + '. Check network access or retry later.'
  if (/DOI 格式不正确/.test(raw)) return 'Invalid DOI. Use a DOI such as 10.1038/nature12345, or its https://doi.org/ URL.'
  if (/没有 DOI/.test(raw)) return 'This entry has no DOI and cannot be enriched through Crossref.'
  if (/DOI 不匹配/.test(raw)) return 'Crossref returned a different DOI. The local entry was preserved.'
  if (/已取消|解析已取消/.test(raw)) return 'Cancelled. This job did not write its enrichment into the library.'
  if (/另一窗口更新|已更新|DOI 已存在/.test(raw)) return 'The library changed elsewhere. Your input is retained. Refresh and preview again before saving.'
  if (/预览已过期/.test(raw)) return 'The preview expired or DSH restarted. Your input is retained; preview it again.'
  if (/文献库记录损坏|文献库文件无效/.test(raw)) return 'The library file is invalid. It has been preserved. Back it up before investigating.'
  if (/最多保存 500|超过 8|文献库.*容量限制/.test(raw)) return 'The library capacity has been reached. Back it up before importing more; this operation was not saved.'
  if (/超过 256|超过 100|1–100|单批不能超过|请求超过容量限制/.test(raw)) return 'Import up to 256 KiB and 100 entries at a time. Split the input and retry; no partial batch was saved.'
  if (/选择包含错误或精确重复|重复编号|选择中不能|有效预览/.test(raw)) return 'Select valid entries once each. Exact DOI duplicates cannot be imported.'
  if (/请选择.*文献|至少选择/.test(raw)) return 'Select 1–100 entries before continuing.'
  if (/解析失败|没有找到可导入|解析未完成/.test(raw)) return 'The input could not be parsed. Check BibTeX braces and commas, or use one DOI per line. Your original input is retained.'
  if (/解析超过/.test(raw)) return 'Local parsing took more than five seconds. Split the input and retry.'
  if (/正在解析|已有补全/.test(raw)) return 'A job is already running. Wait for it or cancel it before continuing.'
  if (/不存在或 DSH|所选文献已不存在|不存在的文献/.test(raw)) return 'The selection or job is no longer available. Saved entries are retained; refresh the library.'
  if (/输入类型/.test(raw)) return 'Input type must be DOI or BibTeX.'
  if (/请先粘贴|请提供 DOI/.test(raw)) return 'Paste DOI / BibTeX input, or choose a .bib file first.'
  if (/完整备份/.test(raw)) return 'A full backup includes every entry and original source, independent of selection.'
  if (/文献库为空/.test(raw)) return 'The library is empty. Import entries before exporting references.'
  if (!/[\u3400-\u9fff]/.test(raw)) return raw
  return 'The operation could not be completed. Check the input or refresh and retry. Saved entries and original sources are preserved.'
}
