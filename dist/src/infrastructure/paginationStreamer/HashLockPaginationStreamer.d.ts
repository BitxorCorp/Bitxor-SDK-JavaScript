import { HashLockInfo } from '../../model/lock/HashLockInfo';
import { HashLockSearchCriteria } from '../searchCriteria/HashLockSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link HashLockInfo} using the search.
 */
export declare class HashLockPaginationStreamer extends PaginationStreamer<HashLockInfo, HashLockSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the hashLock repository that will perform the searches
     */
    constructor(searcher: Searcher<HashLockInfo, HashLockSearchCriteria>);
}
