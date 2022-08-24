import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { SecretLockInfo } from '../model/lock';
import { Http } from './Http';
import { Page } from './Page';
import { SecretLockPaginationStreamer } from './paginationStreamer';
import { SecretLockSearchCriteria } from './searchCriteria';
import { SecretLockRepository } from './SecretLockRepository';
/**
 * SecretLock http repository.
 *
 * @since 1.0
 */
export declare class SecretLockHttp extends Http implements SecretLockRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    getSecretLock(compositeHash: string): Observable<SecretLockInfo>;
    getSecretLockMerkle(compositeHash: string): Observable<MerkleStateInfo>;
    /**
     * Gets an array of SecretLockInfo.
     * @param criteria - SecretLock search criteria
     * @returns Observable<Page<SecretLockInfo>>
     */
    search(criteria: SecretLockSearchCriteria): Observable<Page<SecretLockInfo>>;
    streamer(): SecretLockPaginationStreamer;
}
