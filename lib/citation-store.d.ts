import { type CitationLibrary, type ImportInput, type ImportRow } from './citation-model.js';
export declare class CitationStore {
    readonly root: string;
    readonly file: string;
    constructor(root?: string);
    private init;
    read(): Promise<CitationLibrary>;
    edit(revision: unknown, mutate: (library: CitationLibrary) => void, signal?: AbortSignal): Promise<CitationLibrary>;
    import(revision: number, input: ImportInput, rows: ImportRow[]): Promise<CitationLibrary>;
}
