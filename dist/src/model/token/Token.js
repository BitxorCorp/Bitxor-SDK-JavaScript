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
exports.Token = void 0;
/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
class Token {
    /**
     * Constructor
     * @param id
     * @param amount
     */
    constructor(
    /**
     * The token id
     */
    id, 
    /**
     * The token amount. The quantity is always given in smallest units for the token
     * i.e. if it has a divisibility of 3 the quantity is given in millis.
     */
    amount) {
        this.id = id;
        this.amount = amount;
    }
    /**
     * @internal
     * @returns {{amount: number[], id: number[]}}
     */
    toDTO() {
        return {
            amount: this.amount.toString(),
            id: this.id.id.toHex(),
        };
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map