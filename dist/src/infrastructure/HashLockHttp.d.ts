import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain/MerkleStateInfo';
import { HashLockInfo } from '../model/lock/HashLockInfo';
import { HashLockRepository } from './HashLockRepository';
import { Http } from './Http';
import { Page } from './Page';
import { HashLockPaginationStreamer } from './paginationStreamer';
import { HashLockSearchCriteria } from './searchCriteria/HashLockSearchCriteria';
/**
 * Hashlock http repository.
 *
 * @since 1.0
 */
export declare class HashLockHttp extends Http implements HashLockRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Get hash lock info for an account.
     * @param hash Hashlock hash
     * @returns Observable<HashLockInfo>
     */
    getHashLock(hash: string): Observable<HashLockInfo>;
    /**
     * Get secret lock merkle info of the given id.
     * @param hash HashLockInfo hash id
     * @returns Observable<MerkleStateInfo>
     */
    getHashLockMerkle(hash: string): Observable<MerkleStateInfo>;
    /**
     * Gets an array of HashLockInfo.
     * @param criteria - HashLock search criteria
     * @returns Observable<Page<HashLockInfo>>
     */
    search(criteria: HashLockSearchCriteria): Observable<Page<HashLockInfo>>;
    streamer(): HashLockPaginationStreamer;
}
