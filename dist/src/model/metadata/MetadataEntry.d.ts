import { Address } from '../account/Address';
import { NamespaceId } from '../namespace/NamespaceId';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { MetadataType } from './MetadataType';
/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
export declare class MetadataEntry {
    /**
     * Version
     */
    readonly version: number;
    /**
     * The composite hash
     */
    readonly compositeHash: string;
    /**
     * The metadata source address (provider)
     */
    readonly sourceAddress: Address;
    /**
     * The metadata target address
     */
    readonly targetAddress: Address;
    /**
     * The key scoped to source, target and type
     */
    readonly scopedMetadataKey: UInt64;
    /**
     * The metadata type
     */
    readonly metadataType: MetadataType;
    /**
     * The metadata value
     */
    readonly value: string;
    /**
     * The target token or namespace identifier
     */
    readonly targetId?: TokenId | NamespaceId | undefined;
    /**
     * Constructor
     * @param {number} version - The version
     * @param {string} compositeHash - The composite hash
     * @param {string} sourceAddress - The metadata source address (provider)
     * @param {string} targetAddress - The metadata target address
     * @param {UInt64} scopedMetadataKey - The key scoped to source, target and type
     * @param {MetadatType} metadataType - The metadata type (Account | Token | Namespace)
     * @param {string} value - The metadata value
     * @param {UnresolvedTokenId | undefined} targetId - The target token or namespace identifier
     */
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * The composite hash
     */
    compositeHash: string, 
    /**
     * The metadata source address (provider)
     */
    sourceAddress: Address, 
    /**
     * The metadata target address
     */
    targetAddress: Address, 
    /**
     * The key scoped to source, target and type
     */
    scopedMetadataKey: UInt64, 
    /**
     * The metadata type
     */
    metadataType: MetadataType, 
    /**
     * The metadata value
     */
    value: string, 
    /**
     * The target token or namespace identifier
     */
    targetId?: TokenId | NamespaceId | undefined);
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
