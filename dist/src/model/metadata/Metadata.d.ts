import { MetadataEntry } from './MetadataEntry';
/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
export declare class Metadata {
    /**
     * The metadata id
     */
    readonly id: string;
    /**
     * The metadata entry
     */
    readonly metadataEntry: MetadataEntry;
    /**
     * Constructor
     * @param id - The metadata id
     * @param metadataEntry - The metadata entry
     */
    constructor(
    /**
     * The metadata id
     */
    id: string, 
    /**
     * The metadata entry
     */
    metadataEntry: MetadataEntry);
}
