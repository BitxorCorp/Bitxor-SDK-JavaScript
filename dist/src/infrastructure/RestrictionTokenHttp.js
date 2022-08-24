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
exports.RestrictionTokenHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const utils_1 = require("../core/utils");
const model_1 = require("../model");
const restriction_1 = require("../model/restriction");
const token_1 = require("../model/token");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * RestrictionToken http repository.
 *
 * @since 1.0
 */
class RestrictionTokenHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.restrictionTokenRoutesApi = new bitxor_openapi_typescript_fetch_client_1.RestrictionTokenRoutesApi(this.config());
    }
    /**
     * Returns a token restrictions page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenRestriction}
     */
    search(criteria) {
        var _a, _b, _c;
        return this.call(this.restrictionTokenRoutesApi.searchTokenRestrictions((_a = criteria.tokenId) === null || _a === void 0 ? void 0 : _a.toHex(), (_b = criteria.entryType) === null || _b === void 0 ? void 0 : _b.valueOf(), (_c = criteria.targetAddress) === null || _c === void 0 ? void 0 : _c.plain(), criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, (r) => RestrictionTokenHttp.toTokenRestriction(r)));
    }
    streamer() {
        return new paginationStreamer_1.RestrictionTokenPaginationStreamer(this);
    }
    /**
     * This method maps a token restriction dto from rest to the SDK's model object.
     *
     * @internal
     * @param {TokenAddressRestrictionDTO | TokenGlobalRestrictionDTO} dto the restriction object from rest.
     * @returns {TokenRestriction} a restriction model
     */
    static toTokenRestriction(dto) {
        if (dto.tokenRestrictionEntry.targetAddress) {
            const addressRestrictionDto = dto;
            return new restriction_1.TokenAddressRestriction(dto.tokenRestrictionEntry.version || 1, dto.tokenRestrictionEntry.compositeHash, dto.tokenRestrictionEntry.entryType.valueOf(), new token_1.TokenId(dto.tokenRestrictionEntry.tokenId), utils_1.DtoMapping.toAddress(addressRestrictionDto.tokenRestrictionEntry.targetAddress), addressRestrictionDto.tokenRestrictionEntry.restrictions.map(RestrictionTokenHttp.toTokenAddressRestrictionItem));
        }
        const globalRestrictionDto = dto;
        return new restriction_1.TokenGlobalRestriction(dto.tokenRestrictionEntry.version || 1, dto.tokenRestrictionEntry.compositeHash, dto.tokenRestrictionEntry.entryType.valueOf(), new token_1.TokenId(dto.tokenRestrictionEntry.tokenId), globalRestrictionDto.tokenRestrictionEntry.restrictions.map((i) => RestrictionTokenHttp.toTokenGlobalRestrictionItem(i)));
    }
    static toTokenGlobalRestrictionItem(restriction) {
        return new restriction_1.TokenGlobalRestrictionItem(model_1.UInt64.fromNumericString(restriction.key), new token_1.TokenId(restriction.restriction.referenceTokenId), model_1.UInt64.fromNumericString(restriction.restriction.restrictionValue), restriction.restriction.restrictionType.valueOf());
    }
    static toTokenAddressRestrictionItem(restriction) {
        return new restriction_1.TokenAddressRestrictionItem(model_1.UInt64.fromNumericString(restriction.key), model_1.UInt64.fromNumericString(restriction.value));
    }
    getTokenRestrictions(compositeHash) {
        return this.call(this.restrictionTokenRoutesApi.getTokenRestrictions(compositeHash), RestrictionTokenHttp.toTokenRestriction);
    }
    getTokenRestrictionsMerkle(compositeHash) {
        return this.call(this.restrictionTokenRoutesApi.getTokenRestrictionsMerkle(compositeHash), utils_1.DtoMapping.toMerkleStateInfo);
    }
}
exports.RestrictionTokenHttp = RestrictionTokenHttp;
//# sourceMappingURL=RestrictionTokenHttp.js.map