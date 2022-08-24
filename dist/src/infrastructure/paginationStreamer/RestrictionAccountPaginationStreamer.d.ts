import { AccountRestrictions } from '../../model/restriction';
import { RestrictionAccountSearchCriteria } from '../searchCriteria/RestrictionAccountSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link AccountRestrictions} using the search.
 */
export declare class RestrictionAccountPaginationStreamer extends PaginationStreamer<AccountRestrictions, RestrictionAccountSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the account repository that will perform the searches
     */
    constructor(searcher: Searcher<AccountRestrictions, RestrictionAccountSearchCriteria>);
}
