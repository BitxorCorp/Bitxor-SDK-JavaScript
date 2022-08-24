import { AddressResolutionStatement, TokenIdResolutionStatement, TransactionStatement } from '../../model/receipt';
import { ReceiptRepository } from '../ReceiptRepository';
import { ResolutionStatementSearchCriteria, TransactionStatementSearchCriteria } from '../searchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
/**
 * A helper object that streams {@link Statement} using the search.
 */
export declare class ReceiptPaginationStreamer {
    /**
     * It creates a transaction statement streamer of TransactionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static transactionStatements(repository: ReceiptRepository): PaginationStreamer<TransactionStatement, TransactionStatementSearchCriteria>;
    /**
     * It creates a transaction statement streamer of AddressResolutionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static addressResolutionStatements(repository: ReceiptRepository): PaginationStreamer<AddressResolutionStatement, ResolutionStatementSearchCriteria>;
    /**
     * It creates a token resolution statement streamer of TokenResolutionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static tokenResolutionStatements(repository: ReceiptRepository): PaginationStreamer<TokenIdResolutionStatement, ResolutionStatementSearchCriteria>;
}
