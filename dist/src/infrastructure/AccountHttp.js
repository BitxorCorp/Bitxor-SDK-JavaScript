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
exports.AccountHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const utils_1 = require("../core/utils");
const model_1 = require("../model");
const account_1 = require("../model/account");
const token_1 = require("../model/token");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Account http repository.
 *
 * @since 1.0
 */
class AccountHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.accountRoutesApi = new bitxor_openapi_typescript_fetch_client_1.AccountRoutesApi(this.config());
    }
    /**
     * Gets an AccountInfo for an account.
     * @param address Address
     * @returns Observable<AccountInfo>
     */
    getAccountInfo(address) {
        return this.call(this.accountRoutesApi.getAccountInfo(address.plain()), AccountHttp.toAccountInfo);
    }
    /**
     * Gets AccountsInfo for different accounts.
     * @param addresses List of Address
     * @returns Observable<AccountInfo[]>
     */
    getAccountsInfo(addresses) {
        const accountIds = {
            addresses: addresses.map((address) => address.plain()),
        };
        return this.call(this.accountRoutesApi.getAccountsInfo(accountIds), (body) => body.map(AccountHttp.toAccountInfo));
    }
    /**
     * Gets an array of accounts.
     * @param criteria - Account search criteria
     * @returns Observable<Page<AccountInfo>>
     */
    search(criteria) {
        var _a;
        return this.call(this.accountRoutesApi.searchAccounts(criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order), utils_1.DtoMapping.mapEnum(criteria.orderBy), (_a = criteria.tokenId) === null || _a === void 0 ? void 0 : _a.toHex()), (body) => super.toPage(body.pagination, body.data, AccountHttp.toAccountInfo));
    }
    streamer() {
        return new paginationStreamer_1.AccountPaginationStreamer(this);
    }
    /**
     * Returns the merkle information of the given account.
     *
     * @param address the address
     */
    getAccountInfoMerkle(address) {
        return this.call(this.accountRoutesApi.getAccountInfoMerkle(address.plain()), utils_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * This method maps a AccountInfoDTO from rest to the SDK's AccountInfo model object.
     *
     * @internal
     * @param {AccountInfoDTO} dto AccountInfoDTO the dto object from rest.
     * @returns AccountInfo model
     */
    static toAccountInfo(dto) {
        var _a, _b, _c, _d;
        return new account_1.AccountInfo(dto.account.version || 1, dto.id, utils_1.DtoMapping.toAddress(dto.account.address), model_1.UInt64.fromNumericString(dto.account.addressHeight), dto.account.publicKey, model_1.UInt64.fromNumericString(dto.account.publicKeyHeight), dto.account.accountType.valueOf(), new account_1.SupplementalPublicKeys(dto.account.supplementalPublicKeys.linked
            ? new account_1.AccountLinkPublicKey((_a = dto.account.supplementalPublicKeys.linked) === null || _a === void 0 ? void 0 : _a.publicKey)
            : undefined, dto.account.supplementalPublicKeys.node
            ? new account_1.AccountLinkPublicKey((_b = dto.account.supplementalPublicKeys.node) === null || _b === void 0 ? void 0 : _b.publicKey)
            : undefined, dto.account.supplementalPublicKeys.vrf
            ? new account_1.AccountLinkPublicKey((_c = dto.account.supplementalPublicKeys.vrf) === null || _c === void 0 ? void 0 : _c.publicKey)
            : undefined, dto.account.supplementalPublicKeys.voting
            ? (_d = dto.account.supplementalPublicKeys.voting) === null || _d === void 0 ? void 0 : _d.publicKeys.map((v) => new account_1.AccountLinkVotingKey(v.publicKey, v.startEpoch, v.endEpoch))
            : undefined), dto.account.activityBuckets.map((bucket) => {
            return new account_1.ActivityBucket(model_1.UInt64.fromNumericString(bucket.startHeight), model_1.UInt64.fromNumericString(bucket.totalFeesPaid), bucket.beneficiaryCount, model_1.UInt64.fromNumericString(bucket.rawScore));
        }), dto.account.tokens.map((tokenDTO) => new token_1.Token(new token_1.TokenId(tokenDTO.id), model_1.UInt64.fromNumericString(tokenDTO.amount))), model_1.UInt64.fromNumericString(dto.account.importance), model_1.UInt64.fromNumericString(dto.account.importanceHeight));
    }
}
exports.AccountHttp = AccountHttp;
//# sourceMappingURL=AccountHttp.js.map