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
exports.FinalizationHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const BmTreeSignature_1 = require("../model/finalization/BmTreeSignature");
const FinalizationProof_1 = require("../model/finalization/FinalizationProof");
const MessageGroup_1 = require("../model/finalization/MessageGroup");
const ParentPublicKeySignaturePair_1 = require("../model/finalization/ParentPublicKeySignaturePair");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
/**
 * Chian http repository.
 *
 * @since 1.0
 */
class FinalizationHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.finalizationRoutesApi = new bitxor_openapi_typescript_fetch_client_1.FinalizationRoutesApi(this.config());
    }
    /**
     * Gets finalization proof for the greatest height associated with the given epoch.
     * @param epoch Finalization epoch
     * @returns Observable<UInt64>
     */
    getFinalizationProofAtEpoch(epoch) {
        return this.call(this.finalizationRoutesApi.getFinalizationProofAtEpoch(epoch), (body) => this.toFinalizationProof(body));
    }
    /**
     * Gets finalization proof at the given height.
     * @param height Block height
     * @returns Observable<BlockchainScore>
     */
    getFinalizationProofAtHeight(height) {
        return this.call(this.finalizationRoutesApi.getFinalizationProofAtHeight(height.toString()), (body) => this.toFinalizationProof(body));
    }
    /**
     * This method maps a FinalizationProofDTO from rest to the SDK's FinalizationProof model object.
     *
     * @internal
     * @param {FinalizationProofDTO} dto FinalizationProofDTO the dto object from rest.
     * @returns FinalizationProof model
     */
    toFinalizationProof(dto) {
        return new FinalizationProof_1.FinalizationProof(dto.version, dto.finalizationEpoch, dto.finalizationPoint, UInt64_1.UInt64.fromNumericString(dto.height), dto.hash, dto.messageGroups.map((mg) => new MessageGroup_1.MessageGroup(mg.stage.valueOf(), UInt64_1.UInt64.fromNumericString(mg.height), mg.hashes, mg.signatures.map((s) => new BmTreeSignature_1.BmTreeSignature(new ParentPublicKeySignaturePair_1.ParentPublicKeySignaturePair(s.root.parentPublicKey, s.root.signature), new ParentPublicKeySignaturePair_1.ParentPublicKeySignaturePair(s.bottom.parentPublicKey, s.bottom.signature))))));
    }
}
exports.FinalizationHttp = FinalizationHttp;
//# sourceMappingURL=FinalizationHttp.js.map