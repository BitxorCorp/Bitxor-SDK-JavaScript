import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Receipt } from './Receipt';
import { ReceiptType } from './ReceiptType';
import { ReceiptVersion } from './ReceiptVersion';
/**
 * Balance Transfer: A token transfer was triggered.
 */
export declare class BalanceTransferReceipt extends Receipt {
    /**
     * The sender address.
     */
    readonly senderAddress: Address;
    /**
     * The token recipient address.
     */
    readonly recipientAddress: Address;
    /**
     * The token id.
     */
    readonly tokenId: TokenId;
    /**
     * The amount of token.
     */
    readonly amount: UInt64;
    /**
     * Balance transfer expiry receipt
     * @param senderAddress - The sender address.
     * @param recipientAddress - The token recipient address.
     * @param tokenId - The token id.
     * @param amount - The amount of token.
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(
    /**
     * The sender address.
     */
    senderAddress: Address, 
    /**
     * The token recipient address.
     */
    recipientAddress: Address, 
    /**
     * The token id.
     */
    tokenId: TokenId, 
    /**
     * The amount of token.
     */
    amount: UInt64, version: ReceiptVersion, type: ReceiptType, size?: number);
}
