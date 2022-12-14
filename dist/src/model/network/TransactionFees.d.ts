/**
 * Transacation Fees
 */
export declare class TransactionFees {
    readonly averageFeeMultiplier: number;
    readonly medianFeeMultiplier: number;
    readonly highestFeeMultiplier: number;
    readonly lowestFeeMultiplier: number;
    readonly minFeeMultiplier: number;
    /**
     * @param averageFeeMultiplier - Average fee multiplier over the last \"numBlocksTransactionFeeStats\".
     * @param medianFeeMultiplier - Median fee multiplier over the last \"numBlocksTransactionFeeStats\".
     * @param highestFeeMultiplier - Highest fee multiplier over the last "numBlocksTransactionFeeStats".
     * @param lowestFeeMultiplier - Lowest fee multiplier over the last "numBlocksTransactionFeeStats".
     * @param minFeeMultiplier - Node specific. Minimal fee multiplier on the current selected node.
     */
    constructor(averageFeeMultiplier: number, medianFeeMultiplier: number, highestFeeMultiplier: number, lowestFeeMultiplier: number, minFeeMultiplier: number);
}
