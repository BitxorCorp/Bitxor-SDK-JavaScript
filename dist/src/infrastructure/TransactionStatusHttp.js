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
exports.TransactionStatusHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const Deadline_1 = require("../model/transaction/Deadline");
const TransactionStatus_1 = require("../model/transaction/TransactionStatus");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
/**
 * Transaction status http repository.
 *
 * @since 1.0
 */
class TransactionStatusHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param epochAdjustment Genesis block epoch
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, epochAdjustment, fetchApi) {
        super(url, fetchApi);
        this.transactionStatusRoutesApi = new bitxor_openapi_typescript_fetch_client_1.TransactionStatusRoutesApi(this.config());
    }
    /**
     * Gets a transaction status for a transaction hash
     * @param transactionHash - Transaction hash.
     * @returns Observable<TransactionStatus>
     */
    getTransactionStatus(transactionHash) {
        return this.call(this.transactionStatusRoutesApi.getTransactionStatus(transactionHash), (body) => this.toTransactionStatus(body));
    }
    /**
     * Gets an array of transaction status for different transaction hashes
     * @param transactionHashes - Array of transaction hash
     * @returns Observable<TransactionStatus[]>
     */
    getTransactionStatuses(transactionHashes) {
        const transactionHashesBody = {
            hashes: transactionHashes,
        };
        return this.call(this.transactionStatusRoutesApi.getTransactionStatuses(transactionHashesBody), (body) => body.map(this.toTransactionStatus));
    }
    /**
     * This method maps a TransactionStatusDTO from rest to the SDK's TransactionStatus model object.
     *
     * @internal
     * @param {TransactionStatusDTO} dto the TransactionStatusDTO object from rest.
     * @returns {TransactionStatus} a TransactionStatus model
     */
    toTransactionStatus(dto) {
        return new TransactionStatus_1.TransactionStatus(dto.group, dto.hash, Deadline_1.Deadline.createFromDTO(UInt64_1.UInt64.fromNumericString(dto.deadline).toDTO()), dto.code, dto.height ? UInt64_1.UInt64.fromNumericString(dto.height) : undefined);
    }
}
exports.TransactionStatusHttp = TransactionStatusHttp;
//# sourceMappingURL=TransactionStatusHttp.js.map