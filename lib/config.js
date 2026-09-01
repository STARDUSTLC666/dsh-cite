/**
 * dsh-cite 配置解析：Crossref 请求超时与 User-Agent。
 *
 * @module dsh-cite/config
 */
const DEFAULT_TIMEOUT_MS = 15000;
export const DEFAULT_USER_AGENT = 'dsh-cite/0.3.1 (DeepSeek Harness citation plugin; mailto:STARDUSTLC666@users.noreply.github.com)';
export const CITE_TIMEOUT_ENV = 'DSH_CITE_TIMEOUT_MS';
export const CITE_USER_AGENT_ENV = 'DSH_CITE_USER_AGENT';
export function resolveConfig(config, env = process.env) {
    const cfg = config ?? {};
    let timeoutMs = DEFAULT_TIMEOUT_MS;
    if (cfg.timeoutMs !== undefined) {
        if (typeof cfg.timeoutMs !== 'number' || !Number.isFinite(cfg.timeoutMs) || cfg.timeoutMs <= 0) {
            throw new Error('timeoutMs 必须是大于 0 的数字（毫秒），例如 15000。');
        }
        timeoutMs = Math.min(120000, Math.max(2000, Math.round(cfg.timeoutMs)));
    }
    else if (env[CITE_TIMEOUT_ENV]?.trim()) {
        const parsed = Number(env[CITE_TIMEOUT_ENV].trim());
        if (!Number.isFinite(parsed) || parsed <= 0)
            throw new Error(CITE_TIMEOUT_ENV + ' 必须是大于 0 的数字（毫秒）。');
        timeoutMs = Math.min(120000, Math.max(2000, Math.round(parsed)));
    }
    const userAgent = typeof cfg.userAgent === 'string' && cfg.userAgent.trim() !== '' ? cfg.userAgent.trim() : (env[CITE_USER_AGENT_ENV]?.trim() || DEFAULT_USER_AGENT);
    return { timeoutMs, userAgent };
}
export function optionalString(args, key) {
    const value = args[key];
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}
export function requiredString(args, key, label) {
    const value = optionalString(args, key);
    if (value === undefined)
        throw new Error(label + '（参数 ' + key + '）为必填，请提供非空字符串。');
    return value;
}
export function optionalInteger(args, key, label, lo, hi, fallback) {
    const value = args[key];
    if (value === undefined || value === null)
        return fallback;
    if (typeof value !== 'number' || !Number.isFinite(value))
        throw new Error(label + '（参数 ' + key + '）必须是数字。');
    const rounded = Math.round(value);
    if (rounded < lo || rounded > hi)
        throw new Error(label + '（参数 ' + key + '）必须在 ' + lo + '-' + hi + ' 之间。');
    return rounded;
}
