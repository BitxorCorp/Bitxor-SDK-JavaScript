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
exports.TokenService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const TokenId_1 = require("../model/token/TokenId");
const TokenAmountView_1 = require("./TokenAmountView");
const TokenView_1 = require("./TokenView");
/**
 * Token service
 */
class TokenService {
    /**
     * Constructor
     * @param accountRepository
     * @param tokenRepository
     */
    constructor(accountRepository, tokenRepository) {
        this.accountRepository = accountRepository;
        this.tokenRepository = tokenRepository;
    }
    /**
     * Get token view given tokenIds
     * @param tokenIds - The ids of the tokens
     * @returns {Observable<TokenView[]>}
     */
    tokensView(tokenIds) {
        return (0, rxjs_1.of)(tokenIds).pipe((0, operators_1.mergeMap)(() => this.tokenRepository.getTokens(tokenIds).pipe((0, operators_1.mergeMap)((info) => info), (0, operators_1.map)((tokenInfo) => {
            return new TokenView_1.TokenView(tokenInfo);
        }), (0, operators_1.toArray)())));
    }
    /**
     * Get token amount view given token array
     * @param tokens
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountView(tokens) {
        const tokenIds = tokens.map((token) => {
            return new TokenId_1.TokenId(token.id.toHex());
        });
        return this.tokensView(tokenIds).pipe((0, operators_1.map)((tokenViews) => {
            const results = [];
            tokenViews.forEach((view) => {
                const token = tokens.find((m) => m.id.toHex() === view.tokenInfo.id.toHex());
                if (token) {
                    results.push(new TokenAmountView_1.TokenAmountView(view.tokenInfo, token.amount));
                }
            });
            return results;
        }));
    }
    /**
     * Get balance tokens in form of TokenAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountViewFromAddress(address) {
        return (0, rxjs_1.of)(address).pipe((0, operators_1.mergeMap)((_) => this.accountRepository.getAccountInfo(_)), (0, operators_1.mergeMap)((_) => this.tokensAmountView(_.tokens)));
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map