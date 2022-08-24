/**
 * Parent publickey signature pair
 */
export declare class ParentPublicKeySignaturePair {
    /**
     * Parent public key.
     */
    readonly parentPublicKey: string;
    /**
     * Signature.
     */
    readonly signature: string;
    constructor(
    /**
     * Parent public key.
     */
    parentPublicKey: string, 
    /**
     * Signature.
     */
    signature: string);
}
