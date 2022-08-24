import { Observable } from 'rxjs';
import { AddressResolutionStatement, TokenIdResolutionStatement } from '../model/receipt/ResolutionStatement';
import { TransactionStatement } from '../model/receipt/TransactionStatement';
import { Http } from './Http';
import { Page } from './Page';
import { ReceiptRepository } from './ReceiptRepository';
import { ResolutionStatementSearchCriteria } from './searchCriteria/ResolutionStatementSearchCriteria';
import { TransactionStatementSearchCriteria } from './searchCriteria/TransactionStatementSearchCriteria';
/**
 * Receipt http repository.
 *
 * @since 1.0
 */
export declare class ReceiptHttp extends Http implements ReceiptRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    searchAddressResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<AddressResolutionStatement>>;
    searchTokenResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<TokenIdResolutionStatement>>;
    searchReceipts(criteria: TransactionStatementSearchCriteria): Observable<Page<TransactionStatement>>;
}
