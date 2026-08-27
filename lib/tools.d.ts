/**
 * 四个面向模型的参考文献工具：
 * cite_lookup / cite_format / cite_bibtex / cite_check。
 *
 * @module dsh-cite/tools
 */
import { type ResolvedCiteConfig } from './config.js';
import { type FetchLike } from './crossref.js';
export interface ContentBlock {
    type: 'text';
    text: string;
}
export interface CiteToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, unknown>;
        required?: string[];
    };
    output: {
        schema: Record<string, unknown>;
        render(args: unknown, value: unknown): ContentBlock[];
    };
    execute(args: unknown, exec: unknown): Promise<unknown>;
    timeoutMs?: number;
}
export declare function buildCiteTools(cfg: ResolvedCiteConfig, fetchImpl?: FetchLike): CiteToolDefinition[];
