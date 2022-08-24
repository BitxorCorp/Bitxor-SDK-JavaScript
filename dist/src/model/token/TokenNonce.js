"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenNonce = void 0;
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
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
/**
 * The token nonce structure
 *
 * @since 1.0
 */
class TokenNonce {
    /**
     * Create TokenNonce from int
     *
     * @param nonce nonce
     */
    constructor(nonce) {
        if (nonce.length !== 4) {
            throw Error('Invalid byte size for nonce, should be 4 bytes but received ' + nonce.length);
        }
        this.nonce = nonce;
    }
    /**
     * Create a random TokenNonce
     *
     * @return  {TokenNonce}
     */
    static createRandom() {
        const bytes = crypto_1.Crypto.randomBytes(4);
        const nonce = new Uint8Array(bytes);
        return this.createFromUint8Array(nonce);
    }
    /**
     * Create a TokenNonce from a Uint8Array notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    static createFromUint8Array(nonce) {
        return new TokenNonce(nonce);
    }
    /**
     * Create a TokenNonce from a number notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    static createFromNumber(nonce) {
        return new TokenNonce(format_1.Convert.numberToUint8Array(nonce, 4));
    }
    /**
     * Create a TokenNonce from hexadecimal notation.
     *
     * @param   hex     {string}
     * @return  {TokenNonce}
     */
    static createFromHex(hex) {
        return new TokenNonce(format_1.Convert.hexToUint8(hex));
    }
    /**
     * @returns the nonce as an array of 4 digits
     */
    toUint8Array() {
        return this.nonce;
    }
    /**
     * @internal
     * @returns the nonce as number
     */
    toDTO() {
        return format_1.Convert.uintArray8ToNumber(this.nonce);
    }
    /**
     * Get string value of nonce
     * @returns the nonce as hex
     */
    toHex() {
        return format_1.Convert.uint8ToHex(this.nonce);
    }
}
exports.TokenNonce = TokenNonce;
//# sourceMappingURL=TokenNonce.js.map