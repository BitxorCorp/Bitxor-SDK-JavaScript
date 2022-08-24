import { AccountInfo } from '../../model/account/AccountInfo';
import { AccountSearchCriteria } from '../searchCriteria/AccountSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link AccountInfo} using the search.
 */
export declare class AccountPaginationStreamer extends PaginationStreamer<AccountInfo, AccountSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the account repository that will perform the searches
     */
    constructor(searcher: Searcher<AccountInfo, AccountSearchCriteria>);
}
