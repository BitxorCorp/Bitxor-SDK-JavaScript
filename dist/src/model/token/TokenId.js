"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenId = void 0;
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
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const NamespaceTokenIdGenerator_1 = require("../../infrastructure/transaction/NamespaceTokenIdGenerator");
const Id_1 = require("../Id");
/**
 * The token id structure describes token id
 *
 * @since 1.0
 */
class TokenId {
    /**
     * Create TokenId from token id in form of array of number (ex: [3646934825, 3576016193])
     * or the hexadecimal notation thereof in form of a string.
     *
     * @param id
     */
    constructor(id) {
        if (id === undefined) {
            throw new Error('TokenId undefined');
        }
        if (id instanceof Array) {
            this.id = new Id_1.Id(id);
        }
        else if (typeof id === 'string') {
            if (!/^[0-9A-Fa-f]{16}$/i.test(id)) {
                throw new Error('Invalid size for TokenId hexadecimal notation');
            }
            // hexadecimal formatted TokenId
            this.id = new Id_1.Id(format_1.RawUInt64.fromHex(id));
        }
    }
    /**
     * Create a TokenId for given `nonce` TokenNonce and `owner` PublicAccount.
     *
     * @param   nonce   {TokenNonce}
     * @param   ownerAddress   {Address}
     * @return  {TokenId}
     */
    static createFromNonce(nonce, ownerAddress) {
        const tokenId = NamespaceTokenIdGenerator_1.NamespaceTokenIdGenerator.tokenId(nonce.toUint8Array(), format_1.Convert.hexToUint8(ownerAddress.encoded()));
        return new TokenId(tokenId);
    }
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex() {
        return this.id.toHex().toUpperCase();
    }
    /**
     * Compares tokenIds for equality.
     *
     * @return boolean
     */
    equals(other) {
        return other && this.id.equals(other.id);
    }
    /**
     * Create Builder object.
     */
    toBuilder() {
        return new bitxor_catbuffer_typescript_1.TokenIdDto(this.id.toDTO());
    }
    /**
     * returns that this instance is an alias.
     */
    isNamespaceId() {
        return false;
    }
    /**
     * returns that the instance is not address
     */
    isAddress() {
        return false;
    }
    /**
     * returns that the instance is a token id
     */
    isTokenId() {
        return true;
    }
}
exports.TokenId = TokenId;
//# sourceMappingURL=TokenId.js.map