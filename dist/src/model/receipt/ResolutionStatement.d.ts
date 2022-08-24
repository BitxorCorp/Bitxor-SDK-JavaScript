import { Address } from '../account/Address';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NetworkType } from '../network/NetworkType';
import { TokenId } from '../token/TokenId';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { ResolutionEntry } from './ResolutionEntry';
import { ResolutionType } from './ResolutionType';
/**
 * ResolutionStatement alias for Addresses receipts.
 */
export declare type AddressResolutionStatement = ResolutionStatement<UnresolvedAddress, Address>;
/**
 * ResolutionStatement alias for Token ids receipts.
 */
export declare type TokenIdResolutionStatement = ResolutionStatement<UnresolvedTokenId, TokenId>;
/**
 * When a transaction includes an alias, a so called resolution statement reflects the resolved value for that block:
 * - Address Resolution: An account alias was used in the block.
 * - Token Resolution: A token alias was used in the block.
 */
export declare class ResolutionStatement<U extends UnresolvedAddress | UnresolvedTokenId, R extends Address | TokenId> {
    /**
     * Resolution type
     */
    readonly resolutionType: ResolutionType;
    /**
     * The block height.
     */
    readonly height: UInt64;
    /**
     * An unresolved address or unresolved tokenId.
     */
    readonly unresolved: U;
    /**
     * The array of resolution entries.
     */
    readonly resolutionEntries: ResolutionEntry<R>[];
    /**
     * Receipt - resolution statement object
     * @param resolutionType - The resolution type
     * @param height - The block height
     * @param unresolved - An unresolved address or unresolved tokenId.
     * @param resolutionEntries - The array of resolution entries.
     */
    constructor(
    /**
     * Resolution type
     */
    resolutionType: ResolutionType, 
    /**
     * The block height.
     */
    height: UInt64, 
    /**
     * An unresolved address or unresolved tokenId.
     */
    unresolved: U, 
    /**
     * The array of resolution entries.
     */
    resolutionEntries: ResolutionEntry<R>[]);
    /**
     * Generate receipt hash
     * @param {networkType} the network type serialized in the output.
     * @return {string} receipt hash in hex
     */
    generateHash(networkType: NetworkType): string;
    /**
     * Get most `recent` available secondary id by a given primaryId
     * @param primaryId Primary source id
     * @param secondaryId Secondary source id
     * @returns {number}
     */
    private getMaxSecondaryIdByPrimaryIdAndSecondaryId;
}
