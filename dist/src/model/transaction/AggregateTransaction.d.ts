import { PublicAccount } from '../account';
import { NetworkType } from '../network';
import { UInt64 } from '../UInt64';
import { AggregateTransactionCosignature } from './AggregateTransactionCosignature';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Aggregate innerTransactions contain multiple innerTransactions that can be initiated by different accounts.
 */
export declare class AggregateTransaction extends Transaction {
    /**
     * The array of innerTransactions included in the aggregate transaction.
     */
    readonly innerTransactions: InnerTransaction[];
    /**
     * The array of transaction cosigners signatures.
     */
    readonly cosignatures: AggregateTransactionCosignature[];
    /**
     * @param networkType
     * @param type
     * @param version
     * @param deadline
     * @param maxFee
     * @param innerTransactions
     * @param cosignatures
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, type: number, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The array of innerTransactions included in the aggregate transaction.
     */
    innerTransactions: InnerTransaction[], 
    /**
     * The array of transaction cosigners signatures.
     */
    cosignatures: AggregateTransactionCosignature[], signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create an aggregate complete transaction object
     * @param deadline - The deadline to include the transaction.
     * @param innerTransactions - The array of inner innerTransactions.
     * @param networkType - The network type.
     * @param cosignatures
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AggregateTransaction}
     */
    static createComplete(deadline: Deadline, innerTransactions: InnerTransaction[], networkType: NetworkType, cosignatures: AggregateTransactionCosignature[], maxFee?: UInt64, signature?: string, signer?: PublicAccount): AggregateTransaction;
    /**
     * Create an aggregate bonded transaction object
     * @param {Deadline} deadline
     * @param {InnerTransaction[]} innerTransactions
     * @param {NetworkType} networkType
     * @param {AggregateTransactionCosignature[]} cosignatures
     * @param {UInt64} maxFee - (Optional) Max fee defined by the sender
     * @param {string} signature - (Optional) Transaction signature
     * @param {PublicAccount} signer - (Optional) Signer public account
     * @return {AggregateTransaction}
     */
    static createBonded(deadline: Deadline, innerTransactions: InnerTransaction[], networkType: NetworkType, cosignatures?: AggregateTransactionCosignature[], maxFee?: UInt64, signature?: string, signer?: PublicAccount): AggregateTransaction;
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @returns {AggregateTransaction}
     */
    static createFromPayload(payload: string): AggregateTransaction;
    /**
     * @description add inner transactions to current list
     * @param {InnerTransaction[]} transaction
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    addTransactions(transactions: InnerTransaction[]): AggregateTransaction;
    /**
     * @description add cosignatures to current list
     * @param {AggregateTransactionCosignature[]} transaction
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    addCosignatures(cosigs: AggregateTransactionCosignature[]): AggregateTransaction;
    /**
     * Check if account has signed transaction
     * @param publicAccount - Signer public account
     * @returns {boolean}
     */
    signedByAccount(publicAccount: PublicAccount): boolean;
    /**
     * Set transaction maxFee using fee multiplier for **ONLY AGGREGATE TRANSACTIONS**
     * @param feeMultiplier The fee multiplier
     * @param requiredCosignatures Required number of cosignatures
     * @returns {AggregateTransaction}
     */
    setMaxFeeForAggregate(feeMultiplier: number, requiredCosignatures: number): AggregateTransaction;
}
