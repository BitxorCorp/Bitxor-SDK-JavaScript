import { TokenRestriction } from '../../model/restriction/TokenRestriction';
import { RestrictionTokenSearchCriteria } from '../searchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link RestrictionToken} using the search.
 */
export declare class RestrictionTokenPaginationStreamer extends PaginationStreamer<TokenRestriction, RestrictionTokenSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the account repository that will perform the searches
     */
    constructor(searcher: Searcher<TokenRestriction, RestrictionTokenSearchCriteria>);
}
