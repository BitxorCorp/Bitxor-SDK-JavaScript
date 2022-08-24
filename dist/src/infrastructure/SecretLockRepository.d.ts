import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { SecretLockInfo } from '../model/lock';
import { SearcherRepository } from './paginationStreamer';
import { SecretLockSearchCriteria } from './searchCriteria';
/**
 * Secretlock interface repository.
 */
export interface SecretLockRepository extends SearcherRepository<SecretLockInfo, SecretLockSearchCriteria> {
    /**
     * Get secret lock info of the given id.
     * @param compositeHash SecretLockInfo composite hash id
     * @returns Observable<SecretLockInfo>
     */
    getSecretLock(compositeHash: string): Observable<SecretLockInfo>;
    /**
     * Get secret lock merkle info of the given id.
     * @param compositeHash SecretLockInfo composite hash id
     * @returns Observable<MerkleStateInfo>
     */
    getSecretLockMerkle(compositeHash: string): Observable<MerkleStateInfo>;
}
