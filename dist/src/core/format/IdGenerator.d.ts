export declare class IdGenerator {
    /**
     * Generates a token id given a nonce and a address.
     * @param {object} nonce The token nonce.
     * @param {object} ownerAddress The address.
     * @returns {module:coders/uint64~uint64} The token id.
     */
    static generateTokenId: (nonce: any, ownerAddress: any) => number[];
    /**
     * Parses a unified namespace name into a path.
     * @param {string} name The unified namespace name.
     * @returns {array<module:coders/uint64~uint64>} The namespace path.
     */
    static generateNamespacePath: (name: string) => number[];
}
