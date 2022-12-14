import { SecretLockInfo } from '../../model/lock/SecretLockInfo';
import { SecretLockSearchCriteria } from '../searchCriteria/SecretLockSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link SecretLockInfo} using the search.
 */
export declare class SecretLockPaginationStreamer extends PaginationStreamer<SecretLockInfo, SecretLockSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the SecretLock repository that will perform the searches
     */
    constructor(searcher: Searcher<SecretLockInfo, SecretLockSearchCriteria>);
}
