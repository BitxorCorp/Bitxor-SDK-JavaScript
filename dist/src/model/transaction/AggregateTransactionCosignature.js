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
exports.AggregateTransactionCosignature = void 0;
const UInt64_1 = require("../UInt64");
/**
 * Model representing cosignature of an aggregate transaction.
 */
class AggregateTransactionCosignature {
    /**
     * @param signature
     * @param signer
     * @param version
     */
    constructor(
    /**
     * The signature of aggregate transaction done by the cosigner.
     */
    signature, 
    /**
     * The cosigner public account.
     */
    signer, 
    /**
     * Version
     */
    version = UInt64_1.UInt64.fromUint(0)) {
        this.signature = signature;
        this.signer = signer;
        this.version = version;
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            version: this.version.toDTO(),
            signature: this.signature,
            signerPublicKey: this.signer.toDTO(),
        };
    }
}
exports.AggregateTransactionCosignature = AggregateTransactionCosignature;
//# sourceMappingURL=AggregateTransactionCosignature.js.map