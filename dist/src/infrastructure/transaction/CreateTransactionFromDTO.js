"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionFromDTO = exports.extractTokens = exports.extractRecipient = void 0;
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
const __1 = require("../..");
const utils_1 = require("../../core/utils");
const model_1 = require("../../model");
const account_1 = require("../../model/account");
const namespace_1 = require("../../model/namespace");
const token_1 = require("../../model/token");
const transaction_1 = require("../../model/transaction");
/**
 * Extract recipientAddress value from encoded hexadecimal notation.
 *
 * If bit 0 of byte 0 is not set (e.g. 0x90), then it is a regular address.
 * Else (e.g. 0x91) it represents a namespace id which starts at byte 1.
 *
 * @param recipientAddress {string} Encoded hexadecimal recipientAddress notation
 * @return {Address | NamespaceId}
 */
const extractRecipient = (recipientAddress) => {
    if (typeof recipientAddress === 'string') {
        return utils_1.UnresolvedMapping.toUnresolvedAddress(recipientAddress);
    }
    else if (typeof recipientAddress === 'object') {
        // Is JSON object
        if (recipientAddress.hasOwnProperty('address')) {
            return account_1.Address.createFromRawAddress(recipientAddress.address);
        }
        else if (recipientAddress.hasOwnProperty('id')) {
            return namespace_1.NamespaceId.createFromEncoded(recipientAddress.id);
        }
    }
    throw new Error(`Recipient: ${recipientAddress} type is not recognised`);
};
exports.extractRecipient = extractRecipient;
/**
 * Extract tokens from encoded UInt64 notation.
 *
 * If most significant bit of byte 0 is set, then it is a namespaceId.
 * If most significant bit of byte 0 is not set, then it is a tokenId.
 *
 * @param tokens {Array | undefined} The DTO array of tokens (with UInt64 Id notation)
 * @return {Token[]}
 */
const extractTokens = (tokens) => {
    if (tokens === undefined) {
        return [];
    }
    return tokens.map((tokenDTO) => {
        const id = utils_1.UnresolvedMapping.toUnresolvedToken(tokenDTO.id);
        return new token_1.Token(id, model_1.UInt64.fromNumericString(tokenDTO.amount));
    });
};
exports.extractTokens = extractTokens;
/**
 * Extract deadline from json payload.
 * @param deadline - deadline dto
 */
const extractDeadline = (deadline) => {
    if (!deadline) {
        return transaction_1.Deadline.createEmtpy();
    }
    return transaction_1.Deadline.createFromDTO(deadline);
};
/**
 * @internal
 * Extract transaction meta data
 *
 * @param meta - Transaction meta data
 * @param id - TransactionId
 * @return {TransactionInfo | AggregateTransactionInfo | undefined}
 */
const extractTransactionMeta = (meta, id) => {
    if (!meta) {
        return undefined;
    }
    if (meta.aggregateHash || meta.aggregateId) {
        return new transaction_1.AggregateTransactionInfo(model_1.UInt64.fromNumericString(meta.height), meta.index, id, meta.aggregateHash, meta.aggregateId);
    }
    return new transaction_1.TransactionInfo(model_1.UInt64.fromNumericString(meta.height), meta.index, id, meta.hash, meta.merkleComponentHash);
};
/**
 * @internal
 * @param transactionDTO
 * @param isEmbedded
 * @returns {any}
 * @constructor
 */
