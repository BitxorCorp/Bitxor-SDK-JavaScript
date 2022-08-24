import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { HashLockInfo } from '../model/lock';
import { SearcherRepository } from './paginationStreamer';
import { HashLockSearchCriteria } from './searchCriteria';
/**
 * Hashlock interface repository.
 */
export interface HashLockRepository extends SearcherRepository<HashLockInfo, HashLockSearchCriteria> {
    /**
     * Get hash lock info of the given id
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
}
