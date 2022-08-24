import { ParentPublicKeySignaturePair } from './ParentPublicKeySignaturePair';
/**
 * BM Tree signature
 */
export declare class BmTreeSignature {
    /**
     * Root.
     */
    readonly root: ParentPublicKeySignaturePair;
    /**
     * Bottom.
     */
    readonly bottom: ParentPublicKeySignaturePair;
    constructor(
    /**
     * Root.
     */
    root: ParentPublicKeySignaturePair, 
    /**
     * Bottom.
     */
    bottom: ParentPublicKeySignaturePair);
}
