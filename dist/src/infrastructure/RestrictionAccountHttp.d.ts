import { Observable } from 'rxjs';
import { Address } from '../model/account';
import { MerkleStateInfo } from '../model/blockchain';
import { AccountRestrictions } from '../model/restriction';
import { Http } from './Http';
import { Page } from './Page';
import { RestrictionAccountPaginationStreamer } from './paginationStreamer';
import { RestrictionAccountRepository } from './RestrictionAccountRepository';
import { RestrictionAccountSearchCriteria } from './searchCriteria/RestrictionAccountSearchCriteria';
/**
 * RestrictionAccount http repository.
 *
 * @since 1.0
 */
export declare class RestrictionAccountHttp extends Http implements RestrictionAccountRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Get Account restrictions.
     * @param address the address
     * @returns Observable<AccountRestrictions[]>
     */
    getAccountRestrictions(address: Address): Observable<AccountRestrictions>;
    /**
     * Get Account restrictions merkle.
     * @param address the address
     * @returns Observable<MerkleStateInfo>
     */
    getAccountRestrictionsMerkle(address: Address): Observable<MerkleStateInfo>;
    /**
     * Returns a token restrictions page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenRestriction}
     */
    search(criteria: RestrictionAccountSearchCriteria): Observable<Page<AccountRestrictions>>;
    streamer(): RestrictionAccountPaginationStreamer;
}
