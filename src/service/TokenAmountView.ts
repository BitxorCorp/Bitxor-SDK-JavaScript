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

import { TokenInfo } from '../model/token/TokenInfo';
import { UInt64 } from '../model/UInt64';

/**
 * Class representing token view information with amount
 */
export class TokenAmountView {
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
        public readonly tokenInfo: TokenInfo,
        /**
         * The amount of absolute tokens we have
         */
        public readonly amount: UInt64,
    ) {}

    /**
     * Relative amount dividing amount by the divisibility
     * @returns {string}
     */
    public relativeAmount(): number {
        if (this.tokenInfo.divisibility === 0) {
            return this.amount.compact();
        }
        return this.amount.compact() / Math.pow(10, this.tokenInfo.divisibility);
    }

    /**
     * Namespace and token description
     * @returns {string}
     */
    public fullName(): string {
        return this.tokenInfo.id.toHex();
    }
}