const CreateStandaloneTransactionFromDTO = (transactionDTO, transactionInfo) => {
    const type = transactionDTO.type;
    const version = transactionDTO.version;
    const signature = transaction_1.Transaction.resolveSignature(transactionDTO.signature, false);
    const maxFee = model_1.UInt64.fromNumericString(transactionDTO.maxFee || '0');
    const deadline = extractDeadline(transactionDTO.deadline);
    const networkType = transactionDTO.network;
    const signer = transactionDTO.signerPublicKey
        ? account_1.PublicAccount.createFromPublicKey(transactionDTO.signerPublicKey, networkType)
        : undefined;
    switch (type) {
        case transaction_1.TransactionType.TRANSFER:
            return new transaction_1.TransferTransaction(networkType, version, deadline, maxFee, (0, exports.extractRecipient)(transactionDTO.recipientAddress), (0, exports.extractTokens)(transactionDTO.tokens), model_1.MessageFactory.createMessageFromHex(transactionDTO.message), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.NAMESPACE_REGISTRATION:
            return new transaction_1.NamespaceRegistrationTransaction(networkType, version, deadline, maxFee, transactionDTO.registrationType, transactionDTO.name, namespace_1.NamespaceId.createFromEncoded(transactionDTO.id), transactionDTO.registrationType === 0 ? model_1.UInt64.fromNumericString(transactionDTO.duration) : undefined, transactionDTO.registrationType === 1 ? namespace_1.NamespaceId.createFromEncoded(transactionDTO.parentId) : undefined, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_DEFINITION:
            return new transaction_1.TokenDefinitionTransaction(networkType, version, deadline, maxFee, token_1.TokenNonce.createFromNumber(transactionDTO.nonce), new token_1.TokenId(transactionDTO.id), new token_1.TokenFlags(transactionDTO.flags), transactionDTO.divisibility, model_1.UInt64.fromNumericString(transactionDTO.duration), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_SUPPLY_CHANGE:
            return new transaction_1.TokenSupplyChangeTransaction(networkType, version, deadline, maxFee, utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId), transactionDTO.action, model_1.UInt64.fromNumericString(transactionDTO.delta), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_SUPPLY_REVOCATION:
            return new model_1.TokenSupplyRevocationTransaction(networkType, version, deadline, maxFee, (0, exports.extractRecipient)(transactionDTO.sourceAddress), new token_1.Token(new token_1.TokenId(transactionDTO.tokenId), model_1.UInt64.fromNumericString(transactionDTO.amount)), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
            return new transaction_1.MultisigAccountModificationTransaction(networkType, version, deadline, maxFee, transactionDTO.minApprovalDelta, transactionDTO.minRemovalDelta, transactionDTO.addressAdditions ? transactionDTO.addressAdditions.map((addition) => (0, exports.extractRecipient)(addition)) : [], transactionDTO.addressDeletions ? transactionDTO.addressDeletions.map((deletion) => (0, exports.extractRecipient)(deletion)) : [], signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.HASH_LOCK:
            return new transaction_1.LockFundsTransaction(networkType, version, deadline, maxFee, new token_1.Token(new token_1.TokenId(transactionDTO.tokenId), model_1.UInt64.fromNumericString(transactionDTO.amount)), model_1.UInt64.fromNumericString(transactionDTO.duration), new transaction_1.SignedTransaction('', transactionDTO.hash, '', transaction_1.TransactionType.AGGREGATE_BONDED, networkType), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.SECRET_LOCK:
            const recipientAddress = transactionDTO.recipientAddress;
            const tokenId = utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId);
            return new transaction_1.SecretLockTransaction(networkType, version, deadline, maxFee, new token_1.Token(tokenId, model_1.UInt64.fromNumericString(transactionDTO.amount)), model_1.UInt64.fromNumericString(transactionDTO.duration), transactionDTO.hashAlgorithm, transactionDTO.secret, (0, exports.extractRecipient)(recipientAddress), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.SECRET_PROOF:
            return new transaction_1.SecretProofTransaction(networkType, version, deadline, maxFee, transactionDTO.hashAlgorithm, transactionDTO.secret, (0, exports.extractRecipient)(transactionDTO.recipientAddress), transactionDTO.proof, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_ALIAS:
            return new transaction_1.TokenAliasTransaction(networkType, version, deadline, maxFee, transactionDTO.aliasAction, namespace_1.NamespaceId.createFromEncoded(transactionDTO.namespaceId), new token_1.TokenId(transactionDTO.tokenId), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ADDRESS_ALIAS:
            return new transaction_1.AddressAliasTransaction(networkType, version, deadline, maxFee, transactionDTO.aliasAction, namespace_1.NamespaceId.createFromEncoded(transactionDTO.namespaceId), (0, exports.extractRecipient)(transactionDTO.address), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
            return new transaction_1.AccountAddressRestrictionTransaction(networkType, version, deadline, maxFee, transactionDTO.restrictionFlags, transactionDTO.restrictionAdditions
                ? transactionDTO.restrictionAdditions.map((addition) => (0, exports.extractRecipient)(addition))
                : [], transactionDTO.restrictionDeletions
                ? transactionDTO.restrictionDeletions.map((deletion) => (0, exports.extractRecipient)(deletion))
                : [], signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ACCOUNT_OPERATION_RESTRICTION:
            return new transaction_1.AccountOperationRestrictionTransaction(networkType, version, deadline, maxFee, transactionDTO.restrictionFlags, transactionDTO.restrictionAdditions ? transactionDTO.restrictionAdditions : [], transactionDTO.restrictionDeletions ? transactionDTO.restrictionDeletions : [], signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ACCOUNT_TOKEN_RESTRICTION:
            return new transaction_1.AccountTokenRestrictionTransaction(networkType, version, deadline, maxFee, transactionDTO.restrictionFlags, transactionDTO.restrictionAdditions
                ? transactionDTO.restrictionAdditions.map((addition) => utils_1.UnresolvedMapping.toUnresolvedToken(addition))
                : [], transactionDTO.restrictionDeletions
                ? transactionDTO.restrictionDeletions.map((deletion) => utils_1.UnresolvedMapping.toUnresolvedToken(deletion))
                : [], signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ACCOUNT_KEY_LINK:
            return new transaction_1.AccountKeyLinkTransaction(networkType, version, deadline, maxFee, transactionDTO.linkedPublicKey, transactionDTO.linkAction, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_GLOBAL_RESTRICTION:
            return new transaction_1.TokenGlobalRestrictionTransaction(networkType, version, deadline, maxFee, utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId), utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.referenceTokenId), model_1.UInt64.fromHex(transactionDTO.restrictionKey), model_1.UInt64.fromNumericString(transactionDTO.previousRestrictionValue), transactionDTO.previousRestrictionType, model_1.UInt64.fromNumericString(transactionDTO.newRestrictionValue), transactionDTO.newRestrictionType, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_ADDRESS_RESTRICTION:
            return new transaction_1.TokenAddressRestrictionTransaction(networkType, version, deadline, maxFee, utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId), model_1.UInt64.fromHex(transactionDTO.restrictionKey), (0, exports.extractRecipient)(transactionDTO.targetAddress), model_1.UInt64.fromNumericString(transactionDTO.previousRestrictionValue), model_1.UInt64.fromNumericString(transactionDTO.newRestrictionValue), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.ACCOUNT_METADATA:
            return new transaction_1.AccountMetadataTransaction(networkType, version, deadline, maxFee, (0, exports.extractRecipient)(transactionDTO.targetAddress), model_1.UInt64.fromHex(transactionDTO.scopedMetadataKey), transactionDTO.valueSizeDelta, __1.Convert.hexToUint8(transactionDTO.value), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.TOKEN_METADATA:
            return new transaction_1.TokenMetadataTransaction(networkType, version, deadline, maxFee, (0, exports.extractRecipient)(transactionDTO.targetAddress), model_1.UInt64.fromHex(transactionDTO.scopedMetadataKey), utils_1.UnresolvedMapping.toUnresolvedToken(transactionDTO.targetTokenId), transactionDTO.valueSizeDelta, __1.Convert.hexToUint8(transactionDTO.value), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.NAMESPACE_METADATA:
            return new transaction_1.NamespaceMetadataTransaction(networkType, version, deadline, maxFee, (0, exports.extractRecipient)(transactionDTO.targetAddress), model_1.UInt64.fromHex(transactionDTO.scopedMetadataKey), namespace_1.NamespaceId.createFromEncoded(transactionDTO.targetNamespaceId), transactionDTO.valueSizeDelta, __1.Convert.hexToUint8(transactionDTO.value), signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.VRF_KEY_LINK:
            return new transaction_1.VrfKeyLinkTransaction(networkType, version, deadline, maxFee, transactionDTO.linkedPublicKey, transactionDTO.linkAction, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.NODE_KEY_LINK:
            return new transaction_1.NodeKeyLinkTransaction(networkType, version, deadline, maxFee, transactionDTO.linkedPublicKey, transactionDTO.linkAction, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        case transaction_1.TransactionType.VOTING_KEY_LINK:
            return new transaction_1.VotingKeyLinkTransaction(networkType, version, deadline, maxFee, transactionDTO.linkedPublicKey, transactionDTO.startEpoch, transactionDTO.endEpoch, transactionDTO.linkAction, signature, signer, transactionInfo).setPayloadSize(transactionDTO.size);
        default:
            throw new Error(`Unimplemented transaction with type ${type} for version ${version}`);
    }
};
/**
 * @internal
 * @param transactionDTO
 * @returns {Transaction}
 * @constructor
 */
const CreateTransactionFromDTO = (transactionDTO) => {
    if (transactionDTO.transaction.type === transaction_1.TransactionType.AGGREGATE_COMPLETE ||
        transactionDTO.transaction.type === transaction_1.TransactionType.AGGREGATE_BONDED) {
        const innerTransactions = transactionDTO.transaction.transactions
            ? transactionDTO.transaction.transactions.map((innerTransactionDTO) => {
                const aggregateTransactionInfo = extractTransactionMeta(innerTransactionDTO.meta, innerTransactionDTO.id);
                innerTransactionDTO.transaction.maxFee = transactionDTO.transaction.maxFee;
                innerTransactionDTO.transaction.deadline = transactionDTO.transaction.deadline;
                innerTransactionDTO.transaction.signature = transactionDTO.transaction.signature;
                return CreateStandaloneTransactionFromDTO(innerTransactionDTO.transaction, aggregateTransactionInfo);
            })
            : [];
        return new transaction_1.AggregateTransaction(transactionDTO.transaction.network, transactionDTO.transaction.type, transactionDTO.transaction.version, extractDeadline(transactionDTO.transaction.deadline), model_1.UInt64.fromNumericString(transactionDTO.transaction.maxFee || '0'), innerTransactions, transactionDTO.transaction.cosignatures
            ? transactionDTO.transaction.cosignatures.map((aggregateCosignatureDTO) => {
                return new transaction_1.AggregateTransactionCosignature(aggregateCosignatureDTO.signature, account_1.PublicAccount.createFromPublicKey(aggregateCosignatureDTO.signerPublicKey, transactionDTO.transaction.network), model_1.UInt64.fromNumericString(aggregateCosignatureDTO.version));
            })
            : [], transaction_1.Transaction.resolveSignature(transactionDTO.transaction.signature, false), transactionDTO.transaction.signerPublicKey
            ? account_1.PublicAccount.createFromPublicKey(transactionDTO.transaction.signerPublicKey, transactionDTO.transaction.network)
            : undefined, extractTransactionMeta(transactionDTO.meta, transactionDTO.id)).setPayloadSize(transactionDTO.transaction.size);
    }
    else {
        return CreateStandaloneTransactionFromDTO(transactionDTO.transaction, extractTransactionMeta(transactionDTO.meta, transactionDTO.id));
    }
};
exports.CreateTransactionFromDTO = CreateTransactionFromDTO;
//# sourceMappingURL=CreateTransactionFromDTO.js.map