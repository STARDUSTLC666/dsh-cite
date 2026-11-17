/**
 * dsh-cite —— 参考文献工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册原有五个面向模型的工具（cite_lookup / cite_format /
 * cite_bibtex / cite_check / cite_health），通过 Crossref API 查询元数据并生成
 * GB/T 7714 / APA / MLA / Chicago 基本引文，并提供本地批量文献工作台。
 *
 * @module dsh-cite
 */
import { type CiteConfig } from './config.js';
import { type CiteToolDefinition } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.tools。 */
export declare const name = "cite";
export declare const inject: string[];
export interface CitePluginContext {
    tools: {
        register(definition: CiteToolDefinition): () => void;
    };
    on?(event: string, listener: () => void): () => void;
    inject?(services: string[], callback: (host: any) => void): unknown;
}
export declare function apply(ctx: CitePluginContext, config?: CiteConfig | null): void;
export * from './config.js';
export * from './crossref.js';
export * from './format.js';
export * from './tools.js';
export * from './citation-model.js';
export * from './citation-parser.js';
export * from './citation-store.js';
export * from './citation-workbench.js';
