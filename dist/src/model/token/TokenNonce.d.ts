/**
 * The token nonce structure
 *
 * @since 1.0
 */
export declare class TokenNonce {
    /**
     * Create TokenNonce from int
     *
     * @param nonce nonce
     */
    constructor(nonce: Uint8Array);
    /**
     * Token nonce
     */
    readonly nonce: Uint8Array;
    /**
     * Create a random TokenNonce
     *
     * @return  {TokenNonce}
     */
    static createRandom(): TokenNonce;
    /**
     * Create a TokenNonce from a Uint8Array notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    static createFromUint8Array(nonce: Uint8Array): TokenNonce;
    /**
     * Create a TokenNonce from a number notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    static createFromNumber(nonce: number): TokenNonce;
    /**
     * Create a TokenNonce from hexadecimal notation.
     *
     * @param   hex     {string}
     * @return  {TokenNonce}
     */
    static createFromHex(hex: string): TokenNonce;
    /**
     * @returns the nonce as an array of 4 digits
     */
    toUint8Array(): Uint8Array;
    /**
     * Get string value of nonce
     * @returns the nonce as hex
     */
    toHex(): string;
}
