import { Observable } from 'rxjs';
import { AccountNames } from '../model/account/AccountNames';
import { Address } from '../model/account/Address';
import { MerkleStateInfo } from '../model/blockchain';
import { NamespaceId } from '../model/namespace/NamespaceId';
import { NamespaceInfo } from '../model/namespace/NamespaceInfo';
import { NamespaceName } from '../model/namespace/NamespaceName';
import { NetworkType } from '../model/network/NetworkType';
import { TokenId } from '../model/token/TokenId';
import { TokenNames } from '../model/token/TokenNames';
import { Http } from './Http';
import { NamespaceRepository } from './NamespaceRepository';
import { Page } from './Page';
import { NamespacePaginationStreamer } from './paginationStreamer';
import { NamespaceSearchCriteria } from './searchCriteria/NamespaceSearchCriteria';
/**
 * Namespace http repository.
 *
 * @since 1.0
 */
export declare class NamespaceHttp extends Http implements NamespaceRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param networkType the network type.
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, networkType?: NetworkType | Observable<NetworkType>, fetchApi?: any);
    /**
     * Returns friendly names for array of addresses.
     * @summary Get readable names for a set of array of addresses
     * @param addresses - Array of addresses
     */
    getAccountsNames(addresses: Address[]): Observable<AccountNames[]>;
    /**
     * Get readable names for a set of tokens
     * Returns friendly names for tokens.
     * @param tokenIds - Array of token ids
     * @return Observable<TokenNames[]>
     */
    getTokensNames(tokenIds: TokenId[]): Observable<TokenNames[]>;
    /**
     * Gets the NamespaceInfo for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<NamespaceInfo>
     */
    getNamespace(namespaceId: NamespaceId): Observable<NamespaceInfo>;
    /**
     * Gets a NamespaceInfo merkle for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<MerkleStateInfo>
     */
    getNamespaceMerkle(namespaceId: NamespaceId): Observable<MerkleStateInfo>;
    /**
     * Gets array of NamespaceName for different namespaceIds
     * @param namespaceIds - Array of namespace ids
     * @returns Observable<NamespaceName[]>
     */
    getNamespacesNames(namespaceIds: NamespaceId[]): Observable<NamespaceName[]>;
    /**
     * Gets an array of namespaces.
     * @param criteria - Namespace search criteria
     * @returns Observable<Page<NamespaceInfo>>
     */
    search(criteria: NamespaceSearchCriteria): Observable<Page<NamespaceInfo>>;
    streamer(): NamespacePaginationStreamer;
    /**
     * Gets the TokenId from a TokenAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<TokenId | null>
     */
    getLinkedTokenId(namespaceId: NamespaceId): Observable<TokenId>;
    /**
     * Gets the Address from a AddressAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<Address>
     */
    getLinkedAddress(namespaceId: NamespaceId): Observable<Address>;
    /**
     * Get rest url
     */
    getUrl(): string;
    /**
     * It maps from a NamespaceInfoDTO to NamespaceInfo
     * @param dto the dto
     */
    private toNamespaceInfo;
}
