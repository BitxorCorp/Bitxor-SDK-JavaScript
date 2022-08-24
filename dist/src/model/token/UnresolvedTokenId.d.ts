import { NamespaceId } from '../namespace';
import { TokenId } from './TokenId';
/**
 * Custom type for unresolved tokenId
 */
export declare type UnresolvedTokenId = (TokenId | NamespaceId) & {
    /**
     * returns if the object is instance of NamespaceId.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isNamespaceId(): boolean;
    /**
     * returns if the object is instance of TokenId.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isTokenId(): boolean;
};
