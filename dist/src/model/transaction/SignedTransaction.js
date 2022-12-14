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
exports.SignedTransaction = void 0;
const PublicAccount_1 = require("../account/PublicAccount");
/**
 * SignedTransaction object is used to transfer the transaction data and the signature to the server
 * in order to initiate and broadcast a transaction.
 */
class SignedTransaction {
    /**
     * @param payload
     * @param hash
     * @param type
     * @param networkType
     */
    constructor(
    /**
     * Transaction serialized data
     */
    payload, 
    /**
     * Transaction hash
     */
    hash, 
    /**
     * Transaction signerPublicKey
     */
    signerPublicKey, 
    /**
     * Transaction type
     */
    type, 
    /**
     * Signer network type
     */
    networkType) {
        this.payload = payload;
        this.hash = hash;
        this.signerPublicKey = signerPublicKey;
        this.type = type;
        this.networkType = networkType;
        if (hash.length !== 64) {
            throw new Error('hash must be 64 characters long');
        }
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            payload: this.payload,
            hash: this.hash,
            signerPublicKey: this.signerPublicKey,
            type: this.type,
            networkType: this.networkType,
        };
    }
    /**
     * Return signer's address
     * @returns {Address}
     */
    getSignerAddress() {
        return PublicAccount_1.PublicAccount.createFromPublicKey(this.signerPublicKey, this.networkType).address;
    }
}
exports.SignedTransaction = SignedTransaction;
//# sourceMappingURL=SignedTransaction.js.map