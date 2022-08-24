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
exports.TokenNetworkProperties = void 0;
class TokenNetworkProperties {
    /**
     * @param maxTokensPerAccount - Maximum number of tokens that an account can own.
     * @param maxTokenDuration - Maximum token duration.
     * @param maxTokenDivisibility - Maximum token divisibility.
     * @param tokenRentalFeeSinkAddress - Public key of the token rental fee sink address.
     * @param tokenRentalFee - Token rental fee.
     */
    constructor(maxTokensPerAccount, maxTokenDuration, maxTokenDivisibility, tokenRentalFeeSinkAddress, tokenRentalFee) {
        this.maxTokensPerAccount = maxTokensPerAccount;
        this.maxTokenDuration = maxTokenDuration;
        this.maxTokenDivisibility = maxTokenDivisibility;
        this.tokenRentalFeeSinkAddress = tokenRentalFeeSinkAddress;
        this.tokenRentalFee = tokenRentalFee;
    }
}
exports.TokenNetworkProperties = TokenNetworkProperties;
//# sourceMappingURL=TokenNetworkProperties.js.map