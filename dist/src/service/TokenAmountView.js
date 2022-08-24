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
exports.TokenAmountView = void 0;
/**
 * Class representing token view information with amount
 */
class TokenAmountView {
    /**
     * @param tokenInfo
     * @param namespaceName
     * @param tokenName
     * @param amount
     */
    constructor(
    /**
     * The token information
     */
    tokenInfo, 
    /**
     * The amount of absolute tokens we have
     */
    amount) {
        this.tokenInfo = tokenInfo;
        this.amount = amount;
    }
    /**
     * Relative amount dividing amount by the divisibility
     * @returns {string}
     */
    relativeAmount() {
        if (this.tokenInfo.divisibility === 0) {
            return this.amount.compact();
        }
        return this.amount.compact() / Math.pow(10, this.tokenInfo.divisibility);
    }
    /**
     * Namespace and token description
     * @returns {string}
     */
    fullName() {
        return this.tokenInfo.id.toHex();
    }
}
exports.TokenAmountView = TokenAmountView;
//# sourceMappingURL=TokenAmountView.js.map