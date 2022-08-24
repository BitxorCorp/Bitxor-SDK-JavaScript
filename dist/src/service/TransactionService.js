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
exports.TransactionService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const infrastructure_1 = require("../infrastructure");
const paginationStreamer_1 = require("../infrastructure/paginationStreamer");
const receipt_1 = require("../model/receipt");
const transaction_1 = require("../model/transaction");
/**
 * Transaction Service
 */
class TransactionService {
    /**
     * Constructor
     * @param transactionRepository
     * @param receiptRepository
     */
    constructor(transactionRepository, receiptRepository) {
        this.transactionRepository = transactionRepository;
        this.receiptRepository = receiptRepository;
    }
    /**
     * Resolve unresolved token / address from array of transactions
     * @param transationHashes List of transaction hashes.
     * @returns Observable<Transaction[]>
     */
    resolveAliases(transationHashes) {
        return this.transactionRepository.getTransactionsById(transationHashes, infrastructure_1.TransactionGroup.Confirmed).pipe((0, operators_1.mergeMap)((_) => {
            return _;
        }), (0, operators_1.mergeMap)((transaction) => this.resolveTransaction(transaction)), (0, operators_1.toArray)());
    }
    /**
     * @param signedTransaction Signed transaction to be announced.
     * @param listener Websocket listener
     * @returns {Observable<Transaction>}
     */
    announce(signedTransaction, listener) {
        const signerAddress = signedTransaction.getSignerAddress();
        return this.transactionRepository
            .announce(signedTransaction)
            .pipe((0, operators_1.mergeMap)(() => this.getTransactionOrRaiseError(listener, signerAddress, signedTransaction.hash, listener.confirmed(signerAddress, signedTransaction.hash))));
    }
    /**
     * Announce aggregate transaction
     * **NOTE** A lock fund transaction for this aggregate bonded should exists
     * @param signedTransaction Signed aggregate bonded transaction.
     * @param listener Websocket listener
     * @returns {Observable<AggregateTransaction>}
     */
    announceAggregateBonded(signedTransaction, listener) {
        const signerAddress = signedTransaction.getSignerAddress();
        const transactionObservable = this.transactionRepository
            .announceAggregateBonded(signedTransaction)
            .pipe((0, operators_1.mergeMap)(() => listener.aggregateBondedAdded(signerAddress, signedTransaction.hash)));
        return this.getTransactionOrRaiseError(listener, signerAddress, signedTransaction.hash, transactionObservable);
    }
    /**
     * This method announces an a hash lock transaction followed by a aggregate bonded transaction
     * while waiting for being confirmed by listing to the /confirmed and /aggregateBondedAdded web
     * socket. If an error is sent while processing any of the given transaction an Error is raised.
     *
     * @param signedHashLockTransaction Signed hash lock transaction.
     * @param signedAggregateTransaction Signed aggregate bonded transaction.
     * @param listener Websocket listener
     * @returns {Observable<AggregateTransaction>}
     */
    announceHashLockAggregateBonded(signedHashLockTransaction, signedAggregateTransaction, listener) {
        return this.announce(signedHashLockTransaction, listener).pipe((0, operators_1.mergeMap)(() => this.announceAggregateBonded(signedAggregateTransaction, listener)));
    }
    /**
     * @internal
     *
     * This method publishes an error if the listener receives an error code for the given address & transaction hash.
     * Otherwise, it returns the passed transactionObservable
     *
     * @param listener the listener.
     * @param address the signer address
     * @param transactionHash the transaction hash
     * @param transactionObservable the observable with the valid transaction
     */
    getTransactionOrRaiseError(listener, address, transactionHash, transactionObservable) {
        const errorObservable = listener.status(address, transactionHash);
        return (0, rxjs_1.merge)(transactionObservable, errorObservable).pipe((0, operators_1.first)(), (0, operators_1.map)((errorOrTransaction) => {
            if (errorOrTransaction.constructor.name === transaction_1.TransactionStatusError.name) {
                throw new Error(errorOrTransaction.code);
            }
            else {
                return errorOrTransaction;
            }
        }));
    }
    /**
     * Resolve transaction alias(s)
     * @param transaction Transaction to be resolved
     * @returns {Observable<Transaction>}
     */
    resolveTransaction(transaction) {
        if ([transaction_1.TransactionType.AGGREGATE_BONDED, transaction_1.TransactionType.AGGREGATE_COMPLETE].includes(transaction.type)) {
            if (transaction.innerTransactions.find((tx) => this.checkShouldResolve(tx))) {
                return this.resolvedFromReceipt(transaction, transaction.transactionInfo.index);
            }
            return (0, rxjs_1.of)(transaction);
        }
        return this.checkShouldResolve(transaction) ? this.resolvedFromReceipt(transaction, 0) : (0, rxjs_1.of)(transaction);
    }
    /**
     * @internal
     * Check if receiptRepository needs to be called to resolve transaction alias
     * @param transaction Transaction
     * @return {boolean}
     */
    checkShouldResolve(transaction) {
        switch (transaction.type) {
            case transaction_1.TransactionType.ACCOUNT_KEY_LINK:
            case transaction_1.TransactionType.ACCOUNT_METADATA:
            case transaction_1.TransactionType.ACCOUNT_OPERATION_RESTRICTION:
            case transaction_1.TransactionType.ADDRESS_ALIAS:
            case transaction_1.TransactionType.TOKEN_ALIAS:
            case transaction_1.TransactionType.TOKEN_DEFINITION:
            case transaction_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
            case transaction_1.TransactionType.NAMESPACE_METADATA:
            case transaction_1.TransactionType.NAMESPACE_REGISTRATION:
                return false;
            case transaction_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
                const accountAddressRestriction = transaction;
                return (accountAddressRestriction.restrictionAdditions.find((address) => address.isNamespaceId()) !== undefined ||
                    accountAddressRestriction.restrictionDeletions.find((address) => address.isNamespaceId()) !== undefined);
            case transaction_1.TransactionType.ACCOUNT_TOKEN_RESTRICTION:
                const accountTokenRestriction = transaction;
                return (accountTokenRestriction.restrictionAdditions.find((tokenId) => tokenId.isNamespaceId()) !== undefined ||
                    accountTokenRestriction.restrictionDeletions.find((tokenId) => tokenId.isNamespaceId()) !== undefined);
            case transaction_1.TransactionType.HASH_LOCK:
                return transaction.token.id.isNamespaceId();
            case transaction_1.TransactionType.TOKEN_ADDRESS_RESTRICTION:
                const tokenAddressRestriction = transaction;
                return tokenAddressRestriction.targetAddress.isNamespaceId() || tokenAddressRestriction.tokenId.isNamespaceId();
            case transaction_1.TransactionType.TOKEN_GLOBAL_RESTRICTION:
                const tokenGlobalRestriction = transaction;
                return tokenGlobalRestriction.referenceTokenId.isNamespaceId() || tokenGlobalRestriction.tokenId.isNamespaceId();
            case transaction_1.TransactionType.TOKEN_METADATA:
                return transaction.targetTokenId.isNamespaceId();
            case transaction_1.TransactionType.TOKEN_SUPPLY_CHANGE:
                return transaction.tokenId.isNamespaceId();
            case transaction_1.TransactionType.SECRET_PROOF:
                return transaction.recipientAddress.isNamespaceId();
            case transaction_1.TransactionType.SECRET_LOCK:
                const secretLock = transaction;
                return secretLock.recipientAddress.isNamespaceId() || secretLock.token.id.isNamespaceId();
            case transaction_1.TransactionType.TRANSFER:
                const transfer = transaction;
                return transfer.recipientAddress.isNamespaceId() || transfer.tokens.find((token) => token.id.isNamespaceId()) !== undefined;
            default:
                throw new Error('Transaction type not not recogonised.');
        }
    }
    /**
     * @internal
     * Resolve transaction alais(s) from block receipt by calling receiptRepository
     * @param transaction Transaction to be resolved
     * @param aggregateIndex Aggregate transaction index
     * @return {Observable<Transaction>}
     */
    resolvedFromReceipt(transaction, aggregateIndex) {
        const addressResolution = paginationStreamer_1.ReceiptPaginationStreamer.addressResolutionStatements(this.receiptRepository)
            .search({ height: transaction.transactionInfo.height })
            .pipe((0, operators_1.toArray)());
        const tokenResolution = paginationStreamer_1.ReceiptPaginationStreamer.tokenResolutionStatements(this.receiptRepository)
            .search({ height: transaction.transactionInfo.height })
            .pipe((0, operators_1.toArray)());
        return (0, rxjs_1.combineLatest)(tokenResolution, addressResolution)
            .pipe((0, operators_1.map)(([token, address]) => {
            return new receipt_1.Statement([], address, token);
        }))
            .pipe((0, operators_1.map)((statement) => transaction.resolveAliases(statement, aggregateIndex)));
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=TransactionService.js.map