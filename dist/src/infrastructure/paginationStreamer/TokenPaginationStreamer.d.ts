import { TokenInfo } from '../../model/token/TokenInfo';
import { TokenSearchCriteria } from '../searchCriteria/TokenSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link TokenInfo} using the search.
 */
export declare class TokenPaginationStreamer extends PaginationStreamer<TokenInfo, TokenSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the token repository that will perform the searches
     */
    constructor(searcher: Searcher<TokenInfo, TokenSearchCriteria>);
}
