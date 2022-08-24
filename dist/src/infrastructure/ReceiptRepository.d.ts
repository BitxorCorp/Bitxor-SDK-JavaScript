import { Observable } from 'rxjs';
import { AddressResolutionStatement, TokenIdResolutionStatement } from '../model/receipt/ResolutionStatement';
import { TransactionStatement } from '../model/receipt/TransactionStatement';
import { Page } from './Page';
import { ResolutionStatementSearchCriteria } from './searchCriteria/ResolutionStatementSearchCriteria';
import { TransactionStatementSearchCriteria } from './searchCriteria/TransactionStatementSearchCriteria';
/**
 * Receipt interface repository.
 *
 * @since 1.0
 */
export interface ReceiptRepository {
    /**
     * Returns a transaction statements page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TransactionStatement}
     */
    searchReceipts(criteria: TransactionStatementSearchCriteria): Observable<Page<TransactionStatement>>;
    /**
     * Returns an addresses resolution statements page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link AddressResolutionStatement}
     */
    searchAddressResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<AddressResolutionStatement>>;
    /**
     * Returns an token resoslution statements page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenIdResolutionStatement}
     */
    searchTokenResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<TokenIdResolutionStatement>>;
}
