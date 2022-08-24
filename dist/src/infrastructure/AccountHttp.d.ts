import { Observable } from 'rxjs';
import { AccountInfo, Address } from '../model/account';
import { MerkleStateInfo } from '../model/blockchain';
import { AccountRepository } from './AccountRepository';
import { Http } from './Http';
import { Page } from './Page';
import { AccountPaginationStreamer } from './paginationStreamer';
import { AccountSearchCriteria } from './searchCriteria';
/**
 * Account http repository.
 *
 * @since 1.0
 */
export declare class AccountHttp extends Http implements AccountRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
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
     * Gets an array of accounts.
     * @param criteria - Account search criteria
     * @returns Observable<Page<AccountInfo>>
     */
    search(criteria: AccountSearchCriteria): Observable<Page<AccountInfo>>;
    streamer(): AccountPaginationStreamer;
    /**
     * Returns the merkle information of the given account.
     *
     * @param address the address
     */
    getAccountInfoMerkle(address: Address): Observable<MerkleStateInfo>;
}
