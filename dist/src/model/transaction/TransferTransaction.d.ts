import { PublicAccount, UnresolvedAddress } from '../account';
import { Message } from '../message';
import { NetworkType } from '../network';
import { Token } from '../token';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Transfer transactions contain data about transfers of tokens and message to another account.
 */
export declare class TransferTransaction extends Transaction {
    /**
     * The address of the recipient address.
     */
    readonly recipientAddress: UnresolvedAddress;
    /**
     * The array of Token objects.
     */
    readonly tokens: Token[];
    /**
     * The transaction message of 2048 characters.
     */
    readonly message: Message;
    /**
     * Create a transfer transaction object.
     *
     * - This method can also be used to create PersistentDelegationRequestTransaction
     * with `PersistentHarvestingDelegationMessage` provided.
     * @param deadline - The deadline to include the transaction.
     * @param recipientAddress - The recipient address of the transaction.
     * @param tokens - The array of tokens.
     * @param message - The transaction message.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TransferTransaction}
     */
    static create(deadline: Deadline, recipientAddress: UnresolvedAddress, tokens: Token[], message: Message, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TransferTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param recipientAddress
     * @param tokens
     * @param message
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The address of the recipient address.
     */
    recipientAddress: UnresolvedAddress, 
    /**
     * The array of Token objects.
     */
    tokens: Token[], 
    /**
     * The transaction message of 2048 characters.
     */
    message?: Message, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
