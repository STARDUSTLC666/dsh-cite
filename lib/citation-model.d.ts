import { type Work } from './crossref.js';
export declare const MAX_INPUT_BYTES: number;
export declare const MAX_BATCH = 100;
export declare const MAX_LIBRARY = 500;
export interface ImportInput {
    kind: 'doi' | 'bibtex';
    text: string;
    label: string;
}
export interface ImportRow {
    index: number;
    key: string;
    work: Work | null;
    warnings: string[];
    error?: string;
    errorEn?: string;
    duplicate?: 'batch' | 'library';
    candidate?: boolean;
    selectedDefault?: boolean;
}
export interface SourceRecord extends ImportInput {
    id: string;
    createdAt: string;
}
export interface FieldConflict {
    field: string;
    local: unknown;
    crossref: unknown;
}
export interface LibraryEntry {
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
}
export interface CitationLibrary {
    version: 1;
    revision: number;
    entries: LibraryEntry[];
    sources: SourceRecord[];
}
/** Never render provider/BibTeX markup as HTML. Keep the original source separately. */
export declare function plainText(value: unknown): string;
export declare function normalizeWork(value: unknown): Work;
export declare function workWarnings(work: Work): string[];
export declare function candidateKey(work: Work): string;
export declare function readImportInput(value: unknown): ImportInput;
export declare function citationId(value: unknown): string;
export declare function readSelection(value: unknown, max?: number): string[];
export declare class LibraryConflict extends Error {
    readonly status = 409;
}
