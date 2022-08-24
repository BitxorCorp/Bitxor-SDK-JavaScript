import { Observable } from 'rxjs';
import { Address } from '../model/account';
import { MerkleStateInfo } from '../model/blockchain';
import { AccountRestrictions } from '../model/restriction';
import { SearcherRepository } from './paginationStreamer';
import { RestrictionAccountSearchCriteria } from './searchCriteria';
export interface RestrictionAccountRepository extends SearcherRepository<AccountRestrictions, RestrictionAccountSearchCriteria> {
    /**
     * Gets Account restrictions.
     * @param address the address
     * @returns Observable<AccountRestrictions>
     */
    getAccountRestrictions(address: Address): Observable<AccountRestrictions>;
    /**
     * Gets Account restrictions merkle .
     * @param address the account address.
     * @returns Observable<MerkleStateInfo>
     */
    getAccountRestrictionsMerkle(address: Address): Observable<MerkleStateInfo>;
}
