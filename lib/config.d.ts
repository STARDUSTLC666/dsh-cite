/**
 * dsh-cite 配置解析：Crossref 请求超时与 User-Agent。
 *
 * @module dsh-cite/config
 */
export interface CiteConfig {
    timeoutMs?: number;
    userAgent?: string;
}
export interface ResolvedCiteConfig {
    timeoutMs: number;
    userAgent: string;
}
export declare const CITE_TIMEOUT_ENV = "DSH_CITE_TIMEOUT_MS";
export declare const CITE_USER_AGENT_ENV = "DSH_CITE_USER_AGENT";
export declare function resolveConfig(config: CiteConfig | undefined | null, env?: NodeJS.ProcessEnv): ResolvedCiteConfig;
export declare function optionalString(args: Record<string, unknown>, key: string): string | undefined;
export declare function requiredString(args: Record<string, unknown>, key: string, label: string): string;
export declare function optionalInteger(args: Record<string, unknown>, key: string, label: string, lo: number, hi: number, fallback: number): number;
