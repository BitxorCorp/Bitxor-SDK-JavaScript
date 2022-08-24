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
exports.SecretLockHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const utils_1 = require("../core/utils");
const model_1 = require("../model");
const lock_1 = require("../model/lock");
const token_1 = require("../model/token");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * SecretLock http repository.
 *
 * @since 1.0
 */
class SecretLockHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.secretLockRoutesApi = new bitxor_openapi_typescript_fetch_client_1.SecretLockRoutesApi(this.config());
    }
    getSecretLock(compositeHash) {
        return this.call(this.secretLockRoutesApi.getSecretLock(compositeHash), (body) => this.toSecretLockInfo(body));
    }
    getSecretLockMerkle(compositeHash) {
        return this.call(this.secretLockRoutesApi.getSecretLockMerkle(compositeHash), utils_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Gets an array of SecretLockInfo.
     * @param criteria - SecretLock search criteria
     * @returns Observable<Page<SecretLockInfo>>
     */
    search(criteria) {
        var _a;
        return this.call(this.secretLockRoutesApi.searchSecretLock((_a = criteria.address) === null || _a === void 0 ? void 0 : _a.plain(), criteria.secret, criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, this.toSecretLockInfo));
    }
    streamer() {
        return new paginationStreamer_1.SecretLockPaginationStreamer(this);
    }
    /**
     * This method maps a SecretLockInfoDTO from rest to the SDK's SecretLockInfo model object.
     *
     * @internal
     * @param {SecretLockInfoDTO} dto SecretLockInfoDTO the dto object from rest.
     * @returns SecretLockInfo model
     */
    toSecretLockInfo(dto) {
        return new lock_1.SecretLockInfo(dto.lock.version || 1, dto.id, utils_1.DtoMapping.toAddress(dto.lock.ownerAddress), new token_1.TokenId(dto.lock.tokenId), model_1.UInt64.fromNumericString(dto.lock.amount), model_1.UInt64.fromNumericString(dto.lock.endHeight), dto.lock.status.valueOf(), dto.lock.hashAlgorithm.valueOf(), dto.lock.secret, utils_1.DtoMapping.toAddress(dto.lock.recipientAddress), dto.lock.compositeHash);
    }
}
exports.SecretLockHttp = SecretLockHttp;
//# sourceMappingURL=SecretLockHttp.js.map