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
exports.CurrencyService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const namespace_1 = require("../model/namespace");
const token_1 = require("../model/token");
/**
 * A service used to load Currencies objects.
 */
class CurrencyService {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    /**
     * This method loads the network currencies.
     */
    getNetworkCurrencies() {
        return this.repositoryFactory
            .createNetworkRepository()
            .getNetworkProperties()
            .pipe((0, operators_1.mergeMap)((properties) => {
            if (!properties.chain.currencyTokenId) {
                throw new Error('currencyTokenId could not be loaded from network properties!!');
            }
            if (!properties.chain.harvestingTokenId) {
                throw new Error('harvestingTokenId could not be loaded from network properties!!');
            }
            const currencyToken = new token_1.TokenId(DtoMapping_1.DtoMapping.toSimpleHex(properties.chain.currencyTokenId));
            const harvestingToken = new token_1.TokenId(DtoMapping_1.DtoMapping.toSimpleHex(properties.chain.harvestingTokenId));
            const tokenIds = currencyToken.equals(harvestingToken) ? [currencyToken] : [currencyToken, harvestingToken];
            return this.getCurrencies(tokenIds).pipe((0, operators_1.map)((networkCurrencies) => {
                const currency = networkCurrencies.filter((c) => currencyToken.equals(c.tokenId))[0];
                const harvest = networkCurrencies.filter((c) => harvestingToken.equals(c.tokenId))[0];
                return new token_1.NetworkCurrencies(currency, harvest);
            }));
        }));
    }
    getCurrencies(tokenIds) {
        const tokenHttp = this.repositoryFactory.createTokenRepository();
        const namespaceHttp = this.repositoryFactory.createNamespaceRepository();
        // get tokenInfo and token names from the network,
        // build network currency models
        return (0, rxjs_1.forkJoin)({
            tokensInfo: (0, rxjs_1.firstValueFrom)(tokenHttp.getTokens(tokenIds)),
            tokenNames: (0, rxjs_1.firstValueFrom)(namespaceHttp.getTokensNames(tokenIds)),
        }).pipe((0, operators_1.map)(({ tokensInfo, tokenNames }) => tokensInfo.map((tokenInfo) => {
            const thisTokenNames = tokenNames.find((mn) => mn.tokenId.equals(tokenInfo.id)) || new token_1.TokenNames(tokenInfo.id, []);
            return this.getCurrency(tokenInfo, thisTokenNames);
        })));
    }
    /**
     * Creates a network currency model given token info and token names
     * @param {TokenInfo} tokenInfo
     * @param {TokenNames} tokenName
     * @returns {(Currency | undefined)}
     */
    getCurrency(tokenInfo, tokenName) {
        const tokenId = tokenInfo.id;
        const namespaceName = this.getName([tokenName], tokenId);
        const namespaceId = namespaceName ? new namespace_1.NamespaceId(namespaceName) : undefined;
        return new token_1.Currency({
            tokenId: tokenId,
            namespaceId: namespaceId,
            divisibility: tokenInfo.divisibility,
            transferable: tokenInfo.flags.transferable,
            supplyMutable: tokenInfo.flags.supplyMutable,
            restrictable: tokenInfo.flags.restrictable,
        });
    }
    getName(tokenNames, accountTokenDto) {
        var _a;
        return (_a = tokenNames
            .filter((n) => n.tokenId.equals(accountTokenDto))
            .filter((n) => n.names.length)
            .map((n) => n.names[0].name)) === null || _a === void 0 ? void 0 : _a[0];
    }
}
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=CurrencyService.js.map