import { type FetchLike, type Work } from './crossref.js';
import { CitationStore } from './citation-store.js';
import { type ImportRow, type FieldConflict } from './citation-model.js';
import { type ResolvedCiteConfig } from './config.js';
import { type CiteToolDefinition } from './tools.js';
export interface EnrichmentJob {
    id: string;
    state: 'running' | 'done' | 'failed' | 'cancelled';
    total: number;
    completed: number;
    saved: number;
    message?: string;
    messageEn?: string;
    conflict?: boolean;
    results: Array<{
        id: string;
        doi: string;
        ok: boolean;
        filled?: string[];
        conflicts?: FieldConflict[];
        error?: string;
        errorEn?: string;
    }>;
}
export declare class CitationWorkbench {
    readonly cfg: ResolvedCiteConfig;
    readonly fetchImpl: FetchLike;
    readonly route = "/api/dsh-cite/library";
    readonly store: CitationStore;
    private previews;
    private jobs;
    private lifetime;
    private parsing;
    constructor(cfg: ResolvedCiteConfig, root?: string, fetchImpl?: FetchLike);
    private live;
    list(): Promise<{
        jobs: EnrichmentJob[];
        revision: number;
        entries: {
            warnings: string[];
            id: string;
            work: Work;
            bibKey: string;
            sourceIds: string[];
            createdAt: string;
            updatedAt: string;
            crossref?: {
                doi: string;
                fetchedAt: string;
                filled: string[];
                conflicts: FieldConflict[];
            };
        }[];
        sources: {
            id: string;
            createdAt: string;
            kind: "doi" | "bibtex";
            label: string;
        }[];
    }>;
    preview(raw: unknown, signal?: AbortSignal): Promise<{
        id: string;
        revision: number;
        label: string;
        rows: ImportRow[];
        expiresInSeconds: number;
    }>;
    import(id: unknown, selection: unknown): Promise<{
        revision: number;
        entries: {
            warnings: string[];
            id: string;
            work: Work;
            bibKey: string;
            sourceIds: string[];
            createdAt: string;
            updatedAt: string;
            crossref?: {
                doi: string;
                fetchedAt: string;
                filled: string[];
                conflicts: FieldConflict[];
            };
        }[];
        sources: {
            id: string;
            createdAt: string;
            kind: "doi" | "bibtex";
            label: string;
        }[];
    }>;
    enrich(rawIds: unknown, revision: unknown): Promise<EnrichmentJob>;
    private runEnrichment;
    job(id: unknown): EnrichmentJob;
    cancel(id: unknown): EnrichmentJob;
    dispose(): void;
    export(kind: unknown, style: unknown, lang: unknown, rawIds?: unknown): Promise<{
        filename: string;
        type: string;
        content: string;
    }>;
    dispatch(value: unknown, signal?: AbortSignal): Promise<unknown>;
    fetch(request: Request): Promise<Response>;
}
export declare function buildBatchTool(workbench: CitationWorkbench): CiteToolDefinition;
