"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceHttp = void 0;
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
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const operators_1 = require("rxjs/operators");
const format_1 = require("../core/format");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const AccountNames_1 = require("../model/account/AccountNames");
const Address_1 = require("../model/account/Address");
const AddressAlias_1 = require("../model/namespace/AddressAlias");
const AliasType_1 = require("../model/namespace/AliasType");
const EmptyAlias_1 = require("../model/namespace/EmptyAlias");
const NamespaceId_1 = require("../model/namespace/NamespaceId");
const NamespaceInfo_1 = require("../model/namespace/NamespaceInfo");
const NamespaceName_1 = require("../model/namespace/NamespaceName");
const TokenAlias_1 = require("../model/namespace/TokenAlias");
const TokenId_1 = require("../model/token/TokenId");
const TokenNames_1 = require("../model/token/TokenNames");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Namespace http repository.
 *
 * @since 1.0
 */
class NamespaceHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param networkType the network type.
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, networkType, fetchApi) {
        super(url, fetchApi);
        this.namespaceRoutesApi = new bitxor_openapi_typescript_fetch_client_1.NamespaceRoutesApi(this.config());
        this.networkTypeObservable = this.createNetworkTypeObservable(networkType);
    }
    /**
     * Returns friendly names for array of addresses.
     * @summary Get readable names for a set of array of addresses
     * @param addresses - Array of addresses
     */
    getAccountsNames(addresses) {
        const accountIdsBody = {
            addresses: addresses.map((address) => address.plain()),
        };
        return this.call(this.namespaceRoutesApi.getAccountsNames(accountIdsBody), (body) => body.accountNames.map((accountName) => new AccountNames_1.AccountNames(DtoMapping_1.DtoMapping.toAddress(accountName.address), accountName.names.map((name) => {
            return new NamespaceName_1.NamespaceName(new NamespaceId_1.NamespaceId(name), name);
        }))));
    }
    /**
     * Get readable names for a set of tokens
     * Returns friendly names for tokens.
     * @param tokenIds - Array of token ids
     * @return Observable<TokenNames[]>
     */
    getTokensNames(tokenIds) {
        const tokenIdsBody = {
            tokenIds: tokenIds.map((id) => id.toHex()),
        };
        return this.call(this.namespaceRoutesApi.getTokensNames(tokenIdsBody), (body) => body.tokenNames.map((token) => new TokenNames_1.TokenNames(new TokenId_1.TokenId(token.tokenId), token.names.map((name) => {
            return new NamespaceName_1.NamespaceName(new NamespaceId_1.NamespaceId(name), name);
        }))));
    }
    /**
     * Gets the NamespaceInfo for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<NamespaceInfo>
     */
    getNamespace(namespaceId) {
        return this.call(this.namespaceRoutesApi.getNamespace(namespaceId.toHex()), (body) => this.toNamespaceInfo(body));
    }
    /**
     * Gets a NamespaceInfo merkle for a given namespaceId
     * @param namespaceId - Namespace id
     * @returns Observable<MerkleStateInfo>
     */
    getNamespaceMerkle(namespaceId) {
        return this.call(this.namespaceRoutesApi.getNamespaceMerkle(namespaceId.toHex()), DtoMapping_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Gets array of NamespaceName for different namespaceIds
     * @param namespaceIds - Array of namespace ids
     * @returns Observable<NamespaceName[]>
     */
    getNamespacesNames(namespaceIds) {
        const namespaceIdsBody = {
            namespaceIds: namespaceIds.map((id) => id.toHex()),
        };
        return this.call(this.namespaceRoutesApi.getNamespacesNames(namespaceIdsBody), (body) => body.map((namespaceNameDTO) => {
            return new NamespaceName_1.NamespaceName(NamespaceId_1.NamespaceId.createFromEncoded(namespaceNameDTO.id), namespaceNameDTO.name, namespaceNameDTO.parentId ? NamespaceId_1.NamespaceId.createFromEncoded(namespaceNameDTO.parentId) : undefined);
        }));
    }
    /**
     * Gets an array of namespaces.
     * @param criteria - Namespace search criteria
     * @returns Observable<Page<NamespaceInfo>>
     */
    search(criteria) {
        var _a, _b, _c, _d;
        return this.call(this.namespaceRoutesApi.searchNamespaces((_a = criteria.ownerAddress) === null || _a === void 0 ? void 0 : _a.plain(), (_b = criteria.registrationType) === null || _b === void 0 ? void 0 : _b.valueOf(), (_c = criteria.level0) === null || _c === void 0 ? void 0 : _c.toHex(), (_d = criteria.aliasType) === null || _d === void 0 ? void 0 : _d.valueOf(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, this.toNamespaceInfo));
    }
    streamer() {
        return new paginationStreamer_1.NamespacePaginationStreamer(this);
    }
    /**
     * Gets the TokenId from a TokenAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<TokenId | null>
     */
    getLinkedTokenId(namespaceId) {
        return this.networkTypeObservable.pipe((0, operators_1.mergeMap)(() => this.call(this.namespaceRoutesApi.getNamespace(namespaceId.toHex()), (body) => {
            const namespaceInfoDTO = body;
            if (namespaceInfoDTO.namespace === undefined) {
                // forward bitxorcore-rest error
                throw namespaceInfoDTO;
            }
            if (namespaceInfoDTO.namespace.alias.type.valueOf() === AliasType_1.AliasType.None ||
                namespaceInfoDTO.namespace.alias.type.valueOf() !== AliasType_1.AliasType.Token ||
                !namespaceInfoDTO.namespace.alias.tokenId) {
                throw new Error(`No tokenId is linked to namespace '${namespaceInfoDTO.namespace.level0}'`);
            }
            return new TokenId_1.TokenId(namespaceInfoDTO.namespace.alias.tokenId);
        })));
    }
    /**
     * Gets the Address from a AddressAlias
     * @param namespaceId - the namespaceId of the namespace
     * @returns Observable<Address>
     */
    getLinkedAddress(namespaceId) {
        return this.networkTypeObservable.pipe((0, operators_1.mergeMap)(() => this.call(this.namespaceRoutesApi.getNamespace(namespaceId.toHex()), (body) => {
            const namespaceInfoDTO = body;
            if (namespaceInfoDTO.namespace === undefined) {
                // forward bitxorcore-rest error
                throw namespaceInfoDTO;
            }
            if (namespaceInfoDTO.namespace.alias.type.valueOf() === AliasType_1.AliasType.None ||
                namespaceInfoDTO.namespace.alias.type.valueOf() !== AliasType_1.AliasType.Address ||
                !namespaceInfoDTO.namespace.alias.address) {
                throw new Error(`No address is linked to namespace '${namespaceInfoDTO.namespace.level0}'`);
            }
            const addressDecoded = namespaceInfoDTO.namespace.alias.address;
            const address = format_1.RawAddress.addressToString(format_1.Convert.hexToUint8(addressDecoded));
            return Address_1.Address.createFromRawAddress(address);
        })));
    }
    /**
     * Get rest url
     */
    getUrl() {
        return this.url;
    }
    /**
     * It maps from a NamespaceInfoDTO to NamespaceInfo
     * @param dto the dto
     */
    toNamespaceInfo(dto) {
        return new NamespaceInfo_1.NamespaceInfo(dto.namespace.version || 1, dto.meta.active, dto.meta.index, dto.id, dto.namespace.registrationType, dto.namespace.depth, NamespaceHttp.extractLevels(dto.namespace), NamespaceId_1.NamespaceId.createFromEncoded(dto.namespace.parentId), DtoMapping_1.DtoMapping.toAddress(dto.namespace.ownerAddress), UInt64_1.UInt64.fromNumericString(dto.namespace.startHeight), UInt64_1.UInt64.fromNumericString(dto.namespace.endHeight), NamespaceHttp.extractAlias(dto.namespace));
    }
    /**
     * Extract the namespace levels
     *
     * @internal
     * @param namespace
     */
    static extractLevels(namespace) {
        const result = [];
        if (namespace.level0) {
            result.push(NamespaceId_1.NamespaceId.createFromEncoded(namespace.level0));
        }
        if (namespace.level1) {
            result.push(NamespaceId_1.NamespaceId.createFromEncoded(namespace.level1));
        }
        if (namespace.level2) {
            result.push(NamespaceId_1.NamespaceId.createFromEncoded(namespace.level2));
        }
        return result;
    }
    /**
     * Extract the alias from a namespace
     *
     * @internal
     * @param namespace
     */
    static extractAlias(namespace) {
        if (namespace.alias && namespace.alias.type.valueOf() === AliasType_1.AliasType.Token) {
            return new TokenAlias_1.TokenAlias(new TokenId_1.TokenId(namespace.alias.tokenId));
        }
        else if (namespace.alias && namespace.alias.type.valueOf() === AliasType_1.AliasType.Address) {
            return new AddressAlias_1.AddressAlias(DtoMapping_1.DtoMapping.toAddress(namespace.alias.address));
        }
        return new EmptyAlias_1.EmptyAlias();
    }
}
exports.NamespaceHttp = NamespaceHttp;
//# sourceMappingURL=NamespaceHttp.js.map