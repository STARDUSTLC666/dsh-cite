/**
 * 五个面向模型的参考文献工具：
 * cite_lookup / cite_format / cite_bibtex / cite_check / cite_health。
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
export declare const MAX_DOI_CHECKS = 50;
export declare function checkDois(text: string, cfg: ResolvedCiteConfig, limit: number, fetchImpl?: FetchLike, signal?: AbortSignal): Promise<{
    count: number;
    results: ({
        doi: string;
        ok: boolean;
        title: string;
        url: string;
        error?: undefined;
    } | {
        doi: string;
        ok: boolean;
        title: string;
        url: string;
        error: string;
    })[];
}>;
export declare function buildCiteTools(cfg: ResolvedCiteConfig, fetchImpl?: FetchLike): CiteToolDefinition[];
