"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const NamespacePaginationStreamer_1 = require("../infrastructure/paginationStreamer/NamespacePaginationStreamer");
/**
 * Account Service
 */
class AccountService {
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.accountRepository = repositoryFactory.createAccountRepository();
        this.namespaceRepository = repositoryFactory.createNamespaceRepository();
    }
    /**
     * Get account info with resolved token
     * @param addresses Array of addresses
     */
    accountInfoWithResolvedToken(addresses) {
        const accountInfoObservable = this.accountRepository.getAccountsInfo(addresses);
        const distinctNames = accountInfoObservable.pipe((0, operators_1.mergeMap)((info) => {
            const namespaceIds = this.getDistinctNamespaceIdFromAccountInfos(info);
            if (namespaceIds.length) {
                return this.namespaceRepository.getNamespacesNames(namespaceIds);
            }
            return (0, rxjs_1.of)([]);
        }));
        return accountInfoObservable.pipe((0, operators_1.withLatestFrom)(distinctNames), (0, operators_1.map)(([infos, names]) => {
            return infos.map((info) => {
                const resolved = this.resolveTokens(info.tokens, names);
                return DtoMapping_1.DtoMapping.assign(info, { resolvedTokens: resolved });
            });
        }));
    }
    /**
     * Get namespace info for account with namespace name
     * @param addresses Namespace owner address
     * @returns {Observable<NamespaceInfoWithName[]>}
     */
    accountNamespacesWithName(address) {
        const steatmer = new NamespacePaginationStreamer_1.NamespacePaginationStreamer(this.namespaceRepository).search({ ownerAddress: address }).pipe((0, operators_1.toArray)());
        return steatmer.pipe((0, operators_1.mergeMap)((infos) => {
            const namespaceIds = infos.map((i) => i.id);
            return this.namespaceRepository.getNamespacesNames(namespaceIds).pipe((0, operators_1.map)((resolved) => {
                return infos.map((info) => {
                    const name = resolved.find((r) => r.namespaceId.equals(info.id));
                    return DtoMapping_1.DtoMapping.assign(info, { namespaceName: name === null || name === void 0 ? void 0 : name.name });
                });
            }));
        }));
    }
    /**
     * Resolve tokens provided namespace names
     * @param tokens unresolved tokens
     * @param names the known namespace alises.
     * @return {ResolvedToken[]}
     */
    resolveTokens(tokens, names) {
        return tokens.map((token) => {
            if (!token.id.isNamespaceId()) {
                return token;
            }
            else {
                const name = names.find((f) => f.namespaceId.equals(token.id));
                if (name) {
                    return DtoMapping_1.DtoMapping.assign(token, { namespaceName: name });
                }
                else {
                    return token;
                }
            }
        });
    }
    /**
     * Get distinct list of namespaces ids from list of account infos
     * @param accountInfos List of account infos
     * @returns {NamespaceId[]}
     */
    getDistinctNamespaceIdFromAccountInfos(accountInfos) {
        const namespaceIds = [];
        accountInfos.forEach((info) => {
            info.tokens.forEach((token) => {
                if (token.id.isNamespaceId()) {
                    if (!namespaceIds.find((n) => n.equals(token.id))) {
                        namespaceIds.push(token.id);
                    }
                }
            });
        });
        return namespaceIds;
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=AccountService.js.map