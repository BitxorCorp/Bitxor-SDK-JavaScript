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
exports.ChainHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const ChainInfo_1 = require("../model/blockchain/ChainInfo");
const FinalizedBlock_1 = require("../model/blockchain/FinalizedBlock");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
/**
 * Chian http repository.
 *
 * @since 1.0
 */
class ChainHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.chainRoutesApi = new bitxor_openapi_typescript_fetch_client_1.ChainRoutesApi(this.config());
    }
    /**
     * Gets current blockchain info
     * @returns Observable<ChainInfo>
     */
    getChainInfo() {
        return this.call(this.chainRoutesApi.getChainInfo(), (body) => new ChainInfo_1.ChainInfo(UInt64_1.UInt64.fromNumericString(body.height), UInt64_1.UInt64.fromNumericString(body.scoreLow), UInt64_1.UInt64.fromNumericString(body.scoreHigh), new FinalizedBlock_1.FinalizedBlock(UInt64_1.UInt64.fromNumericString(body.latestFinalizedBlock.height), body.latestFinalizedBlock.hash, body.latestFinalizedBlock.finalizationPoint, body.latestFinalizedBlock.finalizationEpoch)));
    }
}
exports.ChainHttp = ChainHttp;
//# sourceMappingURL=ChainHttp.js.map