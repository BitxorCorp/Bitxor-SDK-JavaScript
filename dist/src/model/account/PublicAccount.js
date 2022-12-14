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
exports.PublicAccount = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const Address_1 = require("./Address");
const Hash512 = 64;
/**
 * The public account structure contains account's address and public key.
 */
class PublicAccount {
    /**
     * @internal
     * @param publicKey
     * @param address
     */
    constructor(
    /**
     * The account's public key.
     */
    publicKey, 
    /**
     * The account's address.
     */
    address) {
        this.publicKey = publicKey;
        this.address = address;
    }
    /**
     * Create a PublicAccount from a public key and network type.
     * @param publicKey Public key
     * @param networkType Network type
     * @returns {PublicAccount}
     */
    static createFromPublicKey(publicKey, networkType) {
        if (publicKey == null || (publicKey.length !== 64 && publicKey.length !== 66)) {
            throw new Error('Not a valid public key');
        }
        const address = Address_1.Address.createFromPublicKey(publicKey, networkType);
        return new PublicAccount(publicKey, address);
    }
    /**
     * Verify a signature.
     *
     * @param {string} data - The data to verify.
     * @param {string} signature - The signature to verify.
     * @return {boolean}  - True if the signature is valid, false otherwise.
     */
    verifySignature(data, signature) {
        if (!signature) {
            throw new Error('Missing argument');
        }
        if (signature.length / 2 !== Hash512) {
            throw new Error('Signature length is incorrect');
        }
        if (!format_1.Convert.isHexString(signature)) {
            throw new Error('Signature must be hexadecimal only');
        }
        // Convert signature key to Uint8Array
        const convertedSignature = format_1.Convert.hexToUint8(signature);
        // Convert to Uint8Array
        const convertedData = format_1.Convert.hexToUint8(format_1.Convert.utf8ToHex(data));
        return crypto_1.KeyPair.verify(format_1.Convert.hexToUint8(this.publicKey), convertedData, convertedSignature);
    }
    /**
     * Compares public accounts for equality.
     * @param publicAccount
     * @returns {boolean}
     */
    equals(publicAccount) {
        return this.publicKey === publicAccount.publicKey && this.address.plain() === publicAccount.address.plain();
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            publicKey: this.publicKey,
            address: this.address.toDTO(),
        };
    }
    /**
     * Create Builder object
     */
    toBuilder() {
        return new bitxor_catbuffer_typescript_1.PublicKeyDto(format_1.Convert.hexToUint8(this.publicKey));
    }
}
exports.PublicAccount = PublicAccount;
//# sourceMappingURL=PublicAccount.js.map