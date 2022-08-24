export declare class TokenNetworkProperties {
    readonly maxTokensPerAccount?: string | undefined;
    readonly maxTokenDuration?: string | undefined;
    readonly maxTokenDivisibility?: string | undefined;
    readonly tokenRentalFeeSinkAddress?: string | undefined;
    readonly tokenRentalFee?: string | undefined;
    /**
     * @param maxTokensPerAccount - Maximum number of tokens that an account can own.
     * @param maxTokenDuration - Maximum token duration.
     * @param maxTokenDivisibility - Maximum token divisibility.
     * @param tokenRentalFeeSinkAddress - Public key of the token rental fee sink address.
     * @param tokenRentalFee - Token rental fee.
     */
    constructor(maxTokensPerAccount?: string | undefined, maxTokenDuration?: string | undefined, maxTokenDivisibility?: string | undefined, tokenRentalFeeSinkAddress?: string | undefined, tokenRentalFee?: string | undefined);
}
