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
exports.TransactionHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../core/utils");
const transaction_1 = require("../model/transaction");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
const transaction_2 = require("./transaction");
const TransactionGroup_1 = require("./TransactionGroup");
/**
 * Transaction http repository.
 *
 * @since 1.0
 */
class TransactionHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.transactionRoutesApi = new bitxor_openapi_typescript_fetch_client_1.TransactionRoutesApi(this.config());
        this.blockRoutesApi = new bitxor_openapi_typescript_fetch_client_1.BlockRoutesApi(this.config());
    }
    /**
     * Gets a transaction for a transactionId
     * @param transactionId - Transaction id or hash.
     * @param transactionGroup - Transaction group.
     * @returns Observable<Transaction>
     */
    getTransaction(transactionId, transactionGroup) {
        return this.call(this.getTransactionByGroup(transactionId, transactionGroup), (body) => (0, transaction_2.CreateTransactionFromDTO)(body));
    }
    /**
     * Gets an array of transactions for different transaction ids
     * @param transactionIds - Array of transactions id and/or hash.
     * @param transactionGroup - Transaction group.
     * @returns Observable<Transaction[]>
     */
    getTransactionsById(transactionIds, transactionGroup) {
        const transactionIdsBody = {
            transactionIds,
        };
        switch (transactionGroup) {
            case TransactionGroup_1.TransactionGroup.Confirmed:
                return this.call(this.transactionRoutesApi.getConfirmedTransactions(transactionIdsBody), (body) => body.map((transactionDTO) => {
                    return (0, transaction_2.CreateTransactionFromDTO)(transactionDTO);
                }));
            case TransactionGroup_1.TransactionGroup.Unconfirmed:
                return this.call(this.transactionRoutesApi.getUnconfirmedTransactions(transactionIdsBody), (body) => body.map((transactionDTO) => {
                    return (0, transaction_2.CreateTransactionFromDTO)(transactionDTO);
                }));
            case TransactionGroup_1.TransactionGroup.Partial:
                return this.call(this.transactionRoutesApi.getPartialTransactions(transactionIdsBody), (body) => body.map((transactionDTO) => {
                    return (0, transaction_2.CreateTransactionFromDTO)(transactionDTO);
                }));
        }
    }
    /**
     * Send a signed transaction
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announce(signedTransaction) {
        if (signedTransaction.type === transaction_1.TransactionType.AGGREGATE_BONDED) {
            throw new Error("Announcing aggregate bonded transaction should use 'announceAggregateBonded'");
        }
        return this.call(this.transactionRoutesApi.announceTransaction(signedTransaction), (body) => new transaction_1.TransactionAnnounceResponse(body.message));
    }
    /**
     * Send a signed transaction with missing signatures
     * @param signedTransaction - Signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announceAggregateBonded(signedTransaction) {
        if (signedTransaction.type !== transaction_1.TransactionType.AGGREGATE_BONDED) {
            throw new Error('Only Transaction Type 0x4241 is allowed for announce aggregate bonded');
        }
        return this.call(this.transactionRoutesApi.announcePartialTransaction(signedTransaction), (body) => new transaction_1.TransactionAnnounceResponse(body.message));
    }
    /**
     * Send a cosignature signed transaction of an already announced transaction
     * @param cosignatureSignedTransaction - Cosignature signed transaction
     * @returns Observable<TransactionAnnounceResponse>
     */
    announceAggregateBondedCosignature(cosignatureSignedTransaction) {
        const cosignature = {
            parentHash: cosignatureSignedTransaction.parentHash,
            signerPublicKey: cosignatureSignedTransaction.signerPublicKey,
            signature: cosignatureSignedTransaction.signature,
            version: cosignatureSignedTransaction.version.toString(),
        };
        return this.call(this.transactionRoutesApi.announceCosignatureTransaction(cosignature), (body) => new transaction_1.TransactionAnnounceResponse(body.message));
    }
    /**
     * Gets a transaction's effective paid fee
     * @param transactionId - Transaction id or hash.
     * @returns Observable<number>
     */
    getTransactionEffectiveFee(transactionId) {
        return this.call(this.getTransactionByGroup(transactionId, TransactionGroup_1.TransactionGroup.Confirmed), transaction_2.CreateTransactionFromDTO).pipe((0, operators_1.mergeMap)((transaction) => {
            // now read block details
            return this.call(this.blockRoutesApi.getBlockByHeight(transaction.transactionInfo.height.toString()), (blockDTO) => {
                // @see https://bitxorcorp.github.io/concepts/transaction.html#fees
                // effective_fee = feeMultiplier x transaction::size
                return blockDTO.block.feeMultiplier * transaction.size;
            });
        }));
    }
    /**
     * Returns an array of transactions.
     * @summary Get transactions
     * @param criteria Transaction search criteria
     * @returns {Observable<Page<Transaction>>}
     */
    search(criteria) {
        return this.call(this.searchTransactionByGroup(criteria), (body) => super.toPage(body.pagination, body.data, transaction_2.CreateTransactionFromDTO));
    }
    streamer() {
        return new paginationStreamer_1.TransactionPaginationStreamer(this);
    }
    /**
     * @internal
     * Gets a transaction info
     * @param transactionId - Transaction id or hash.
     * @param transactionGroup - Transaction group.
     * @returns Promise<{response: http.ClientResponse; body: TransactionInfoDTO;}>
     */
    getTransactionByGroup(transactionId, transactionGroup) {
        switch (transactionGroup) {
            case TransactionGroup_1.TransactionGroup.Confirmed:
                return this.transactionRoutesApi.getConfirmedTransaction(transactionId);
            case TransactionGroup_1.TransactionGroup.Unconfirmed:
                return this.transactionRoutesApi.getUnconfirmedTransaction(transactionId);
            case TransactionGroup_1.TransactionGroup.Partial:
                return this.transactionRoutesApi.getPartialTransaction(transactionId);
        }
    }
    /**
     * @internal
     * Gets a transaction search result
     * @param criteria - the criteria.
     * @returns Promise<{response: http.ClientResponse; body: TransactionInfoDTO;}>
     */
    searchTransactionByGroup(criteria) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        switch (criteria.group) {
            case TransactionGroup_1.TransactionGroup.Confirmed:
                return this.transactionRoutesApi.searchConfirmedTransactions((_a = criteria.address) === null || _a === void 0 ? void 0 : _a.plain(), (_b = criteria.recipientAddress) === null || _b === void 0 ? void 0 : _b.plain(), criteria.signerPublicKey, (_c = criteria.height) === null || _c === void 0 ? void 0 : _c.toString(), (_d = criteria.fromHeight) === null || _d === void 0 ? void 0 : _d.toString(), (_e = criteria.toHeight) === null || _e === void 0 ? void 0 : _e.toString(), (_f = criteria.fromTransferAmount) === null || _f === void 0 ? void 0 : _f.toString(), (_g = criteria.toTransferAmount) === null || _g === void 0 ? void 0 : _g.toString(), (_h = criteria.type) === null || _h === void 0 ? void 0 : _h.map((type) => type.valueOf()), criteria.embedded, (_j = criteria.transferTokenId) === null || _j === void 0 ? void 0 : _j.toHex(), criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order));
            case TransactionGroup_1.TransactionGroup.Unconfirmed:
                return this.transactionRoutesApi.searchUnconfirmedTransactions((_k = criteria.address) === null || _k === void 0 ? void 0 : _k.plain(), (_l = criteria.recipientAddress) === null || _l === void 0 ? void 0 : _l.plain(), criteria.signerPublicKey, (_m = criteria.height) === null || _m === void 0 ? void 0 : _m.toString(), (_o = criteria.fromHeight) === null || _o === void 0 ? void 0 : _o.toString(), (_p = criteria.toHeight) === null || _p === void 0 ? void 0 : _p.toString(), (_q = criteria.fromTransferAmount) === null || _q === void 0 ? void 0 : _q.toString(), (_r = criteria.toTransferAmount) === null || _r === void 0 ? void 0 : _r.toString(), (_s = criteria.type) === null || _s === void 0 ? void 0 : _s.map((type) => type.valueOf()), criteria.embedded, (_t = criteria.transferTokenId) === null || _t === void 0 ? void 0 : _t.toHex(), criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order));
            case TransactionGroup_1.TransactionGroup.Partial:
                return this.transactionRoutesApi.searchPartialTransactions((_u = criteria.address) === null || _u === void 0 ? void 0 : _u.plain(), (_v = criteria.recipientAddress) === null || _v === void 0 ? void 0 : _v.plain(), criteria.signerPublicKey, (_w = criteria.height) === null || _w === void 0 ? void 0 : _w.toString(), (_x = criteria.fromHeight) === null || _x === void 0 ? void 0 : _x.toString(), (_y = criteria.toHeight) === null || _y === void 0 ? void 0 : _y.toString(), (_z = criteria.fromTransferAmount) === null || _z === void 0 ? void 0 : _z.toString(), (_0 = criteria.toTransferAmount) === null || _0 === void 0 ? void 0 : _0.toString(), (_1 = criteria.type) === null || _1 === void 0 ? void 0 : _1.map((type) => type.valueOf()), criteria.embedded, (_2 = criteria.transferTokenId) === null || _2 === void 0 ? void 0 : _2.toHex(), criteria.pageSize, criteria.pageNumber, criteria.offset, utils_1.DtoMapping.mapEnum(criteria.order));
        }
    }
}
exports.TransactionHttp = TransactionHttp;
//# sourceMappingURL=TransactionHttp.js.map