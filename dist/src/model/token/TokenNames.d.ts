import { NamespaceName } from '../namespace/NamespaceName';
import { TokenId } from './TokenId';
/**
 * Token with linked names
 */
export declare class TokenNames {
    /**
     * Token Id
     */
    readonly tokenId: TokenId;
    /**
     * Address linked namespace names
     */
    readonly names: NamespaceName[];
    /**
     *
     */
    constructor(
    /**
     * Token Id
     */
    tokenId: TokenId, 
    /**
     * Address linked namespace names
     */
    names: NamespaceName[]);
}
