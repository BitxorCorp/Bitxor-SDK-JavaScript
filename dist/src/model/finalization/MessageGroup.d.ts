import { UInt64 } from '../UInt64';
import { BmTreeSignature } from './BmTreeSignature';
/**
 * Finalization message group
 */
export declare class MessageGroup {
    /**
     * Stage.
     */
    readonly stage: number;
    /**
     * Height.
     */
    readonly height: UInt64;
    /**
     * Hashes.
     */
    readonly hashes: string[];
    /**
     * Signatures.
     */
    readonly signatures: BmTreeSignature[];
    constructor(
    /**
     * Stage.
     */
    stage: number, 
    /**
     * Height.
     */
    height: UInt64, 
    /**
     * Hashes.
     */
    hashes: string[], 
    /**
     * Signatures.
     */
    signatures: BmTreeSignature[]);
}
