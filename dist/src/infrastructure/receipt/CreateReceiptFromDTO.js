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
exports.createTransactionStatement = exports.CreateReceiptFromDTO = exports.createAddressResolutionStatement = exports.createTokenResolutionStatement = void 0;
const utils_1 = require("../../core/utils");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const Address_1 = require("../../model/account/Address");
const NamespaceId_1 = require("../../model/namespace/NamespaceId");
const ArtifactExpiryReceipt_1 = require("../../model/receipt/ArtifactExpiryReceipt");
const BalanceChangeReceipt_1 = require("../../model/receipt/BalanceChangeReceipt");
const BalanceTransferReceipt_1 = require("../../model/receipt/BalanceTransferReceipt");
const InflationReceipt_1 = require("../../model/receipt/InflationReceipt");
const ReceiptSource_1 = require("../../model/receipt/ReceiptSource");
const ReceiptType_1 = require("../../model/receipt/ReceiptType");
const ResolutionEntry_1 = require("../../model/receipt/ResolutionEntry");
const ResolutionStatement_1 = require("../../model/receipt/ResolutionStatement");
const ResolutionType_1 = require("../../model/receipt/ResolutionType");
const TransactionStatement_1 = require("../../model/receipt/TransactionStatement");
const TokenId_1 = require("../../model/token/TokenId");
const UInt64_1 = require("../../model/UInt64");
/**
 * @interal
 * @param unresolvedAddress unresolved address
 * @returns {Address | NamespaceId}
 */
const extractUnresolvedAddress = (unresolvedAddress) => {
    if (typeof unresolvedAddress === 'string') {
        return UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(unresolvedAddress);
    }
    else if (typeof unresolvedAddress === 'object') {
        // Is JSON object
        if (unresolvedAddress.hasOwnProperty('address')) {
            return Address_1.Address.createFromRawAddress(unresolvedAddress.address);
        }
        else if (unresolvedAddress.hasOwnProperty('id')) {
            return NamespaceId_1.NamespaceId.createFromEncoded(unresolvedAddress.id);
        }
    }
    throw new Error(`UnresolvedAddress: ${unresolvedAddress} type is not recognised`);
};
/**
 * @internal
 * @param statementInfoDTO
 * @returns {TokenIdResolutionStatement}
 * @constructor
 */
const createTokenResolutionStatement = (statementInfoDTO) => {
    const statementDTO = statementInfoDTO.statement;
    return new ResolutionStatement_1.ResolutionStatement(ResolutionType_1.ResolutionType.Token, UInt64_1.UInt64.fromNumericString(statementDTO.height), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(statementDTO.unresolved), statementDTO.resolutionEntries.map((entry) => {
        return new ResolutionEntry_1.ResolutionEntry(new TokenId_1.TokenId(entry.resolved), new ReceiptSource_1.ReceiptSource(entry.source.primaryId, entry.source.secondaryId));
    }));
};
exports.createTokenResolutionStatement = createTokenResolutionStatement;
/**
 * @internal
 * @param statementInfoDTO
 * @returns {AddressResolutionStatement}
 * @constructor
 */
const createAddressResolutionStatement = (statementInfoDTO) => {
    const statementDTO = statementInfoDTO.statement;
    return new ResolutionStatement_1.ResolutionStatement(ResolutionType_1.ResolutionType.Address, UInt64_1.UInt64.fromNumericString(statementDTO.height), extractUnresolvedAddress(statementDTO.unresolved), statementDTO.resolutionEntries.map((entry) => {
        return new ResolutionEntry_1.ResolutionEntry(utils_1.DtoMapping.toAddress(entry.resolved), new ReceiptSource_1.ReceiptSource(entry.source.primaryId, entry.source.secondaryId));
    }));
};
exports.createAddressResolutionStatement = createAddressResolutionStatement;
/**
 * @internal
 * @param receiptDTO
 * @returns {BalanceChangeReceipt}
 * @constructor
 */
const createBalanceChangeReceipt = (receiptDTO) => {
    return new BalanceChangeReceipt_1.BalanceChangeReceipt(utils_1.DtoMapping.toAddress(receiptDTO.targetAddress), new TokenId_1.TokenId(receiptDTO.tokenId), UInt64_1.UInt64.fromNumericString(receiptDTO.amount), receiptDTO.version, receiptDTO.type);
};
/**
 * @internal
 * @param receiptDTO
 * @returns {BalanceTransferReceipt}
 * @constructor
 */
