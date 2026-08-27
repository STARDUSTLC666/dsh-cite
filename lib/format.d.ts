/**
 * 参考文献格式化：GB/T 7714-2015 / APA 7 / MLA 9 / Chicago note，以及 BibTeX。
 *
 * @module dsh-cite/format
 */
import type { Work } from './crossref.js';
export type CiteStyle = 'gb-t-7714' | 'apa' | 'mla' | 'chicago';
export declare function readStyle(raw: unknown): CiteStyle;
/** 按样式生成引文。 */
export declare function buildCitation(work: Work, style: CiteStyle, lang?: string): string;
/** 生成 BibTeX 条目。 */
export declare function buildBibtex(work: Work, key?: string): string;
