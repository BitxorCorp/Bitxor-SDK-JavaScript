import { Observable } from 'rxjs';
import { RepositoryFactory } from '../infrastructure/RepositoryFactory';
import { AccountInfoResolvedToken } from '../model/account/AccountInfoResolvedToken';
import { Address } from '../model/account/Address';
import { NamespaceInfoWithName } from '../model/namespace/NamespaceInfoWithName';
import { IAccountService } from './interfaces/IAccountService';
/**
 * Account Service
 */
export declare class AccountService implements IAccountService {
    readonly repositoryFactory: RepositoryFactory;
    private readonly accountRepository;
    private readonly namespaceRepository;
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory: RepositoryFactory);
    /**
     * Get account info with resolved token
     * @param addresses Array of addresses
     */
    accountInfoWithResolvedToken(addresses: Address[]): Observable<AccountInfoResolvedToken[]>;
    /**
     * Get namespace info for account with namespace name
     * @param addresses Namespace owner address
     * @returns {Observable<NamespaceInfoWithName[]>}
     */
    accountNamespacesWithName(address: Address): Observable<NamespaceInfoWithName[]>;
    /**
     * Resolve tokens provided namespace names
     * @param tokens unresolved tokens
     * @param names the known namespace alises.
     * @return {ResolvedToken[]}
     */
    private resolveTokens;
    /**
     * Get distinct list of namespaces ids from list of account infos
     * @param accountInfos List of account infos
     * @returns {NamespaceId[]}
     */
    private getDistinctNamespaceIdFromAccountInfos;
}
