/**
 * Crossref REST API 适配：按 DOI 查询 / 题录检索，统一归一化为 Work。
 *
 * @module dsh-cite/crossref
 */
import { type ResolvedCiteConfig } from './config.js';
export interface CiteAuthor {
    given: string;
    family: string;
    name: string;
}
export interface Work {
    doi: string;
    type: string;
    title: string;
    authors: CiteAuthor[];
    containerTitle: string;
    publisher: string;
    year: number;
    language: string;
    volume: string;
    issue: string;
    page: string;
    url: string;
    isbn: string;
}
export type FetchLike = (url: string, init?: {
    headers?: Record<string, string>;
    signal?: AbortSignal;
}) => Promise<Response>;
export declare function assertDoi(value: string): string;
/** 按 DOI 查询 Crossref 并归一化。 */
export declare function lookupDoi(doi: string, cfg: ResolvedCiteConfig, fetchImpl?: FetchLike, signal?: AbortSignal): Promise<Work>;
/** 按题录文本检索 Crossref，返回归一化结果。 */
export declare function searchWorks(query: string, limit: number, cfg: ResolvedCiteConfig, fetchImpl?: FetchLike, signal?: AbortSignal): Promise<Work[]>;
/** 从任意文本里提取 DOI。 */
export declare function extractDois(text: string): string[];
