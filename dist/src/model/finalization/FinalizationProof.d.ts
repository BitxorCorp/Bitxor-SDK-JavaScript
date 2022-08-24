import { UInt64 } from '../UInt64';
import { MessageGroup } from './MessageGroup';
/**
 * Finalization proof
 */
export declare class FinalizationProof {
    /**
     * Version.
     */
    readonly version: number;
    /**
     * Finalization epoch.
     */
    readonly finalizationEpoch: number;
    /**
     * Finalization point.
     */
    readonly finalizationPoint: number;
    /**
     * Finalization height.
     */
    readonly height: UInt64;
    /**
     * Hash.
     */
    readonly hash: string;
    /**
     * Message groups.
     */
    readonly messageGroups: MessageGroup[];
    constructor(
    /**
     * Version.
     */
    version: number, 
    /**
     * Finalization epoch.
     */
    finalizationEpoch: number, 
    /**
     * Finalization point.
     */
    finalizationPoint: number, 
    /**
     * Finalization height.
     */
    height: UInt64, 
    /**
     * Hash.
     */
    hash: string, 
    /**
     * Message groups.
     */
    messageGroups: MessageGroup[]);
}
