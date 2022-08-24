import { UInt64 } from '../UInt64';
/**
 * Co-signature signed transaction.
 */
export declare class CosignatureSignedTransaction {
    /**
     * The hash of parent aggregate transaction that has been signed by a cosignatory of the transaction
     */
    readonly parentHash: string;
    /**
     * The signatures generated by signing the parent aggregate transaction hash.
     */
    readonly signature: string;
    /**
     * The signer publicKey of the transaction.
     */
    readonly signerPublicKey: string;
    /**
     * Version
     */
    readonly version: UInt64;
    /**
     * @param parentHash
     * @param signature
     * @param signerPublicKey
     * @param version
     */
    constructor(
    /**
     * The hash of parent aggregate transaction that has been signed by a cosignatory of the transaction
     */
    parentHash: string, 
    /**
     * The signatures generated by signing the parent aggregate transaction hash.
     */
    signature: string, 
    /**
     * The signer publicKey of the transaction.
     */
    signerPublicKey: string, 
    /**
     * Version
     */
    version?: UInt64);
}
