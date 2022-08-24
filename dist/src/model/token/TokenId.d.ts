import { TokenIdDto } from 'bitxor-catbuffer-typescript';
import { Address } from '../account/Address';
import { Id } from '../Id';
import { TokenNonce } from '../token/TokenNonce';
/**
 * The token id structure describes token id
 *
 * @since 1.0
 */
export declare class TokenId {
    /**
     * Token id
     */
    readonly id: Id;
    /**
     * Create a TokenId for given `nonce` TokenNonce and `owner` PublicAccount.
     *
     * @param   nonce   {TokenNonce}
     * @param   ownerAddress   {Address}
     * @return  {TokenId}
     */
    static createFromNonce(nonce: TokenNonce, ownerAddress: Address): TokenId;
    /**
     * Create TokenId from token id in form of array of number (ex: [3646934825, 3576016193])
     * or the hexadecimal notation thereof in form of a string.
     *
     * @param id
     */
    constructor(id: string | number[]);
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex(): string;
    /**
     * Compares tokenIds for equality.
     *
     * @return boolean
     */
    equals(other: any): boolean;
    /**
     * Create Builder object.
     */
    toBuilder(): TokenIdDto;
    /**
     * returns that this instance is an alias.
     */
    isNamespaceId(): boolean;
    /**
     * returns that the instance is not address
     */
    isAddress(): boolean;
    /**
     * returns that the instance is a token id
     */
    isTokenId(): boolean;
}
