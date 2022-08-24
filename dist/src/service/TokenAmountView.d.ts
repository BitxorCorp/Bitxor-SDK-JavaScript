import { TokenInfo } from '../model/token/TokenInfo';
import { UInt64 } from '../model/UInt64';
/**
 * Class representing token view information with amount
 */
export declare class TokenAmountView {
    /**
     * The token information
     */
    readonly tokenInfo: TokenInfo;
    /**
     * The amount of absolute tokens we have
     */
    readonly amount: UInt64;
    /**
     * @param tokenInfo
     * @param namespaceName
     * @param tokenName
     * @param amount
     */
    constructor(
    /**
     * The token information
     */
    tokenInfo: TokenInfo, 
    /**
     * The amount of absolute tokens we have
     */
    amount: UInt64);
    /**
     * Relative amount dividing amount by the divisibility
     * @returns {string}
     */
    relativeAmount(): number;
    /**
     * Namespace and token description
     * @returns {string}
     */
    fullName(): string;
}
