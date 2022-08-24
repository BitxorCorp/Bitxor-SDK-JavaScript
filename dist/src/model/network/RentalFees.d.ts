import { UInt64 } from '../UInt64';
/**
 * Rental Fees
 */
export declare class RentalFees {
    readonly effectiveRootNamespaceRentalFeePerBlock: UInt64;
    readonly effectiveRootNamespaceEternalFee: UInt64;
    readonly effectiveChildNamespaceRentalFee: UInt64;
    readonly effectiveTokenRentalFee: UInt64;
    /**
     * @param effectiveRootNamespaceRentalFeePerBlock - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveRootNamespaceEternalFee - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveChildNamespaceRentalFee - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveTokenRentalFee - bsolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     */
    constructor(effectiveRootNamespaceRentalFeePerBlock: UInt64, effectiveRootNamespaceEternalFee: UInt64, effectiveChildNamespaceRentalFee: UInt64, effectiveTokenRentalFee: UInt64);
}
