/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Observable } from 'rxjs';
import { AccountNames, Address } from '../model/account';
import { MerkleStateInfo } from '../model/blockchain';
import { NamespaceId, NamespaceInfo, NamespaceName } from '../model/namespace';
import { TokenId, TokenNames } from '../model/token';
import { SearcherRepository } from './paginationStreamer';
import { NamespaceSearchCriteria } from './searchCriteria';

/**
 * Namespace interface repository.
 *
 * @since 1.0
 */
export interface NamespaceRepository extends SearcherRepository<NamespaceInfo, NamespaceSearchCriteria> {
    /**
     * Get readable names for a set of accountIds.
     * Returns friendly names for accounts.
     * @param accountIds List of Address - * Address can be created rawAddress or publicKey
     * @return Observable<AccountNames>
     */
    getAccountsNames(accountIds: Address[]): Observable<AccountNames[]>;

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
     * Gets the TokenId from a TokenAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<TokenId | null>
     */
    getLinkedTokenId(namespaceId: NamespaceId): Observable<TokenId | null>;

    /**
     * Gets the Address from a AddressAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returnsObservable<Address | null>
     */
    getLinkedAddress(namespaceId: NamespaceId): Observable<Address | null>;

    /**
     * Get rest url from parent class.
     */
    getUrl(): string;
}
