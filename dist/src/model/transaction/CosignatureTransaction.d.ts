import { Account } from '../account';
import { AggregateTransaction } from './AggregateTransaction';
import { CosignatureSignedTransaction } from './CosignatureSignedTransaction';
/**
 * Cosignature transaction is used to sign an aggregate transactions with missing cosignatures.
 */
export declare class CosignatureTransaction {
    /**
     * Transaction to cosign.
     */
    readonly transactionToCosign: AggregateTransaction;
    /**
     * @param transactionToCosign Aggregate transaction
     */
    constructor(
    /**
     * Transaction to cosign.
     */
    transactionToCosign: AggregateTransaction);
    /**
     * Create a cosignature transaction
     * @param transactionToCosign - Transaction to cosign.
     * @returns {CosignatureTransaction}
     */
    static create(transactionToCosign: AggregateTransaction): CosignatureTransaction;
    /**
     * Co-sign transaction with transaction payload (off chain)
     * Creating a new CosignatureSignedTransaction
     * @param account - The signing account
     * @param payload - off transaction payload (aggregated transaction is unannounced)
     * @param generationHash - Network generation hash
     * @returns {CosignatureSignedTransaction}
     */
    static signTransactionPayload(account: Account, payload: string, generationHash: string): CosignatureSignedTransaction;
    /**
     * Co-sign transaction with transaction hash (off chain)
     * Creating a new CosignatureSignedTransaction
     * @param account - The signing account
     * @param transactionHash - The hash of the aggregate transaction to be cosigned
     * @returns {CosignatureSignedTransaction}
     */
    static signTransactionHash(account: Account, transactionHash: string): CosignatureSignedTransaction;
    /**
     * Serialize and sign transaction creating a new SignedTransaction
     * @param account
     * @param transactionHash Transaction hash (optional)
     * @returns {CosignatureSignedTransaction}
     */
    signWith(account: Account, transactionHash?: string): CosignatureSignedTransaction;
}
