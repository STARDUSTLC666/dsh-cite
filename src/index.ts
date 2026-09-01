/**
 * dsh-cite —— 参考文献工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册五个面向模型的工具（cite_lookup / cite_format /
 * cite_bibtex / cite_check / cite_health），通过 Crossref API 查询元数据并生成
 * GB/T 7714 / APA / MLA / Chicago 引文。零运行时依赖。
 *
 * @module dsh-cite
 */

import { resolveConfig, type CiteConfig } from './config.js'
import { buildCiteTools, type CiteToolDefinition } from './tools.js'

/** cordis 服务注入：apply 里要用 ctx.tools。 */
export const name = 'cite'
export const inject = ['tools']

export interface CitePluginContext {
  tools: { register(definition: CiteToolDefinition, options?: { prepend?: boolean }): () => void }
  on?(event: string, listener: () => void): () => void
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
  for (const definition of buildCiteTools(cfg)) {
    disposers.push(ctx.tools.register(definition, { prepend: true }))
  }
  if (typeof ctx.on === 'function') {
    ctx.on('dispose', () => {
      for (const dispose of disposers) dispose()
    })
  }
}

export * from './config.js'
export * from './crossref.js'
export * from './format.js'
export * from './tools.js'
