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

import { UInt64 } from '../UInt64';
import { UnresolvedTokenId } from './UnresolvedTokenId';

/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
export class Token {
    /**
     * Constructor
     * @param id
     * @param amount
     */
    constructor(
        /**
         * The token id
         */
        public readonly id: UnresolvedTokenId,
        /**
         * The token amount. The quantity is always given in smallest units for the token
         * i.e. if it has a divisibility of 3 the quantity is given in millis.
         */
        public readonly amount: UInt64,
    ) {}

    /**
     * @internal
     * @returns {{amount: number[], id: number[]}}
     */
    public toDTO(): any {
        return {
            amount: this.amount.toString(),
            id: this.id.id.toHex(),
        };
    }
}
