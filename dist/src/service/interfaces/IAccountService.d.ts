import { Observable } from 'rxjs';
import { AccountInfoResolvedToken } from '../../model/account/AccountInfoResolvedToken';
import { Address } from '../../model/account/Address';
import { NamespaceInfoWithName } from '../../model/namespace/NamespaceInfoWithName';
/**
 * Block Service Interface
 */
export interface IAccountService {
    /**
     * Get account info with resolved token
     * @param addresses Array of addresses
     */
    accountInfoWithResolvedToken(addresses: Address[]): Observable<AccountInfoResolvedToken[]>;
    /**
     * Get namespace info for account with namespace name
     * @param address Namespace owner address
     * @returns {Observable<NamespaceInfoWithName[]>}
     */
    accountNamespacesWithName(addresses: Address): Observable<NamespaceInfoWithName[]>;
}
