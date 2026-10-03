/**
 * dsh-cite —— 参考文献工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册原有五个面向模型的工具（cite_lookup / cite_format /
 * cite_bibtex / cite_check / cite_health），通过 Crossref API 查询元数据并生成
 * GB/T 7714 / APA / MLA / Chicago 基本引文，并提供本地批量文献工作台。
 *
 * @module dsh-cite
 */

import { resolveConfig, type CiteConfig } from './config.js'
import { buildCiteTools, type CiteToolDefinition } from './tools.js'
import { CitationWorkbench, buildBatchTool } from './citation-workbench.js'

/** cordis 服务注入：apply 里要用 ctx.tools。 */
export const name = 'cite'
export const inject = ['tools']

export interface CitePluginContext {
  tools: { register(definition: CiteToolDefinition): () => void }
  on?(event: string, listener: () => void): () => void
  inject?(services: string[], callback: (host: any) => void): unknown
}

export function apply(ctx: CitePluginContext, config?: CiteConfig | null): void {
  let cfg
  try {
    cfg = resolveConfig(config)
  } catch (error) {
    console.warn('[dsh-cite] ' + (error instanceof Error ? error.message : String(error)))
    cfg = resolveConfig(null)
  }

  const disposers: Array<() => void> = []
  const workbench = new CitationWorkbench(cfg)
  const dispose = () => { workbench.dispose(); for (const fn of disposers.splice(0).reverse()) fn?.() }
  try {
    for (const definition of [...buildCiteTools(cfg), buildBatchTool(workbench)]) disposers.push(ctx.tools.register(definition))
    ctx.inject?.(['connection'], host => { const remove = host.connection?.fetch?.register({ path: workbench.route, methods: ['GET', 'POST'], requestBody: 'buffered', fetch: (request: Request) => workbench.fetch(request) }); if (typeof remove === 'function') disposers.push(remove) })
    ctx.on?.('dispose', dispose)
  } catch (e) { dispose(); throw e }
}

export * from './config.js'
export * from './crossref.js'
export * from './format.js'
export * from './tools.js'
export * from './citation-model.js'
export * from './citation-parser.js'
export * from './citation-store.js'
export * from './citation-workbench.js'
