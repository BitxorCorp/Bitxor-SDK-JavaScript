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
exports.TokenRestrictionTransactionService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const model_1 = require("../model");
const TokenRestrictionType_1 = require("../model/restriction/TokenRestrictionType");
const TokenId_1 = require("../model/token/TokenId");
const TokenAddressRestrictionTransaction_1 = require("../model/transaction/TokenAddressRestrictionTransaction");
const TokenGlobalRestrictionTransaction_1 = require("../model/transaction/TokenGlobalRestrictionTransaction");
const UInt64_1 = require("../model/UInt64");
/**
 * TokenRestrictionTransactionService service
 */
class TokenRestrictionTransactionService {
    /**
     * Constructor
     * @param restrictionTokenRepository
     * @param namespaceRepository
     */
    constructor(restrictionTokenRepository, namespaceRepository) {
        this.restrictionTokenRepository = restrictionTokenRepository;
        this.namespaceRepository = namespaceRepository;
        this.defaultTokenAddressRestrictionValue = UInt64_1.UInt64.fromHex('FFFFFFFFFFFFFFFF');
        this.defaultTokenGlobalRestrictionValue = UInt64_1.UInt64.fromUint(0);
    }
    /**
     * Create a TokenGlobalRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param restrictionValue - New restriction value
     * @param restrictionType - New restriction type
     * @param referenceTokenId - Reference token Id
     * @param maxFee - Max fee
     */
    createTokenGlobalRestrictionTransaction(deadline, networkType, tokenId, restrictionKey, restrictionValue, restrictionType, referenceTokenId = new TokenId_1.TokenId(UInt64_1.UInt64.fromUint(0).toDTO()), maxFee = new UInt64_1.UInt64([0, 0])) {
        this.validateInput(restrictionValue);
        return this.getResolvedTokenId(tokenId).pipe((0, operators_1.mergeMap)((resolvedTokenId) => this.getGlobalRestrictionEntry(resolvedTokenId, restrictionKey).pipe((0, operators_1.map)((restrictionEntry) => {
            const currentValue = restrictionEntry ? restrictionEntry.restrictionValue : this.defaultTokenGlobalRestrictionValue;
            const currentType = restrictionEntry ? restrictionEntry.restrictionType : TokenRestrictionType_1.TokenRestrictionType.NONE;
            return TokenGlobalRestrictionTransaction_1.TokenGlobalRestrictionTransaction.create(deadline, resolvedTokenId, restrictionKey, currentValue, currentType, UInt64_1.UInt64.fromNumericString(restrictionValue), restrictionType, networkType, referenceTokenId, maxFee);
        }))));
    }
    /**
     * Create a TokenAddressRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param targetAddress - Unresolved target address
     * @param restrictionValue - New restriction value
     * @param maxFee - Max fee
     */
    createTokenAddressRestrictionTransaction(deadline, networkType, tokenId, restrictionKey, targetAddress, restrictionValue, maxFee = new UInt64_1.UInt64([0, 0])) {
        this.validateInput(restrictionValue);
        const combinedUnresolved = (0, rxjs_1.combineLatest)([this.getResolvedTokenId(tokenId), this.getResolvedAddress(targetAddress)]);
        return combinedUnresolved.pipe((0, operators_1.mergeMap)(([resolvedTokenId, resolvedAddress]) => this.getGlobalRestrictionEntry(resolvedTokenId, restrictionKey).pipe((0, operators_1.mergeMap)((restrictionEntry) => {
            if (!restrictionEntry) {
                throw new Error(`Global restriction for token: ${tokenId.toHex()} is not valid for with RestrictionKey: ${restrictionKey}`);
            }
            return this.getAddressRestrictionEntry(resolvedTokenId, restrictionKey, resolvedAddress).pipe((0, operators_1.map)((optionalValue) => {
                const currentValue = optionalValue || this.defaultTokenAddressRestrictionValue;
                return TokenAddressRestrictionTransaction_1.TokenAddressRestrictionTransaction.create(deadline, tokenId, restrictionKey, targetAddress, UInt64_1.UInt64.fromNumericString(restrictionValue), networkType, currentValue, maxFee);
            }));
        }))));
    }
    /**
     * Get address global restriction previous value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @param targetAddress - The target address
     * @return {Observable<string | undefined>}
     */
    getAddressRestrictionEntry(tokenId, restrictionKey, targetAddress) {
        return this.restrictionTokenRepository.search({ tokenId, targetAddress, entryType: model_1.TokenRestrictionEntryType.ADDRESS }).pipe((0, operators_1.map)((tokenRestriction) => {
            var _a;
            const addressRestriction = tokenRestriction.data.find((r) => r.entryType == model_1.TokenRestrictionEntryType.ADDRESS &&
                r.tokenId.equals(tokenId) &&
                r.targetAddress.equals(targetAddress));
            return addressRestriction ? (_a = addressRestriction.getRestriction(restrictionKey)) === null || _a === void 0 ? void 0 : _a.restrictionValue : undefined;
        }));
    }
    /**
     * Get token global restriction prvious value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @return {Observable<TokenGlobalRestrictionItem | undefined>}
     */
    getGlobalRestrictionEntry(tokenId, restrictionKey) {
        return this.restrictionTokenRepository.search({ tokenId, entryType: model_1.TokenRestrictionEntryType.GLOBAL }).pipe((0, operators_1.map)((tokenRestrictionPage) => {
            const globalRestriction = tokenRestrictionPage.data.find((r) => r.entryType == model_1.TokenRestrictionEntryType.GLOBAL && r.tokenId.equals(tokenId));
            return globalRestriction ? globalRestriction.getRestriction(restrictionKey) : undefined;
        }));
    }
    /**
     * Check if input restriction key and value are invalid or not
     * @param value - Restriction value
     */
    validateInput(value) {
        if (!UInt64_1.UInt64.isLongNumericString(value)) {
            throw new Error(`RestrictionValue: ${value} is not a valid numeric string.`);
        }
    }
    /**
     * @internal
     * Get resolved tokenId from namespace repository
     * @param unresolvedTokenId unresolved tokenId
     * @returns {TokenId}
     */
    getResolvedTokenId(unresolvedTokenId) {
        if (!unresolvedTokenId.isNamespaceId()) {
            return (0, rxjs_1.of)(unresolvedTokenId);
        }
        const namespaceId = unresolvedTokenId;
        return this.namespaceRepository.getLinkedTokenId(namespaceId).pipe((0, operators_1.map)((tokenId) => {
            if (!tokenId) {
                throw new Error(`Invalid unresolvedTokenId: ${unresolvedTokenId.toHex()}`);
            }
            return tokenId;
        }), (0, operators_1.catchError)((err) => {
            throw new Error(err);
        }));
    }
    /**
     * @internal
     * Get resolved address from namespace repository
     * @param unresolvedAddress unresolved address
     * @returns {Address}
     */
    getResolvedAddress(unresolvedAddress) {
        if (!unresolvedAddress.isNamespaceId()) {
            return (0, rxjs_1.of)(unresolvedAddress);
        }
        const namespaceId = unresolvedAddress;
        return this.namespaceRepository.getLinkedAddress(namespaceId).pipe((0, operators_1.map)((address) => {
            if (!address) {
                throw new Error(`Invalid unresolvedAddress: ${namespaceId.toHex()}`);
            }
            return address;
        }), (0, operators_1.catchError)((err) => {
            throw new Error(err);
        }));
    }
}
exports.TokenRestrictionTransactionService = TokenRestrictionTransactionService;
//# sourceMappingURL=TokenRestrictionTransactionService.js.map