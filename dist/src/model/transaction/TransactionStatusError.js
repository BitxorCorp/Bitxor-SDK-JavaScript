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
exports.TransactionStatusError = void 0;
/**
 * Transaction status error model returned by listeners
 */
class TransactionStatusError {
    /**
     * @internal
     * @param address
     * @param hash
     * @param code
     * @param deadline
     */
    constructor(
    /**
     *  The address of the account that signed the invalid transaction.
     *  It's the address listened when calling Lister.status.
     */
    address, 
    /**
     * The transaction hash.
     */
    hash, 
    /**
     * The error code.
     */
    code, 
    /**
     * The transaction deadline.
     */
    deadline) {
        this.address = address;
        this.hash = hash;
        this.code = code;
        this.deadline = deadline;
    }
}
exports.TransactionStatusError = TransactionStatusError;
//# sourceMappingURL=TransactionStatusError.js.map