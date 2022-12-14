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
exports.MultisigHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const utils_1 = require("../core/utils");
const MultisigAccountGraphInfo_1 = require("../model/account/MultisigAccountGraphInfo");
const MultisigAccountInfo_1 = require("../model/account/MultisigAccountInfo");
const Http_1 = require("./Http");
/**
 * Multisig http repository.
 *
 * @since 1.0
 */
class MultisigHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.multisigRoutesApi = new bitxor_openapi_typescript_fetch_client_1.MultisigRoutesApi(this.config());
    }
    /**
     * Gets a MultisigAccountInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountInfo>
     */
    getMultisigAccountInfo(address) {
        return this.call(this.multisigRoutesApi.getAccountMultisig(address.plain()), (body) => this.toMultisigAccountInfo(body));
    }
    /**
     * Gets a MultisigAccountInfo merkle for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MerkleStateInfo>
     */
    getMultisigAccountInfoMerkle(address) {
        return this.call(this.multisigRoutesApi.getAccountMultisigMerkle(address.plain()), utils_1.DtoMapping.toMerkleStateInfo);
    }
    /**
     * Gets a MultisigAccountGraphInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountGraphInfo>
     */
    getMultisigAccountGraphInfo(address) {
        return this.call(this.multisigRoutesApi.getAccountMultisigGraph(address.plain()), (body) => {
            const multisigAccountGraphInfosDTO = body;
            const multisigAccounts = new Map();
            multisigAccountGraphInfosDTO.map((multisigAccountGraphInfoDTO) => {
                multisigAccounts.set(multisigAccountGraphInfoDTO.level, multisigAccountGraphInfoDTO.multisigEntries.map((multisigAccountInfoDTO) => {
                    return this.toMultisigAccountInfo(multisigAccountInfoDTO);
                }));
            });
            return new MultisigAccountGraphInfo_1.MultisigAccountGraphInfo(multisigAccounts);
        });
    }
    /**
     * It maps from MultisigAccountInfoDTO to MultisigAccountInfo
     * @param dto the DTO
     */
    toMultisigAccountInfo(dto) {
        return new MultisigAccountInfo_1.MultisigAccountInfo(dto.multisig.version || 1, utils_1.DtoMapping.toAddress(dto.multisig.accountAddress), dto.multisig.minApproval, dto.multisig.minRemoval, dto.multisig.cosignatoryAddresses.map((cosigner) => utils_1.DtoMapping.toAddress(cosigner)), dto.multisig.multisigAddresses.map((multisig) => utils_1.DtoMapping.toAddress(multisig)));
    }
}
exports.MultisigHttp = MultisigHttp;
//# sourceMappingURL=MultisigHttp.js.map