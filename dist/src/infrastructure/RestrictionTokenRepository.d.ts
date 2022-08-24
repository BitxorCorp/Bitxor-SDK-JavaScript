import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { TokenRestriction } from '../model/restriction/TokenRestriction';
import { SearcherRepository } from './paginationStreamer';
import { RestrictionTokenSearchCriteria } from './searchCriteria';
export interface RestrictionTokenRepository extends SearcherRepository<TokenRestriction, RestrictionTokenSearchCriteria> {
    /**
     * Returns token restrictions by composite hash
     *
     * @param compositeHash the composite hash
     * @return Observable<TokenRestriction>
     */
    getTokenRestrictions(compositeHash: string): Observable<TokenRestriction>;
    /**
     * Returns token restrictions by composite hash
     *
     * @param compositeHash the composite hash
     * @return Observable<TokenRestriction>
     */
    getTokenRestrictionsMerkle(compositeHash: string): Observable<MerkleStateInfo>;
}
