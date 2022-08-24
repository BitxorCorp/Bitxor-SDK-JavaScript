import { Address } from '../account';
import { UInt64 } from '../UInt64';
import { TokenFlags } from './TokenFlags';
import { TokenId } from './TokenId';
/**
 * The token info structure describes a token.
 */
export declare class TokenInfo {
    /**
     * Version
     */
    readonly version: number;
    /**
     * The database record id.
     */
    readonly recordId: string;
    /**
     * The token id.
     */
    readonly id: TokenId;
    /**
     * The token supply.
     */
    readonly supply: UInt64;
    /**
     * The block height were token was created.
     */
    readonly startHeight: UInt64;
    /**
     * The token owner address.
     */
    readonly ownerAddress: Address;
    /**
     * The token revision
     */
    readonly revision: number;
    /**
     * The token flags.
     */
    readonly flags: TokenFlags;
    /**
     * Token divisibility
     */
    readonly divisibility: number;
    /**
     * Token duration
     */
    readonly duration: UInt64;
    /**
     * @param version
     * @param recordId
     * @param id
     * @param supply
     * @param startHeight
     * @param ownerAddress
     * @param revision
     * @param flags
     * @param divisibility
     * @param duration
     */
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * The database record id.
     */
    recordId: string, 
    /**
     * The token id.
     */
    id: TokenId, 
    /**
     * The token supply.
     */
    supply: UInt64, 
    /**
     * The block height were token was created.
     */
    startHeight: UInt64, 
    /**
     * The token owner address.
     */
    ownerAddress: Address, 
    /**
     * The token revision
     */
    revision: number, 
    /**
     * The token flags.
     */
    flags: TokenFlags, 
    /**
     * Token divisibility
     */
    divisibility: number, 
    /**
     * Token duration
     */
    duration: UInt64);
    /**
     * Is token supply mutable
     * @returns {boolean}
     */
    isSupplyMutable(): boolean;
    /**
     * Is token transferable
     * @returns {boolean}
     */
    isTransferable(): boolean;
    /**
     * Is token restrictable
     * @returns {boolean}
     */
    isRestrictable(): boolean;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
