import { Address } from '../account';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { TokenAddressRestrictionItem } from './TokenAddressRestrictionItem';
import { TokenRestrictionEntryType } from './TokenRestrictionEntryType';
export declare class TokenAddressRestriction {
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
     * Target address
     */
    readonly targetAddress: Address;
    /**
     * Token restriction items
     */
    readonly restrictions: TokenAddressRestrictionItem[];
    /**
     * Constructor
     * @param version
     * @param compositeHash
     * @param entryType
     * @param tokenId
     * @param targetAddress
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
     * Target address
     */
    targetAddress: Address, 
    /**
     * Token restriction items
     */
    restrictions: TokenAddressRestrictionItem[]);
    /**
     * Returns the restriction for a given key.
     *
     * @param key the key.
     */
    getRestriction(key: UInt64): TokenAddressRestrictionItem | undefined;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
