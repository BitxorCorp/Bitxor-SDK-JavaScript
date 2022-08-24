import { Observable } from 'rxjs';
import { AccountInfo, Address } from '../model/account';
import { MerkleStateInfo } from '../model/blockchain';
import { SearcherRepository } from './paginationStreamer';
import { AccountSearchCriteria } from './searchCriteria';
/**
 * Account interface repository.
 *
 * @since 1.0
 */
export interface AccountRepository extends SearcherRepository<AccountInfo, AccountSearchCriteria> {
    /**
     * Gets an AccountInfo for an account.
     * @param address Address
     * @returns Observable<AccountInfo>
     */
    getAccountInfo(address: Address): Observable<AccountInfo>;
    /**
     * Gets AccountsInfo for different accounts.
     * @param addresses List of Address
     * @returns Observable<AccountInfo[]>
     */
    getAccountsInfo(addresses: Address[]): Observable<AccountInfo[]>;
    /**
     * Gets an account infro merkle for an account.
     * @param address Address
     * @returns Observable<MerkleStateInfo>
     */
    getAccountInfoMerkle(address: Address): Observable<MerkleStateInfo>;
}
