import { Observable } from 'rxjs';
import { CosignatureSignedTransaction, SignedTransaction, Transaction, TransactionAnnounceResponse } from '../model/transaction';
import { Http } from './Http';
import { Page } from './Page';
import { TransactionPaginationStreamer } from './paginationStreamer';
import { TransactionSearchCriteria } from './searchCriteria';
import { TransactionGroup } from './TransactionGroup';
import { TransactionRepository } from './TransactionRepository';
/**
 * Transaction http repository.
 *
 * @since 1.0
 */
export declare class TransactionHttp extends Http implements TransactionRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets a transaction for a transactionId
     * @param transactionId - Transaction id or hash.
     * @param transactionGroup - Transaction group.
     * @returns Observable<Transaction>
     */
    getTransaction(transactionId: string, transactionGroup: TransactionGroup): Observable<Transaction>;
    /**
     * Gets an array of transactions for different transaction ids
     * @param transactionIds - Array of transactions id and/or hash.
     * @param transactionGroup - Transaction group.
     * @returns Observable<Transaction[]>
     */
    getTransactionsById(transactionIds: string[], transactionGroup: TransactionGroup): Observable<Transaction[]>;
    /**
     * Send a signed transaction
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announce(signedTransaction: SignedTransaction): Observable<TransactionAnnounceResponse>;
    /**
     * Send a signed transaction with missing signatures
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announceAggregateBonded(signedTransaction: SignedTransaction): Observable<TransactionAnnounceResponse>;
    /**
     * Send a cosignature signed transaction of an already announced transaction
     * @param cosignatureSignedTransaction - Cosignature signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announceAggregateBondedCosignature(cosignatureSignedTransaction: CosignatureSignedTransaction): Observable<TransactionAnnounceResponse>;
    /**
     * Gets a transaction's effective paid fee
     * @param transactionId - Transaction id or hash.
     * @returns Observable<number>
     */
    getTransactionEffectiveFee(transactionId: string): Observable<number>;
    /**
     * Returns an array of transactions.
     * @summary Get transactions
     * @param criteria Transaction search criteria
     * @returns {Observable<Page<Transaction>>}
     */
    search(criteria: TransactionSearchCriteria): Observable<Page<Transaction>>;
    streamer(): TransactionPaginationStreamer;
}
