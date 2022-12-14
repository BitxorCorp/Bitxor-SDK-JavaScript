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
exports.AggregateTransactionService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const TransactionMapping_1 = require("../core/utils/TransactionMapping");
const Address_1 = require("../model/account/Address");
const TransactionType_1 = require("../model/transaction/TransactionType");
/**
 * Aggregated Transaction service
 */
class AggregateTransactionService {
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory) {
        this.multisigRepository = repositoryFactory.createMultisigRepository();
        this.networkRepository = repositoryFactory.createNetworkRepository();
    }
    /**
     * Check if an aggregate complete transaction has all cosignatories attached
     * @param signedTransaction - The signed aggregate transaction (complete) to be verified
     * @returns {Observable<boolean>}
     */
    isComplete(signedTransaction) {
        const aggregateTransaction = TransactionMapping_1.TransactionMapping.createFromPayload(signedTransaction.payload);
        /**
         * Include both initiator & cosigners
         */
        const signers = aggregateTransaction.cosignatures.map((cosigner) => cosigner.signer.address);
        if (signedTransaction.signerPublicKey) {
            signers.push(Address_1.Address.createFromPublicKey(signedTransaction.signerPublicKey, aggregateTransaction.networkType));
        }
        return (0, rxjs_1.from)(aggregateTransaction.innerTransactions)
            .pipe((0, operators_1.mergeMap)((innerTransaction) => this.multisigRepository.getMultisigAccountInfo(innerTransaction.signer.address).pipe(
        /**
         * For multisig account, we need to get the graph info in case it has multiple levels
         */
        (0, operators_1.mergeMap)((_) => _.minApproval !== 0 && _.minRemoval !== 0
            ? this.multisigRepository
                .getMultisigAccountGraphInfo(_.accountAddress)
                .pipe((0, operators_1.map)((graphInfo) => this.validateCosignatories(graphInfo, signers, innerTransaction)))
            : (0, rxjs_1.of)(signers.find((s) => s.equals(_.accountAddress)) !== undefined)))), (0, operators_1.toArray)())
            .pipe((0, operators_1.flatMap)((results) => {
            return (0, rxjs_1.of)(results.every((isComplete) => isComplete));
        }));
    }
    /**
     * Get total multisig account cosigner count
     * @param address multisig account address
     * @returns {Observable<number>}
     */
    getMaxCosignatures(address) {
        return this.multisigRepository.getMultisigAccountGraphInfo(address).pipe((0, operators_1.map)((graph) => {
            const cosignatures = []
                .concat(...Array.from(graph.multisigEntries.values()))
                .map((info) => info.cosignatoryAddresses.map((cosig) => cosig));
            return new Set([].concat(...cosignatures)).size;
        }));
    }
    /**
     * Get max cosignatures allowed per aggregate from network properties
     * @returns {Observable<number>}
     */
    getNetworkMaxCosignaturesPerAggregate() {
        return this.networkRepository.getNetworkProperties().pipe((0, operators_1.map)((properties) => {
            var _a, _b;
            if (!((_a = properties.plugins.aggregate) === null || _a === void 0 ? void 0 : _a.maxCosignaturesPerAggregate)) {
                throw new Error('Cannot get maxCosignaturesPerAggregate from network properties.');
            }
            return parseInt((_b = properties.plugins.aggregate) === null || _b === void 0 ? void 0 : _b.maxCosignaturesPerAggregate.replace(`'`, ''));
        }));
    }
    /**
     * Validate cosignatories against multisig Account(s)
     * @param graphInfo - multisig account graph info
     * @param cosignatories - array of cosignatories extracted from aggregated transaction
     * @param innerTransaction - the inner transaction of the aggregated transaction
     * @returns {boolean}
     */
    validateCosignatories(graphInfo, cosignatories, innerTransaction) {
        /**
         *  Validate cosignatories from bottom level to top
         */
        const sortedKeys = Array.from(graphInfo.multisigEntries.keys()).sort((a, b) => b - a);
        const cosignatoriesReceived = cosignatories.map((cosig) => cosig.plain());
        let validationResult = false;
        let isMultisigRemoval = false;
        /**
         * Check inner transaction. If remove cosigner from multisig account,
         * use minRemoval instead of minApproval for cosignatories validation.
         */
        if (innerTransaction.type === TransactionType_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
            if (innerTransaction.addressDeletions.length) {
                isMultisigRemoval = true;
            }
        }
        sortedKeys.forEach((key) => {
            const multisigInfo = graphInfo.multisigEntries.get(key);
            if (multisigInfo && !validationResult) {
                multisigInfo.forEach((multisig) => {
                    if (multisig.minApproval >= 1 && multisig.minRemoval) {
                        // To make sure it is multisig account
                        const matchedCosignatories = this.compareArrays(cosignatoriesReceived, multisig.cosignatoryAddresses.map((cosig) => cosig.plain()));
                        /**
                         * if minimal signature requirement met at current level, push the multisig account
                         * into the received signatories array for next level validation.
                         * Otherwise return validation failed.
                         */
                        if ((matchedCosignatories.length >= multisig.minApproval && !isMultisigRemoval) ||
                            (matchedCosignatories.length >= multisig.minRemoval && isMultisigRemoval)) {
                            if (cosignatoriesReceived.indexOf(multisig.accountAddress.plain()) === -1) {
                                cosignatoriesReceived.push(multisig.accountAddress.plain());
                            }
                            validationResult = true;
                        }
                        else {
                            validationResult = false;
                        }
                    }
                });
            }
        });
        return validationResult;
    }
    /**
     * Compare two string arrays
     * @param array1 - base array
     * @param array2 - array to be matched
     * @returns {string[]} - array of matched elements
     */
    compareArrays(array1, array2) {
        const results = [];
        array1.forEach((a1) => array2.forEach((a2) => {
            if (a1 === a2) {
                results.push(a1);
            }
        }));
        return results;
    }
}
exports.AggregateTransactionService = AggregateTransactionService;
//# sourceMappingURL=AggregateTransactionService.js.map