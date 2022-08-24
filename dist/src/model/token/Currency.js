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
exports.Currency = void 0;
const NamespaceId_1 = require("../namespace/NamespaceId");
const UInt64_1 = require("../UInt64");
const Token_1 = require("./Token");
/**
 * An object that knows how to create Tokens based on the Token Info and Namespace configuration.
 */
class Currency {
    constructor({ unresolvedTokenId, tokenId, namespaceId, divisibility, transferable, supplyMutable, restrictable, }) {
        // If unresolvedTokenId is not provided explicitly, token id wins over namespace id for performace reasons.
        const finalTokenId = unresolvedTokenId || tokenId || namespaceId;
        if (!finalTokenId) {
            throw new Error('At least one Token Id or Namespace Id must be provided');
        }
        this.unresolvedTokenId = finalTokenId;
        this.tokenId = tokenId;
        this.namespaceId = namespaceId;
        this.divisibility = divisibility;
        this.transferable = transferable;
        this.supplyMutable = supplyMutable;
        this.restrictable = restrictable;
    }
    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    createRelative(amount) {
        if (typeof amount === 'number') {
            return new Token_1.Token(this.unresolvedTokenId, UInt64_1.UInt64.fromUint(amount * Math.pow(10, this.divisibility)));
        }
        return new Token_1.Token(this.unresolvedTokenId, UInt64_1.UInt64.fromUint(amount.compact() * Math.pow(10, this.divisibility)));
    }
    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    createAbsolute(amount) {
        if (typeof amount === 'number') {
            return new Token_1.Token(this.unresolvedTokenId, UInt64_1.UInt64.fromUint(amount));
        }
        return new Token_1.Token(this.unresolvedTokenId, amount);
    }
}
exports.Currency = Currency;
/**
 * Currency for public / Public_test network.
 *
 * This represents the per-network currency token. This tokenId is aliased with namespace name `bitxor`.
 *
 * This simplifies offline operations but general applications should load the currency from the repository factory and network currency service.
 *
 * If you are creating a private network and you need offline access, you can create a Currency in memory.
 *
 */
Currency.PUBLIC = new Currency({
    namespaceId: new NamespaceId_1.NamespaceId('bitxor'),
    divisibility: 6,
    transferable: true,
    supplyMutable: false,
    restrictable: false,
});
//# sourceMappingURL=Currency.js.map