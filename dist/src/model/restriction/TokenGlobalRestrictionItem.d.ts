import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { TokenRestrictionType } from './TokenRestrictionType';
/**
 * Token global restriction item structure .
 */
export declare class TokenGlobalRestrictionItem {
    readonly key: UInt64;
    /**
     * Reference token identifier
     */
    readonly referenceTokenId: TokenId;
    /**
     * Token restriction value.
     */
    readonly restrictionValue: UInt64;
    /**
     * Token restriction type.
     */
    readonly restrictionType: TokenRestrictionType;
    /**
     * Constructor
     * @param key string,
     * @param referenceTokenId
     * @param restrictionValue
     * @param restrictionType
     */
    constructor(key: UInt64, 
    /**
     * Reference token identifier
     */
    referenceTokenId: TokenId, 
    /**
     * Token restriction value.
     */
    restrictionValue: UInt64, 
    /**
     * Token restriction type.
     */
    restrictionType: TokenRestrictionType);
}
