export declare class NamespaceTokenIdGenerator {
    /**
     * @param {Uint8Array} nonce Token nonce
     * @param {Uint8Array} ownerAddress Address
     * @returns {number[]} token Id
     */
    static tokenId: (nonce: Uint8Array, ownerAddress: Uint8Array) => number[];
    /**
     * @returns random token nonce
     */
    static generateRandomTokenNonce: () => any;
    /**
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace id
     */
    static namespaceId: (namespaceName: string) => any;
    /**
     * @param {string} parentNamespaceName - The parent namespace name
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace parent id
     */
    static subnamespaceParentId: (parentNamespaceName: string, namespaceName: string) => any;
    /**
     * @param {string} parentNamespaceName - The parent namespace name
     * @param {string} namespaceName - The namespace name
     * @returns sub namespace id
     */
    static subnamespaceNamespaceId: (parentNamespaceName: string, namespaceName: string) => any;
}
