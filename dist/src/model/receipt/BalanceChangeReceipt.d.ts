import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Receipt } from './Receipt';
import { ReceiptType } from './ReceiptType';
import { ReceiptVersion } from './ReceiptVersion';
/**
 * Balance Change: A token credit or debit was triggered.
 */
export declare class BalanceChangeReceipt extends Receipt {
    /**
     * The target account address.
     */
    readonly targetAddress: Address;
    /**
     * The token id.
     */
    readonly tokenId: TokenId;
    /**
     * The amount of token.
     */
    readonly amount: UInt64;
    /**
     * Balance change expiry receipt
     * @param targetAddress - The target account address.
     * @param tokenId - The token id.
     * @param amount - The amount of token.
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(
    /**
     * The target account address.
     */
    targetAddress: Address, 
    /**
     * The token id.
     */
    tokenId: TokenId, 
    /**
     * The amount of token.
     */
    amount: UInt64, version: ReceiptVersion, type: ReceiptType, size?: number);
}
