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

import { Convert } from '../..';
import {
    AccountAddressRestrictionTransaction,
    AccountKeyLinkTransaction,
    AccountMetadataTransaction,
    AccountOperationRestrictionTransaction,
    AccountTokenRestrictionTransaction,
    AddressAliasTransaction,
    AggregateTransaction,
    LockFundsTransaction,
    MultisigAccountModificationTransaction,
    NamespaceMetadataTransaction,
    NamespaceRegistrationTransaction,
    NodeKeyLinkTransaction,
    SecretLockTransaction,
    SecretProofTransaction,
    TokenAddressRestrictionTransaction,
    TokenAliasTransaction,
    TokenDefinitionTransaction,
    TokenGlobalRestrictionTransaction,
    TokenMetadataTransaction,
    TokenSupplyChangeTransaction,
    TokenSupplyRevocationTransaction,
    Transaction,
    TransactionType,
    TransactionVersion,
    TransferTransaction,
    VotingKeyLinkTransaction,
    VrfKeyLinkTransaction,
} from '../../model/transaction';

/**
 * @internal
 * @param transaction - The transaction class object
 * @returns JSON object
 * @constructor
 */
export const SerializeTransactionToJSON = (transaction: Transaction): any => {
    const version = transaction.version;
    if (transaction.type === TransactionType.ACCOUNT_KEY_LINK) {
        const accountLinkTx = transaction as AccountKeyLinkTransaction;
        return {
            linkedPublicKey: accountLinkTx.linkedPublicKey,
            linkAction: accountLinkTx.linkAction,
        };
    } else if (transaction.type === TransactionType.ADDRESS_ALIAS) {
        const addressAliasTx = transaction as AddressAliasTransaction;
        return {
            aliasAction: addressAliasTx.aliasAction,
            namespaceId: addressAliasTx.namespaceId.toHex(),
            address: addressAliasTx.address.toDTO(),
        };
    } else if (transaction.type === TransactionType.AGGREGATE_BONDED || transaction.type === TransactionType.AGGREGATE_COMPLETE) {
        const aggregateTx = transaction as AggregateTransaction;
        return {
            transactions: aggregateTx.innerTransactions.map((innerTransaction) => {
                return innerTransaction.toJSON();
            }),
            cosignatures: aggregateTx.cosignatures.map((cosignature) => {
                return cosignature.toDTO();
            }),
        };
    } else if (transaction.type === TransactionType.HASH_LOCK) {
        const lockFundsTransaction = transaction as LockFundsTransaction;
        return {
            tokenId: lockFundsTransaction.token.id.toHex(),
            amount: lockFundsTransaction.token.amount.toString(),
            duration: lockFundsTransaction.duration.toString(),
            hash: lockFundsTransaction.hash,
        };
    } else if (transaction.type === TransactionType.ACCOUNT_ADDRESS_RESTRICTION) {
        const accountAddressRestrictionTx = transaction as AccountAddressRestrictionTransaction;
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
    } else if (transaction.type === TransactionType.ACCOUNT_OPERATION_RESTRICTION) {
        const accountOperationRestrictionTx = transaction as AccountOperationRestrictionTransaction;
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
    } else if (transaction.type === TransactionType.ACCOUNT_TOKEN_RESTRICTION) {
        const accountTokenRestrictionTx = transaction as AccountTokenRestrictionTransaction;
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
    } else if (transaction.type === TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
        const multisigTx = transaction as MultisigAccountModificationTransaction;
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
    } else if (transaction.type === TransactionType.TOKEN_ALIAS) {
        const tokenAliasTx = transaction as TokenAliasTransaction;
        return {
            aliasAction: tokenAliasTx.aliasAction,
            namespaceId: tokenAliasTx.namespaceId.toHex(),
            tokenId: tokenAliasTx.tokenId.toHex(),
        };
    } else if (transaction.type === TransactionType.TOKEN_DEFINITION) {
        const tokenDefinitionTx = transaction as TokenDefinitionTransaction;
        return {
            nonce: tokenDefinitionTx.nonce.toDTO(),
            id: tokenDefinitionTx.tokenId.toHex(),
            flags: tokenDefinitionTx.flags.getValue(),
            divisibility: tokenDefinitionTx.divisibility,
            duration: tokenDefinitionTx.duration.toString(),
        };
    } else if (transaction.type === TransactionType.TOKEN_SUPPLY_CHANGE) {
        const tokenSupplyTx = transaction as TokenSupplyChangeTransaction;
        return {
            tokenId: tokenSupplyTx.tokenId.toHex(),
            action: tokenSupplyTx.action,
            delta: tokenSupplyTx.delta.toString(),
        };
    } else if (transaction.type === TransactionType.TOKEN_SUPPLY_REVOCATION) {
        const tokenSupplyTx = transaction as TokenSupplyRevocationTransaction;
        return {
            sourceAddress: tokenSupplyTx.sourceAddress.toDTO(),
            tokenId: tokenSupplyTx.token.id.toHex(),
            amount: tokenSupplyTx.token.amount.toString(),
        };
    } else if (transaction.type === TransactionType.NAMESPACE_REGISTRATION) {
        const namespaceTx = transaction as NamespaceRegistrationTransaction;
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
    } else if (transaction.type === TransactionType.SECRET_LOCK) {
        const secretLockTx = transaction as SecretLockTransaction;
        return {
            tokenId: secretLockTx.token.id.id.toHex(),
            amount: secretLockTx.token.amount.toString(),
            duration: secretLockTx.duration.toString(),
            hashAlgorithm: secretLockTx.hashAlgorithm,
            secret: secretLockTx.secret,
            recipientAddress: secretLockTx.recipientAddress.toDTO(),
        };
    } else if (transaction.type === TransactionType.SECRET_PROOF) {
        const secretProofTx = transaction as SecretProofTransaction;
        return {
            hashAlgorithm: secretProofTx.hashAlgorithm,
            secret: secretProofTx.secret,
            recipientAddress: secretProofTx.recipientAddress.toDTO(),
            proof: secretProofTx.proof,
        };
    } else if (transaction.type === TransactionType.TRANSFER) {
        const transferTx = transaction as TransferTransaction;
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
    } else if (transaction.type === TransactionType.TOKEN_GLOBAL_RESTRICTION) {
        const tokenGlobalRestrictionTx = transaction as TokenGlobalRestrictionTransaction;
        return {
            tokenId: tokenGlobalRestrictionTx.tokenId.toHex(),
            referenceTokenId: tokenGlobalRestrictionTx.referenceTokenId.toHex(),
            restrictionKey: tokenGlobalRestrictionTx.restrictionKey.toHex(),
            previousRestrictionValue: tokenGlobalRestrictionTx.previousRestrictionValue.toString(),
            previousRestrictionType: tokenGlobalRestrictionTx.previousRestrictionType,
            newRestrictionValue: tokenGlobalRestrictionTx.newRestrictionValue.toString(),
            newRestrictionType: tokenGlobalRestrictionTx.newRestrictionType,
        };
    } else if (transaction.type === TransactionType.TOKEN_ADDRESS_RESTRICTION) {
        const tokenAddressRestrictionTx = transaction as TokenAddressRestrictionTransaction;
        return {
            tokenId: tokenAddressRestrictionTx.tokenId.toHex(),
            restrictionKey: tokenAddressRestrictionTx.restrictionKey.toHex(),
            targetAddress: tokenAddressRestrictionTx.targetAddress.toDTO(),
            previousRestrictionValue: tokenAddressRestrictionTx.previousRestrictionValue.toString(),
            newRestrictionValue: tokenAddressRestrictionTx.newRestrictionValue.toString(),
        };
    } else if (transaction.type === TransactionType.ACCOUNT_METADATA) {
        const accountMetadataTx = transaction as AccountMetadataTransaction;
        return {
            targetAddress: accountMetadataTx.targetAddress,
            scopedMetadataKey: accountMetadataTx.scopedMetadataKey.toHex(),
            valueSizeDelta: accountMetadataTx.valueSizeDelta,
            valueSize: accountMetadataTx.value.length,
            value: Convert.uint8ToHex(accountMetadataTx.value),
        };
    } else if (transaction.type === TransactionType.TOKEN_METADATA) {
        const tokenMetadataTx = transaction as TokenMetadataTransaction;
        return {
            targetAddress: tokenMetadataTx.targetAddress,
            scopedMetadataKey: tokenMetadataTx.scopedMetadataKey.toHex(),
            valueSizeDelta: tokenMetadataTx.valueSizeDelta,
            targetTokenId: tokenMetadataTx.targetTokenId.id.toHex(),
            valueSize: tokenMetadataTx.value.length,
            value: Convert.uint8ToHex(tokenMetadataTx.value),
        };
    } else if (transaction.type === TransactionType.NAMESPACE_METADATA) {
        const namespaceMetaTx = transaction as NamespaceMetadataTransaction;
        return {
            targetAddress: namespaceMetaTx.targetAddress,
            scopedMetadataKey: namespaceMetaTx.scopedMetadataKey.toHex(),
            valueSizeDelta: namespaceMetaTx.valueSizeDelta,
            targetNamespaceId: namespaceMetaTx.targetNamespaceId.id.toHex(),
            valueSize: namespaceMetaTx.value.length,
            value: Convert.uint8ToHex(namespaceMetaTx.value),
        };
    } else if (transaction.type === TransactionType.VRF_KEY_LINK) {
        const vrfKeyLinkTx = transaction as VrfKeyLinkTransaction;
        return {
            linkedPublicKey: vrfKeyLinkTx.linkedPublicKey,
            linkAction: vrfKeyLinkTx.linkAction,
        };
    } else if (transaction.type === TransactionType.NODE_KEY_LINK) {
        const nodeKeyLinkTx = transaction as NodeKeyLinkTransaction;
        return {
            linkedPublicKey: nodeKeyLinkTx.linkedPublicKey,
            linkAction: nodeKeyLinkTx.linkAction,
        };
    } else if (transaction.type === TransactionType.VOTING_KEY_LINK && version == TransactionVersion.VOTING_KEY_LINK) {
        const votingKeyLinkTx = transaction as VotingKeyLinkTransaction;
        return {
            linkedPublicKey: votingKeyLinkTx.linkedPublicKey,
            startEpoch: votingKeyLinkTx.startEpoch,
            endEpoch: votingKeyLinkTx.endEpoch,
            linkAction: votingKeyLinkTx.linkAction,
        };
    } else {
        throw new Error(`Transaction type ${transaction.type} not implemented yet for version ${version}.`);
    }
};
