import { TokenId } from '../token';
import { UInt64 } from '../UInt64';
import { TokenGlobalRestrictionItem } from './TokenGlobalRestrictionItem';
import { TokenRestrictionEntryType } from './TokenRestrictionEntryType';
/**
 * Token global restriction structure describes restriction information for an token.
 */
export declare class TokenGlobalRestriction {
    /**
     * Version
     */
    readonly version: number;
    /**
     * composite hash
     */
    readonly compositeHash: string;
    /**
     * Token restriction entry type.
     */
    readonly entryType: TokenRestrictionEntryType;
    /**
     * Token identifier.
     */
    readonly tokenId: TokenId;
    /**
     * Token restriction items
     */
    readonly restrictions: TokenGlobalRestrictionItem[];
    /**
     * Constructor
     * @param version
     * @param compositeHash
     * @param entryType
     * @param tokenId
     * @param restrictions
     */
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * composite hash
     */
    compositeHash: string, 
    /**
     * Token restriction entry type.
     */
    entryType: TokenRestrictionEntryType, 
    /**
     * Token identifier.
     */
    tokenId: TokenId, 
    /**
     * Token restriction items
     */
    restrictions: TokenGlobalRestrictionItem[]);
    /**
     * Returns the restriction for a given key.
     *
     * @param key the key.
     */
    getRestriction(key: UInt64): TokenGlobalRestrictionItem | undefined;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
