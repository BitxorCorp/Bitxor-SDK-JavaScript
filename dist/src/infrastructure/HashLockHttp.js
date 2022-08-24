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
exports.HashLockHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const HashLockInfo_1 = require("../model/lock/HashLockInfo");
const TokenId_1 = require("../model/token/TokenId");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Hashlock http repository.
 *
 * @since 1.0
 */
class HashLockHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.hashLockRoutesApi = new bitxor_openapi_typescript_fetch_client_1.HashLockRoutesApi(this.config());
    }
    /**
     * Get hash lock info for an account.
     * @param hash Hashlock hash
     * @returns Observable<HashLockInfo>
     */
    getHashLock(hash) {
        return this.call(this.hashLockRoutesApi.getHashLock(hash), (body) => this.toHashLockInfo(body));
    }
    /**
     * Get secret lock merkle info of the given id.
     * @param hash HashLockInfo hash id
     * @returns Observable<MerkleStateInfo>
     */
    getHashLockMerkle(hash) {
        return this.call(this.hashLockRoutesApi.getHashLockMerkle(hash), DtoMapping_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Gets an array of HashLockInfo.
     * @param criteria - HashLock search criteria
     * @returns Observable<Page<HashLockInfo>>
     */
    search(criteria) {
        var _a;
        return this.call(this.hashLockRoutesApi.searchHashLock((_a = criteria.address) === null || _a === void 0 ? void 0 : _a.plain(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, this.toHashLockInfo));
    }
    streamer() {
        return new paginationStreamer_1.HashLockPaginationStreamer(this);
    }
    /**
     * This method maps a HashLockInfoDTO from rest to the SDK's HashLockInfo model object.
     *
     * @internal
     * @param {HashLockInfoDTO} dto HashLockInfoDTO the dto object from rest.
     * @returns HashLockInfo model
     */
    toHashLockInfo(dto) {
        return new HashLockInfo_1.HashLockInfo(dto.lock.version || 1, dto.id, DtoMapping_1.DtoMapping.toAddress(dto.lock.ownerAddress), new TokenId_1.TokenId(dto.lock.tokenId), UInt64_1.UInt64.fromNumericString(dto.lock.amount), UInt64_1.UInt64.fromNumericString(dto.lock.endHeight), dto.lock.status.valueOf(), dto.lock.hash);
    }
}
exports.HashLockHttp = HashLockHttp;
//# sourceMappingURL=HashLockHttp.js.map