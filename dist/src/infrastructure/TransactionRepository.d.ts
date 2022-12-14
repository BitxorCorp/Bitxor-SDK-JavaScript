import { Observable } from 'rxjs';
import { CosignatureSignedTransaction, SignedTransaction, Transaction, TransactionAnnounceResponse } from '../model/transaction';
import { SearcherRepository } from './paginationStreamer';
import { TransactionSearchCriteria } from './searchCriteria';
import { TransactionGroup } from './TransactionGroup';
/**
 * Transaction interface repository.
 *
 * @since 1.0
 */
export interface TransactionRepository extends SearcherRepository<Transaction, TransactionSearchCriteria> {
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
     * Gets a transaction's effective paid fee
     * @param transactionId - Transaction id or hash.
     * @returns Observable<number>
     */
    getTransactionEffectiveFee(transactionId: string): Observable<number>;
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
}
