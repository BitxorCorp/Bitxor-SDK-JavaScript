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
exports.SerializeTransactionToJSON = void 0;
const __1 = require("../..");
const transaction_1 = require("../../model/transaction");
/**
 * @internal
 * @param transaction - The transaction class object
 * @returns JSON object
 * @constructor
 */
const SerializeTransactionToJSON = (transaction) => {
    const version = transaction.version;
    if (transaction.type === transaction_1.TransactionType.ACCOUNT_KEY_LINK) {
        const accountLinkTx = transaction;
        return {
            linkedPublicKey: accountLinkTx.linkedPublicKey,
            linkAction: accountLinkTx.linkAction,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.ADDRESS_ALIAS) {
        const addressAliasTx = transaction;
        return {
            aliasAction: addressAliasTx.aliasAction,
            namespaceId: addressAliasTx.namespaceId.toHex(),
            address: addressAliasTx.address.toDTO(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.AGGREGATE_BONDED || transaction.type === transaction_1.TransactionType.AGGREGATE_COMPLETE) {
        const aggregateTx = transaction;
        return {
            transactions: aggregateTx.innerTransactions.map((innerTransaction) => {
                return innerTransaction.toJSON();
            }),
            cosignatures: aggregateTx.cosignatures.map((cosignature) => {
                return cosignature.toDTO();
            }),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.HASH_LOCK) {
        const lockFundsTransaction = transaction;
        return {
            tokenId: lockFundsTransaction.token.id.toHex(),
            amount: lockFundsTransaction.token.amount.toString(),
            duration: lockFundsTransaction.duration.toString(),
            hash: lockFundsTransaction.hash,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION) {
        const accountAddressRestrictionTx = transaction;
        return {
            restrictionFlags: accountAddressRestrictionTx.restrictionFlags,
            restrictionAdditionsCount: accountAddressRestrictionTx.restrictionAdditions.length,
            restrictionDeletionsCount: accountAddressRestrictionTx.restrictionDeletions.length,
            restrictionAdditions: accountAddressRestrictionTx.restrictionAdditions.map((addition) => {
                return addition.toDTO();
            }),
            restrictionDeletions: accountAddressRestrictionTx.restrictionDeletions.map((deletion) => {
                return deletion.toDTO();
            }),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.ACCOUNT_OPERATION_RESTRICTION) {
        const accountOperationRestrictionTx = transaction;
        return {
            restrictionFlags: accountOperationRestrictionTx.restrictionFlags,
            restrictionAdditionsCount: accountOperationRestrictionTx.restrictionAdditions.length,
            restrictionDeletionsCount: accountOperationRestrictionTx.restrictionDeletions.length,
            restrictionAdditions: accountOperationRestrictionTx.restrictionAdditions.map((addition) => {
                return addition;
            }),
            restrictionDeletions: accountOperationRestrictionTx.restrictionDeletions.map((deletion) => {
                return deletion;
            }),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.ACCOUNT_TOKEN_RESTRICTION) {
        const accountTokenRestrictionTx = transaction;
        return {
            restrictionFlags: accountTokenRestrictionTx.restrictionFlags,
            restrictionAdditionsCount: accountTokenRestrictionTx.restrictionAdditions.length,
            restrictionDeletionsCount: accountTokenRestrictionTx.restrictionDeletions.length,
            restrictionAdditions: accountTokenRestrictionTx.restrictionAdditions.map((addition) => {
                return addition.toHex();
            }),
            restrictionDeletions: accountTokenRestrictionTx.restrictionDeletions.map((deletion) => {
                return deletion.toHex();
            }),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
        const multisigTx = transaction;
        return {
            minApprovalDelta: multisigTx.minApprovalDelta,
            minRemovalDelta: multisigTx.minRemovalDelta,
            addressAdditions: multisigTx.addressAdditions.map((addition) => {
                return addition.toDTO();
            }),
            addressDeletions: multisigTx.addressDeletions.map((deletion) => {
                return deletion.toDTO();
            }),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_ALIAS) {
        const tokenAliasTx = transaction;
        return {
            aliasAction: tokenAliasTx.aliasAction,
            namespaceId: tokenAliasTx.namespaceId.toHex(),
            tokenId: tokenAliasTx.tokenId.toHex(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_DEFINITION) {
        const tokenDefinitionTx = transaction;
        return {
            nonce: tokenDefinitionTx.nonce.toDTO(),
            id: tokenDefinitionTx.tokenId.toHex(),
            flags: tokenDefinitionTx.flags.getValue(),
            divisibility: tokenDefinitionTx.divisibility,
            duration: tokenDefinitionTx.duration.toString(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_SUPPLY_CHANGE) {
        const tokenSupplyTx = transaction;
        return {
            tokenId: tokenSupplyTx.tokenId.toHex(),
            action: tokenSupplyTx.action,
            delta: tokenSupplyTx.delta.toString(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_SUPPLY_REVOCATION) {
        const tokenSupplyTx = transaction;
        return {
            sourceAddress: tokenSupplyTx.sourceAddress.toDTO(),
            tokenId: tokenSupplyTx.token.id.toHex(),
            amount: tokenSupplyTx.token.amount.toString(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.NAMESPACE_REGISTRATION) {
        const namespaceTx = transaction;
        const registerNamespaceDuration = namespaceTx.duration;
        const registerNamespaceParentId = namespaceTx.parentId;
        const jsonObject = {
            registrationType: namespaceTx.registrationType,
            name: namespaceTx.namespaceName,
            id: namespaceTx.namespaceId.toHex(),
        };
        if (registerNamespaceDuration) {
            Object.assign(jsonObject, {
                duration: registerNamespaceDuration.toString(),
            });
        }
        if (registerNamespaceParentId) {
            Object.assign(jsonObject, {
                parentId: registerNamespaceParentId.toHex(),
            });
        }
        return jsonObject;
    }
    else if (transaction.type === transaction_1.TransactionType.SECRET_LOCK) {
        const secretLockTx = transaction;
        return {
            tokenId: secretLockTx.token.id.id.toHex(),
            amount: secretLockTx.token.amount.toString(),
            duration: secretLockTx.duration.toString(),
            hashAlgorithm: secretLockTx.hashAlgorithm,
            secret: secretLockTx.secret,
            recipientAddress: secretLockTx.recipientAddress.toDTO(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.SECRET_PROOF) {
        const secretProofTx = transaction;
        return {
            hashAlgorithm: secretProofTx.hashAlgorithm,
            secret: secretProofTx.secret,
            recipientAddress: secretProofTx.recipientAddress.toDTO(),
            proof: secretProofTx.proof,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TRANSFER) {
        const transferTx = transaction;
        const messageObject = {
            recipientAddress: transferTx.recipientAddress.toDTO(),
            tokens: transferTx.tokens.map((token) => {
                return token.toDTO();
            }),
        };
        if (transferTx.message.toDTO().length) {
            Object.assign(messageObject, {
                message: transferTx.message.toDTO(),
            });
        }
        return messageObject;
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_GLOBAL_RESTRICTION) {
        const tokenGlobalRestrictionTx = transaction;
        return {
            tokenId: tokenGlobalRestrictionTx.tokenId.toHex(),
            referenceTokenId: tokenGlobalRestrictionTx.referenceTokenId.toHex(),
            restrictionKey: tokenGlobalRestrictionTx.restrictionKey.toHex(),
            previousRestrictionValue: tokenGlobalRestrictionTx.previousRestrictionValue.toString(),
            previousRestrictionType: tokenGlobalRestrictionTx.previousRestrictionType,
            newRestrictionValue: tokenGlobalRestrictionTx.newRestrictionValue.toString(),
            newRestrictionType: tokenGlobalRestrictionTx.newRestrictionType,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_ADDRESS_RESTRICTION) {
        const tokenAddressRestrictionTx = transaction;
        return {
            tokenId: tokenAddressRestrictionTx.tokenId.toHex(),
            restrictionKey: tokenAddressRestrictionTx.restrictionKey.toHex(),
            targetAddress: tokenAddressRestrictionTx.targetAddress.toDTO(),
            previousRestrictionValue: tokenAddressRestrictionTx.previousRestrictionValue.toString(),
            newRestrictionValue: tokenAddressRestrictionTx.newRestrictionValue.toString(),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.ACCOUNT_METADATA) {
        const accountMetadataTx = transaction;
        return {
            targetAddress: accountMetadataTx.targetAddress,
            scopedMetadataKey: accountMetadataTx.scopedMetadataKey.toHex(),
            valueSizeDelta: accountMetadataTx.valueSizeDelta,
            valueSize: accountMetadataTx.value.length,
            value: __1.Convert.uint8ToHex(accountMetadataTx.value),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.TOKEN_METADATA) {
        const tokenMetadataTx = transaction;
        return {
            targetAddress: tokenMetadataTx.targetAddress,
            scopedMetadataKey: tokenMetadataTx.scopedMetadataKey.toHex(),
            valueSizeDelta: tokenMetadataTx.valueSizeDelta,
            targetTokenId: tokenMetadataTx.targetTokenId.id.toHex(),
            valueSize: tokenMetadataTx.value.length,
            value: __1.Convert.uint8ToHex(tokenMetadataTx.value),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.NAMESPACE_METADATA) {
        const namespaceMetaTx = transaction;
        return {
            targetAddress: namespaceMetaTx.targetAddress,
            scopedMetadataKey: namespaceMetaTx.scopedMetadataKey.toHex(),
            valueSizeDelta: namespaceMetaTx.valueSizeDelta,
            targetNamespaceId: namespaceMetaTx.targetNamespaceId.id.toHex(),
            valueSize: namespaceMetaTx.value.length,
            value: __1.Convert.uint8ToHex(namespaceMetaTx.value),
        };
    }
    else if (transaction.type === transaction_1.TransactionType.VRF_KEY_LINK) {
        const vrfKeyLinkTx = transaction;
        return {
            linkedPublicKey: vrfKeyLinkTx.linkedPublicKey,
            linkAction: vrfKeyLinkTx.linkAction,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.NODE_KEY_LINK) {
        const nodeKeyLinkTx = transaction;
        return {
            linkedPublicKey: nodeKeyLinkTx.linkedPublicKey,
            linkAction: nodeKeyLinkTx.linkAction,
        };
    }
    else if (transaction.type === transaction_1.TransactionType.VOTING_KEY_LINK && version == transaction_1.TransactionVersion.VOTING_KEY_LINK) {
        const votingKeyLinkTx = transaction;
        return {
            linkedPublicKey: votingKeyLinkTx.linkedPublicKey,
            startEpoch: votingKeyLinkTx.startEpoch,
            endEpoch: votingKeyLinkTx.endEpoch,
            linkAction: votingKeyLinkTx.linkAction,
        };
    }
    else {
        throw new Error(`Transaction type ${transaction.type} not implemented yet for version ${version}.`);
    }
};
exports.SerializeTransactionToJSON = SerializeTransactionToJSON;
//# sourceMappingURL=SerializeTransactionToJSON.js.map