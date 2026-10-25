/** Display text and literal identifiers have different normalization rules. */
export declare function literalText(value: unknown): string;
export declare function plainText(value: unknown): string;
/** Strip known JATS/CSL formatting only at provider/parser adapters, never from identifiers. */
export declare function providerText(value: unknown): string;
