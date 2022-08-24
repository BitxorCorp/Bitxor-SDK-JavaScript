import { PublicAccount } from '../account';
import { NetworkType } from '../network';
import { Token } from '../token';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { SignedTransaction } from './SignedTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Lock funds transaction is used before sending an Aggregate bonded transaction, as a deposit to announce the transaction.
 * When aggregate bonded transaction is confirmed funds are returned to LockFundsTransaction signer.
 *
 * @since 1.0
 */
export declare class LockFundsTransaction extends Transaction {
    readonly token: Token;
    readonly duration: UInt64;
    /**
     * Aggregate bonded hash.
     */
    readonly hash: string;
    /**
     * Create a Lock funds transaction object
     * @param deadline - The deadline to include the transaction.
     * @param token - The locked token.
     * @param duration - The funds lock duration.
     * @param signedTransaction - The signed transaction for which funds are locked.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {LockFundsTransaction}
     */
    static create(deadline: Deadline, token: Token, duration: UInt64, signedTransaction: SignedTransaction, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): LockFundsTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param token The locked token.
     * @param duration The funds lock duration.
     * @param signedTransaction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, token: Token, duration: UInt64, signedTransaction: SignedTransaction, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