const createBalanceTransferReceipt = (receiptDTO) => {
    return new BalanceTransferReceipt_1.BalanceTransferReceipt(utils_1.DtoMapping.toAddress(receiptDTO.senderAddress), utils_1.DtoMapping.toAddress(receiptDTO.recipientAddress), new TokenId_1.TokenId(receiptDTO.tokenId), UInt64_1.UInt64.fromNumericString(receiptDTO.amount), receiptDTO.version, receiptDTO.type);
};
/**
 * @internal
 * @param receiptType receipt type
 * @param id Artifact id
 * @returns {UnresolvedTokenId}
 */
const extractArtifactId = (receiptType, id) => {
    switch (receiptType) {
        case ReceiptType_1.ReceiptType.Token_Expired:
            return new TokenId_1.TokenId(id);
        case ReceiptType_1.ReceiptType.Namespace_Expired:
        case ReceiptType_1.ReceiptType.Namespace_Deleted:
            return NamespaceId_1.NamespaceId.createFromEncoded(id);
        default:
            throw new Error('Receipt type is not supported.');
    }
};
/**
 * @internal
 * @param receiptDTO
 * @returns {ArtifactExpiryReceipt}
 * @constructor
 */
const createArtifactExpiryReceipt = (receiptDTO) => {
    return new ArtifactExpiryReceipt_1.ArtifactExpiryReceipt(extractArtifactId(receiptDTO.type, receiptDTO.artifactId), receiptDTO.version, receiptDTO.type);
};
/**
 * @internal
 * @param receiptDTO
 * @returns {InflationReceipt}
 * @constructor
 */
const createInflationReceipt = (receiptDTO) => {
    return new InflationReceipt_1.InflationReceipt(new TokenId_1.TokenId(receiptDTO.tokenId), UInt64_1.UInt64.fromNumericString(receiptDTO.amount), receiptDTO.version, receiptDTO.type);
};
/**
 * @param receiptDTO
 * @returns {Receipt}
 * @constructor
 */
const CreateReceiptFromDTO = (receiptDTO) => {
    switch (receiptDTO.type) {
        case ReceiptType_1.ReceiptType.Harvest_Fee:
        case ReceiptType_1.ReceiptType.LockHash_Created:
        case ReceiptType_1.ReceiptType.LockHash_Completed:
        case ReceiptType_1.ReceiptType.LockHash_Expired:
        case ReceiptType_1.ReceiptType.LockSecret_Created:
        case ReceiptType_1.ReceiptType.LockSecret_Completed:
        case ReceiptType_1.ReceiptType.LockSecret_Expired:
            return createBalanceChangeReceipt(receiptDTO);
        case ReceiptType_1.ReceiptType.Token_Levy:
        case ReceiptType_1.ReceiptType.Token_Rental_Fee:
        case ReceiptType_1.ReceiptType.Namespace_Rental_Fee:
            return createBalanceTransferReceipt(receiptDTO);
        case ReceiptType_1.ReceiptType.Token_Expired:
        case ReceiptType_1.ReceiptType.Namespace_Expired:
        case ReceiptType_1.ReceiptType.Namespace_Deleted:
            return createArtifactExpiryReceipt(receiptDTO);
        case ReceiptType_1.ReceiptType.Inflation:
            return createInflationReceipt(receiptDTO);
        default:
            throw new Error(`Receipt type: ${receiptDTO.type} not recognized.`);
    }
};
exports.CreateReceiptFromDTO = CreateReceiptFromDTO;
/**
 * @internal
 * @param statementInfoDTO
 * @returns {TransactionStatement}
 * @constructor
 */
const createTransactionStatement = (statementInfoDTO) => {
    const statementDTO = statementInfoDTO.statement;
    return new TransactionStatement_1.TransactionStatement(UInt64_1.UInt64.fromNumericString(statementDTO.height), new ReceiptSource_1.ReceiptSource(statementDTO.source.primaryId, statementDTO.source.secondaryId), statementDTO.receipts.map((receipt) => {
        return (0, exports.CreateReceiptFromDTO)(receipt);
    }));
};
exports.createTransactionStatement = createTransactionStatement;
//# sourceMappingURL=CreateReceiptFromDTO.js.map