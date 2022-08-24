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
exports.ReceiptHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const Http_1 = require("./Http");
const CreateReceiptFromDTO_1 = require("./receipt/CreateReceiptFromDTO");
/**
 * Receipt http repository.
 *
 * @since 1.0
 */
class ReceiptHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.receiptRoutesApi = new bitxor_openapi_typescript_fetch_client_1.ReceiptRoutesApi(this.config());
    }
    searchAddressResolutionStatements(criteria) {
        var _a;
        return this.call(this.receiptRoutesApi.searchAddressResolutionStatements((_a = criteria.height) === null || _a === void 0 ? void 0 : _a.toString(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, CreateReceiptFromDTO_1.createAddressResolutionStatement));
    }
    searchTokenResolutionStatements(criteria) {
        var _a;
        return this.call(this.receiptRoutesApi.searchTokenResolutionStatements((_a = criteria.height) === null || _a === void 0 ? void 0 : _a.toString(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, CreateReceiptFromDTO_1.createTokenResolutionStatement));
    }
    searchReceipts(criteria) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return this.call(this.receiptRoutesApi.searchReceipts((_a = criteria.height) === null || _a === void 0 ? void 0 : _a.toString(), (_b = criteria.fromHeight) === null || _b === void 0 ? void 0 : _b.toString(), (_c = criteria.toHeight) === null || _c === void 0 ? void 0 : _c.toString(), (_d = criteria.receiptTypes) === null || _d === void 0 ? void 0 : _d.map((t) => t.valueOf()), (_e = criteria.recipientAddress) === null || _e === void 0 ? void 0 : _e.plain(), (_f = criteria.senderAddress) === null || _f === void 0 ? void 0 : _f.plain(), (_g = criteria.targetAddress) === null || _g === void 0 ? void 0 : _g.plain(), (_h = criteria.artifactId) === null || _h === void 0 ? void 0 : _h.toHex(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, CreateReceiptFromDTO_1.createTransactionStatement));
    }
}
exports.ReceiptHttp = ReceiptHttp;
//# sourceMappingURL=ReceiptHttp.js.map