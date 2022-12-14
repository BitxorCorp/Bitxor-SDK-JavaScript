import { Observable } from 'rxjs';
import { TransactionStatus } from '../model/transaction/TransactionStatus';
import { Http } from './Http';
import { TransactionStatusRepository } from './TransactionStatusRepository';
/**
 * Transaction status http repository.
 *
 * @since 1.0
 */
export declare class TransactionStatusHttp extends Http implements TransactionStatusRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param epochAdjustment Genesis block epoch
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, epochAdjustment?: number | Observable<number>, fetchApi?: any);
    /**
     * Gets a transaction status for a transaction hash
     * @param transactionHash - Transaction hash.
     * @returns Observable<TransactionStatus>
     */
    getTransactionStatus(transactionHash: string): Observable<TransactionStatus>;
    /**
     * Gets an array of transaction status for different transaction hashes
     * @param transactionHashes - Array of transaction hash
     * @returns Observable<TransactionStatus[]>
     */
    getTransactionStatuses(transactionHashes: string[]): Observable<TransactionStatus[]>;
}
