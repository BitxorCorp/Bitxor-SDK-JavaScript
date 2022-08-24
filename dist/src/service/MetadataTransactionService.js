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
exports.MetadataTransactionService = void 0;
const operators_1 = require("rxjs/operators");
const Convert_1 = require("../core/format/Convert");
const MetadataType_1 = require("../model/metadata/MetadataType");
const AccountMetadataTransaction_1 = require("../model/transaction/AccountMetadataTransaction");
const NamespaceMetadataTransaction_1 = require("../model/transaction/NamespaceMetadataTransaction");
const TokenMetadataTransaction_1 = require("../model/transaction/TokenMetadataTransaction");
/**
 * MetadataTransaction service
 */
class MetadataTransactionService {
    /**
     * Constructor
     * @param metadataRepository
     */
    constructor(metadataRepository) {
        this.metadataRepository = metadataRepository;
    }
    /**
     * Create an Account Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target address
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<AccountMetadataTransaction>}
     */
    createAccountMetadataTransaction(deadline, networkType, targetAddress, key, value, sourceAddress, maxFee) {
        return this.metadataRepository
            .search({ targetAddress, scopedMetadataKey: key.toHex(), sourceAddress: sourceAddress, metadataType: MetadataType_1.MetadataType.Account })
            .pipe((0, operators_1.map)((metadatas) => {
            if (metadatas.data.length > 0) {
                const metadata = metadatas.data[0];
                const currentValueByte = Convert_1.Convert.utf8ToUint8(metadata.metadataEntry.value);
                const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
                const xoredBytes = Convert_1.Convert.hexToUint8(Convert_1.Convert.xor(currentValueByte, newValueBytes));
                return AccountMetadataTransaction_1.AccountMetadataTransaction.create(deadline, targetAddress, key, newValueBytes.length - currentValueByte.length, xoredBytes, networkType, maxFee);
            }
            const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
            return AccountMetadataTransaction_1.AccountMetadataTransaction.create(deadline, targetAddress, key, newValueBytes.length, Convert_1.Convert.utf8ToUint8(value), networkType, maxFee);
        }), (0, operators_1.catchError)((err) => {
            throw Error(err.message);
        }));
    }
    /**
     * Create a Token Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target Address
     * @param tokenId - Token Id
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<TokenMetadataTransaction>}
     */
    createTokenMetadataTransaction(deadline, networkType, targetAddress, tokenId, key, value, sourceAddress, maxFee) {
        return this.metadataRepository
            .search({ targetId: tokenId, scopedMetadataKey: key.toHex(), sourceAddress: sourceAddress, metadataType: MetadataType_1.MetadataType.Token })
            .pipe((0, operators_1.map)((metadatas) => {
            if (metadatas.data.length > 0) {
                const metadata = metadatas.data[0];
                const currentValueByte = Convert_1.Convert.utf8ToUint8(metadata.metadataEntry.value);
                const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
                const xoredBytes = Convert_1.Convert.hexToUint8(Convert_1.Convert.xor(currentValueByte, newValueBytes));
                return TokenMetadataTransaction_1.TokenMetadataTransaction.create(deadline, targetAddress, key, tokenId, newValueBytes.length - currentValueByte.length, xoredBytes, networkType, maxFee);
            }
            const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
            return TokenMetadataTransaction_1.TokenMetadataTransaction.create(deadline, targetAddress, key, tokenId, newValueBytes.length, Convert_1.Convert.utf8ToUint8(value), networkType, maxFee);
        }), (0, operators_1.catchError)((err) => {
            throw Error(err.message);
        }));
    }
    /**
     * Create a Namespace Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target address
     * @param namespaceId - Namespace Id
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<NamespaceMetadataTransaction>}
     */
    createNamespaceMetadataTransaction(deadline, networkType, targetAddress, namespaceId, key, value, sourceAddress, maxFee) {
        return this.metadataRepository
            .search({
            targetId: namespaceId,
            scopedMetadataKey: key.toHex(),
            sourceAddress: sourceAddress,
            metadataType: MetadataType_1.MetadataType.Namespace,
        })
            .pipe((0, operators_1.map)((metadatas) => {
            if (metadatas.data.length > 0) {
                const metadata = metadatas.data[0];
                const currentValueByte = Convert_1.Convert.utf8ToUint8(metadata.metadataEntry.value);
                const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
                const xoredBytes = Convert_1.Convert.hexToUint8(Convert_1.Convert.xor(currentValueByte, newValueBytes));
                return NamespaceMetadataTransaction_1.NamespaceMetadataTransaction.create(deadline, targetAddress, key, namespaceId, newValueBytes.length - currentValueByte.length, xoredBytes, networkType, maxFee);
            }
            const newValueBytes = Convert_1.Convert.utf8ToUint8(value);
            return NamespaceMetadataTransaction_1.NamespaceMetadataTransaction.create(deadline, targetAddress, key, namespaceId, newValueBytes.length, Convert_1.Convert.utf8ToUint8(value), networkType, maxFee);
        }), (0, operators_1.catchError)((err) => {
            throw Error(err.message);
        }));
    }
}
exports.MetadataTransactionService = MetadataTransactionService;
//# sourceMappingURL=MetadataTransactionService.js.map