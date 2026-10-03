/**
 * dsh-cite —— 参考文献工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册原有五个面向模型的工具（cite_lookup / cite_format /
 * cite_bibtex / cite_check / cite_health），通过 Crossref API 查询元数据并生成
 * GB/T 7714 / APA / MLA / Chicago 基本引文，并提供本地批量文献工作台。
 *
 * @module dsh-cite
 */
import { resolveConfig } from './config.js';
import { buildCiteTools } from './tools.js';
import { CitationWorkbench, buildBatchTool } from './citation-workbench.js';
/** cordis 服务注入：apply 里要用 ctx.tools。 */
export const name = 'cite';
export const inject = ['tools'];
export function apply(ctx, config) {
    let cfg;
    try {
        cfg = resolveConfig(config);
    }
    catch (error) {
        console.warn('[dsh-cite] ' + (error instanceof Error ? error.message : String(error)));
        cfg = resolveConfig(null);
    }
    const disposers = [];
    const workbench = new CitationWorkbench(cfg);
    const dispose = () => { workbench.dispose(); for (const fn of disposers.splice(0).reverse())
        fn?.(); };
    try {
        for (const definition of [...buildCiteTools(cfg), buildBatchTool(workbench)])
            disposers.push(ctx.tools.register(definition));
        ctx.inject?.(['connection'], host => { const remove = host.connection?.fetch?.register({ path: workbench.route, methods: ['GET', 'POST'], requestBody: 'buffered', fetch: (request) => workbench.fetch(request) }); if (typeof remove === 'function')
            disposers.push(remove); });
        ctx.on?.('dispose', dispose);
    }
    catch (e) {
        dispose();
        throw e;
    }
}
export * from './config.js';
export * from './crossref.js';
export * from './format.js';
export * from './tools.js';
export * from './citation-model.js';
export * from './citation-parser.js';
export * from './citation-store.js';
export * from './citation-workbench.js';
