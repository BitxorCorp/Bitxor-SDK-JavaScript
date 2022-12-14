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
exports.ReceiptPaginationStreamer = void 0;
const PaginationStreamer_1 = require("./PaginationStreamer");
/**
 * A helper object that streams {@link Statement} using the search.
 */
class ReceiptPaginationStreamer {
    /**
     * It creates a transaction statement streamer of TransactionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static transactionStatements(repository) {
        return new PaginationStreamer_1.PaginationStreamer({
            search(criteria) {
                return repository.searchReceipts(criteria);
            },
        });
    }
    /**
     * It creates a transaction statement streamer of AddressResolutionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static addressResolutionStatements(repository) {
        return new PaginationStreamer_1.PaginationStreamer({
            search(criteria) {
                return repository.searchAddressResolutionStatements(criteria);
            },
        });
    }
    /**
     * It creates a token resolution statement streamer of TokenResolutionStatement objects.
     *
     * @param repository the {@link ReceiptRepository} repository
     * @return a new Pagination Streamer.
     */
    static tokenResolutionStatements(repository) {
        return new PaginationStreamer_1.PaginationStreamer({
            search(criteria) {
                return repository.searchTokenResolutionStatements(criteria);
            },
        });
    }
}
exports.ReceiptPaginationStreamer = ReceiptPaginationStreamer;
//# sourceMappingURL=ReceiptPaginationStreamer.js.map