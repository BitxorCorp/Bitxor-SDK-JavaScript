/**
 * Chain related configuration properties.
 */
export declare class ChainProperties {
    readonly enableVerifiableState?: boolean | undefined;
    readonly enableVerifiableReceipts?: boolean | undefined;
    readonly currencyTokenId?: string | undefined;
    readonly harvestingTokenId?: string | undefined;
    readonly blockGenerationTargetTime?: string | undefined;
    readonly blockTimeSmoothingFactor?: string | undefined;
    readonly blockFinalizationInterval?: string | undefined;
    readonly importanceGrouping?: string | undefined;
    readonly importanceActivityPercentage?: string | undefined;
    readonly maxRollbackBlocks?: string | undefined;
    readonly maxDifficultyBlocks?: string | undefined;
    readonly defaultDynamicFeeMultiplier?: string | undefined;
    readonly maxTransactionLifetime?: string | undefined;
    readonly maxBlockFutureTime?: string | undefined;
    readonly initialCurrencyAtomicUnits?: string | undefined;
    readonly maxTokenAtomicUnits?: string | undefined;
    readonly totalChainImportance?: string | undefined;
    readonly minHarvesterBalance?: string | undefined;
    readonly maxHarvesterBalance?: string | undefined;
    readonly minVoterBalance?: string | undefined;
    readonly maxVotingKeysPerAccount?: string | undefined;
    readonly minVotingKeyLifetime?: string | undefined;
    readonly maxVotingKeyLifetime?: string | undefined;
    readonly harvestBeneficiaryPercentage?: string | undefined;
    readonly harvestNetworkPercentage?: string | undefined;
    readonly harvestNetworkFeeSinkAddress?: string | undefined;
    readonly blockPruneInterval?: string | undefined;
    readonly maxTransactionsPerBlock?: string | undefined;
    /**
     * @param enableVerifiableState - Set to true if block chain should calculate state hashes so that state is fully verifiable at each block.
     * @param enableVerifiableReceipts - Set to true if block chain should calculate receipts so that state changes are fully verifiable at each block.
     * @param currencyTokenId - Token id used as primary chain currency.
     * @param harvestingTokenId - Token id used to provide harvesting ability.
     * @param blockGenerationTargetTime - Targeted time between blocks.
     * @param blockTimeSmoothingFactor - A higher value makes the network more biased.
     * @param blockFinalizationInterval - Number of blocks between successive finalization attempts.
     * @param importanceGrouping - Number of blocks that should be treated as a group for importance purposes.
     * @param importanceActivityPercentage - Percentage of importance resulting from fee generation and beneficiary usage.
     * @param maxRollbackBlocks - Maximum number of blocks that can be rolled back.
     * @param maxDifficultyBlocks - Maximum number of blocks to use in a difficulty calculation.
     * @param defaultDynamicFeeMultiplier - Default multiplier to use for dynamic fees.
     * @param maxTransactionLifetime - Maximum lifetime a transaction can have before it expires.
     * @param maxBlockFutureTime - Maximum future time of a block that can be accepted.
     * @param initialCurrencyAtomicUnits - Initial currency atomic units available in the network.
     * @param maxTokenAtomicUnits - Maximum atomic units (total-supply * 10 ^ divisibility) of a token allowed in the network.
     * @param totalChainImportance - Total whole importance units available in the network.
     * @param minHarvesterBalance - Minimum number of harvesting token atomic units needed for an account to be eligible for harvesting.
     * @param maxHarvesterBalance - Maximum number of harvesting token atomic units needed for an account to be eligible for harvesting.
     * @param minVoterBalance - Minimum number of harvesting token atomic units needed for an account to be eligible for voting.
     * @param maxVotingKeysPerAccount - Maximum number of voting keys that can be registered at once per account.
     * @param minVotingKeyLifetime - Minimum number of finalization rounds for which voting key can be registered.
     * @param maxVotingKeyLifetime - Maximum number of finalization rounds for which voting key can be registered.
     * @param harvestBeneficiaryPercentage - Percentage of the harvested fee that is collected by the beneficiary account.
     * @param harvestNetworkPercentage - Percentage of the harvested fee that is collected by network.
     * @param harvestNetworkFeeSinkAddress - The harvest network fee sink address.
     * @param blockPruneInterval - Number of blocks between cache pruning.
     * @param maxTransactionsPerBlock - Maximum number of transactions per block.
     */
    constructor(enableVerifiableState?: boolean | undefined, enableVerifiableReceipts?: boolean | undefined, currencyTokenId?: string | undefined, harvestingTokenId?: string | undefined, blockGenerationTargetTime?: string | undefined, blockTimeSmoothingFactor?: string | undefined, blockFinalizationInterval?: string | undefined, importanceGrouping?: string | undefined, importanceActivityPercentage?: string | undefined, maxRollbackBlocks?: string | undefined, maxDifficultyBlocks?: string | undefined, defaultDynamicFeeMultiplier?: string | undefined, maxTransactionLifetime?: string | undefined, maxBlockFutureTime?: string | undefined, initialCurrencyAtomicUnits?: string | undefined, maxTokenAtomicUnits?: string | undefined, totalChainImportance?: string | undefined, minHarvesterBalance?: string | undefined, maxHarvesterBalance?: string | undefined, minVoterBalance?: string | undefined, maxVotingKeysPerAccount?: string | undefined, minVotingKeyLifetime?: string | undefined, maxVotingKeyLifetime?: string | undefined, harvestBeneficiaryPercentage?: string | undefined, harvestNetworkPercentage?: string | undefined, harvestNetworkFeeSinkAddress?: string | undefined, blockPruneInterval?: string | undefined, maxTransactionsPerBlock?: string | undefined);
}
