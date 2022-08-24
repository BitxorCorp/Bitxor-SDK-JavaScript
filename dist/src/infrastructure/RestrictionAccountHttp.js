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
exports.RestrictionAccountHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const utils_1 = require("../core/utils");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * RestrictionAccount http repository.
 *
 * @since 1.0
 */
class RestrictionAccountHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.restrictionAccountRoutesApi = new bitxor_openapi_typescript_fetch_client_1.RestrictionAccountRoutesApi(this.config());
    }
    /**
     * Get Account restrictions.
     * @param address the address
     * @returns Observable<AccountRestrictions[]>
     */
    getAccountRestrictions(address) {
        return this.call(this.restrictionAccountRoutesApi.getAccountRestrictions(address.plain()), utils_1.DtoMapping.extractAccountRestrictionFromDto);
    }
    /**
     * Get Account restrictions merkle.
     * @param address the address
     * @returns Observable<MerkleStateInfo>
     */
    getAccountRestrictionsMerkle(address) {
        return this.call(this.restrictionAccountRoutesApi.getAccountRestrictionsMerkle(address.plain()), utils_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Returns a token restrictions page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenRestriction}
     */
    search(criteria) {
        var _a;
        return this.call(this.restrictionAccountRoutesApi.searchAccountRestrictions((_a = criteria.address) === null || _a === void 0 ? void 0 : _a.plain(), criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, utils_1.DtoMapping.extractAccountRestrictionFromDto));
    }
    streamer() {
        return new paginationStreamer_1.RestrictionAccountPaginationStreamer(this);
    }
}
exports.RestrictionAccountHttp = RestrictionAccountHttp;
//# sourceMappingURL=RestrictionAccountHttp.js.map