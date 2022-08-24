import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { LockStatus } from './LockStatus';
/**
 * Hash lock information
 */
export declare class HashLockInfo {
    /**
     * Version
     */
    readonly version: number;
    /**
     * The stored database id.
     */
    readonly recordId: string;
    /**
     * Owner's address.
     */
    readonly ownerAddress: Address;
    /**
     * Locked moasic id.
     */
    readonly tokenId: TokenId;
    /**
     * Locked fund amount.
     */
    readonly amount: UInt64;
    /**
     * Block height of the lock expires.
     */
    readonly endHeight: UInt64;
    /**
     * Current lock status.
     */
    readonly status: LockStatus;
    /**
     * Lock hash.
     */
    readonly hash: string;
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * The stored database id.
     */
    recordId: string, 
    /**
     * Owner's address.
     */
    ownerAddress: Address, 
    /**
     * Locked moasic id.
     */
    tokenId: TokenId, 
    /**
     * Locked fund amount.
     */
    amount: UInt64, 
    /**
     * Block height of the lock expires.
     */
    endHeight: UInt64, 
    /**
     * Current lock status.
     */
    status: LockStatus, 
    /**
     * Lock hash.
     */
    hash: string);
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
