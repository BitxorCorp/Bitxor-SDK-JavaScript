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
exports.TokenHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const operators_1 = require("rxjs/operators");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const TokenFlags_1 = require("../model/token/TokenFlags");
const TokenId_1 = require("../model/token/TokenId");
const TokenInfo_1 = require("../model/token/TokenInfo");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Token http repository.
 *
 * @since 1.0
 */
class TokenHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param networkType the network type.
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, networkType, fetchApi) {
        super(url, fetchApi);
        this.tokenRoutesApi = new bitxor_openapi_typescript_fetch_client_1.TokenRoutesApi(this.config());
        this.networkTypeObservable = this.createNetworkTypeObservable(networkType);
    }
    /**
     * Gets the TokenInfo for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<TokenInfo>
     */
    getToken(tokenId) {
        return this.call(this.tokenRoutesApi.getToken(tokenId.toHex()), (body) => TokenHttp.toTokenInfo(body));
    }
    /**
     * Gets TokenInfo for different tokenIds.
     * @param tokenIds - Array of token ids
     * @returns Observable<TokenInfo[]>
     */
    getTokens(tokenIds) {
        return this.call(this.tokenRoutesApi.getTokens({
            tokenIds: tokenIds.map((id) => id.toHex()),
        }), (body) => body.map((b) => TokenHttp.toTokenInfo(b)));
    }
    /**
     * Gets a TokenInfo merkle for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<MerkleStateInfo>
     */
    getTokenMerkle(tokenId) {
        return this.call(this.tokenRoutesApi.getTokenMerkle(tokenId.toHex()), DtoMapping_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Gets an array of tokens.
     * @summary Get tokens created for given address
     * @param criteria Token search criteria
     * @returns {Page<TokenInfo>}
     */
    search(criteria) {
        return this.networkTypeObservable.pipe((0, operators_1.mergeMap)((networkType) => {
            var _a;
            return this.call(this.tokenRoutesApi.searchTokens((_a = criteria.ownerAddress) === null || _a === void 0 ? void 0 : _a.plain(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, TokenHttp.toTokenInfo, networkType));
        }));
    }
    streamer() {
        return new paginationStreamer_1.TokenPaginationStreamer(this);
    }
    /**
     * Maps TokenInfoDTO to TokenInfo
     *
     * @param tokenInfo the dto object.
     * @returns the model object
     */
    static toTokenInfo(tokenInfo) {
        return new TokenInfo_1.TokenInfo(tokenInfo.token.version || 1, tokenInfo.id, new TokenId_1.TokenId(tokenInfo.token.id), UInt64_1.UInt64.fromNumericString(tokenInfo.token.supply), UInt64_1.UInt64.fromNumericString(tokenInfo.token.startHeight), DtoMapping_1.DtoMapping.toAddress(tokenInfo.token.ownerAddress), tokenInfo.token.revision, new TokenFlags_1.TokenFlags(tokenInfo.token.flags), tokenInfo.token.divisibility, UInt64_1.UInt64.fromNumericString(tokenInfo.token.duration));
    }
}
exports.TokenHttp = TokenHttp;
//# sourceMappingURL=TokenHttp.js.map