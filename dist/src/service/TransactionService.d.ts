import { Observable } from 'rxjs';
import { IListener, ReceiptRepository, TransactionRepository } from '../infrastructure';
import { AggregateTransaction, SignedTransaction, Transaction } from '../model/transaction';
import { ITransactionService } from './interfaces';
/**
 * Transaction Service
 */
export declare class TransactionService implements ITransactionService {
    private readonly transactionRepository;
    private readonly receiptRepository;
    /**
     * Constructor
     * @param transactionRepository
     * @param receiptRepository
     */
    constructor(transactionRepository: TransactionRepository, receiptRepository: ReceiptRepository);
    /**
     * Resolve unresolved token / address from array of transactions
     * @param transationHashes List of transaction hashes.
     * @returns Observable<Transaction[]>
     */
    resolveAliases(transationHashes: string[]): Observable<Transaction[]>;
    /**
     * @param signedTransaction Signed transaction to be announced.
     * @param listener Websocket listener
     * @returns {Observable<Transaction>}
     */
    announce(signedTransaction: SignedTransaction, listener: IListener): Observable<Transaction>;
    /**
     * Announce aggregate transaction
     * **NOTE** A lock fund transaction for this aggregate bonded should exists
     * @param signedTransaction Signed aggregate bonded transaction.
     * @param listener Websocket listener
     * @returns {Observable<AggregateTransaction>}
     */
    announceAggregateBonded(signedTransaction: SignedTransaction, listener: IListener): Observable<AggregateTransaction>;
    /**
     * This method announces an a hash lock transaction followed by a aggregate bonded transaction
     * while waiting for being confirmed by listing to the /confirmed and /aggregateBondedAdded web
     * socket. If an error is sent while processing any of the given transaction an Error is raised.
     *
     * @param signedHashLockTransaction Signed hash lock transaction.
     * @param signedAggregateTransaction Signed aggregate bonded transaction.
     * @param listener Websocket listener
     * @returns {Observable<AggregateTransaction>}
     */
    announceHashLockAggregateBonded(signedHashLockTransaction: SignedTransaction, signedAggregateTransaction: SignedTransaction, listener: IListener): Observable<AggregateTransaction>;
    /**
     * Resolve transaction alias(s)
     * @param transaction Transaction to be resolved
     * @returns {Observable<Transaction>}
     */
    private resolveTransaction;
}
