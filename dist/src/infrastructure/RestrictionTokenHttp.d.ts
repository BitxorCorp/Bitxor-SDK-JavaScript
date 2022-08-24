import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model';
import { TokenRestriction } from '../model/restriction/TokenRestriction';
import { Http } from './Http';
import { Page } from './Page';
import { RestrictionTokenPaginationStreamer } from './paginationStreamer';
import { RestrictionTokenRepository } from './RestrictionTokenRepository';
import { RestrictionTokenSearchCriteria } from './searchCriteria';
/**
 * RestrictionToken http repository.
 *
 * @since 1.0
 */
export declare class RestrictionTokenHttp extends Http implements RestrictionTokenRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Returns a token restrictions page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenRestriction}
     */
    search(criteria: RestrictionTokenSearchCriteria): Observable<Page<TokenRestriction>>;
    streamer(): RestrictionTokenPaginationStreamer;
    private static toTokenGlobalRestrictionItem;
    private static toTokenAddressRestrictionItem;
    getTokenRestrictions(compositeHash: string): Observable<TokenRestriction>;
    getTokenRestrictionsMerkle(compositeHash: string): Observable<MerkleStateInfo>;
}
