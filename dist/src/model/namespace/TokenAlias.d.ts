import { TokenId } from '../token/TokenId';
import { Alias } from './Alias';
/**
 * The TokenAlias structure describe token aliases
 *
 * @since 0.10.2
 */
export declare class TokenAlias extends Alias {
    /**
     * The alias address
     */
    readonly tokenId: TokenId;
    /**
     * Create AddressAlias object
     * @param tokenId
     */
    constructor(
    /**
     * The alias address
     */
    tokenId: TokenId);
    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    equals(alias: any): boolean;
    /**
     * Get string value of tokenId
     * @returns {string}
     */
    toHex(): string;
}
