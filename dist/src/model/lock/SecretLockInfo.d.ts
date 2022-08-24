import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { LockStatus } from './LockStatus';
/**
 * Secret lock information
 */
export declare class SecretLockInfo {
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
     * The lock hash algorithm.
     */
    readonly hashAlgorithm: LockHashAlgorithm;
    /**
     * The lock secret.
     */
    readonly secret: string;
    /**
     * The recipient's address.
     */
    readonly recipientAddress: Address;
    /**
     * The composite hash.
     */
    readonly compositeHash: string;
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
     * The lock hash algorithm.
     */
    hashAlgorithm: LockHashAlgorithm, 
    /**
     * The lock secret.
     */
    secret: string, 
    /**
     * The recipient's address.
     */
    recipientAddress: Address, 
    /**
     * The composite hash.
     */
    compositeHash: string);
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
