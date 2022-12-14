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
exports.TransactionStatus = void 0;
/**
 * Transaction status contains basic of a transaction announced to the blockchain.
 */
class TransactionStatus {
    /**
     * @param group
     * @param code
     * @param hash
     * @param deadline
     * @param height
     */
    constructor(
    /**
     * The transaction status group "failed", "unconfirmed", "confirmed", etc...
     */
    group, 
    /**
     * The transaction hash.
     */
    hash, 
    /**
     * The transaction deadline.
     */
    deadline, 
    /**
     * The transaction status code being the error name in case of failure and success otherwise.
     */
    code, 
    /**
     * The height of the block at which it was confirmed or rejected.
     */
    height) {
        this.group = group;
        this.hash = hash;
        this.deadline = deadline;
        this.code = code;
        this.height = height;
    }
}
exports.TransactionStatus = TransactionStatus;
//# sourceMappingURL=TransactionStatus.js.map