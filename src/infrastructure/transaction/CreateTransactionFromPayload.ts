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

import { EmbeddedTransactionBuilder, TransactionBuilder } from 'bitxor-catbuffer-typescript';
import { Convert as convert } from '../../core/format';
import {
    AccountAddressRestrictionTransaction,
    AccountKeyLinkTransaction,
    AccountMetadataTransaction,
    AccountOperationRestrictionTransaction,
    AccountTokenRestrictionTransaction,
    AddressAliasTransaction,
    AggregateTransaction,
    InnerTransaction,
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
 * @param payload - The transaction binary data
 * @param isEmbedded - Is the transaction an embedded inner transaction
 * @returns {Transaction | InnerTransaction}
 * @constructor
 */
export const CreateTransactionFromPayload = (payload: string, isEmbedded = false): Transaction | InnerTransaction => {
    const transactionBuilder = isEmbedded
        ? EmbeddedTransactionBuilder.loadFromBinary(convert.hexToUint8(payload))
        : TransactionBuilder.loadFromBinary(convert.hexToUint8(payload));
    const type = transactionBuilder.getType().valueOf();
    const version = transactionBuilder.getVersion();
    if (type === TransactionType.ACCOUNT_ADDRESS_RESTRICTION) {
        return AccountAddressRestrictionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.ACCOUNT_TOKEN_RESTRICTION) {
        return AccountTokenRestrictionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.ACCOUNT_OPERATION_RESTRICTION) {
        return AccountOperationRestrictionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.ACCOUNT_KEY_LINK) {
        return AccountKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.ADDRESS_ALIAS) {
        return AddressAliasTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_ALIAS) {
        return TokenAliasTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_DEFINITION) {
        return TokenDefinitionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_SUPPLY_CHANGE) {
        return TokenSupplyChangeTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.NAMESPACE_REGISTRATION) {
        return NamespaceRegistrationTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TRANSFER) {
        return TransferTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.SECRET_LOCK) {
        return SecretLockTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.SECRET_PROOF) {
        return SecretProofTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
        return MultisigAccountModificationTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.HASH_LOCK) {
        return LockFundsTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_GLOBAL_RESTRICTION) {
        return TokenGlobalRestrictionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_ADDRESS_RESTRICTION) {
        return TokenAddressRestrictionTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.ACCOUNT_METADATA) {
        return AccountMetadataTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_METADATA) {
        return TokenMetadataTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.NAMESPACE_METADATA) {
        return NamespaceMetadataTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.VRF_KEY_LINK) {
        return VrfKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.TOKEN_SUPPLY_REVOCATION) {
        return TokenSupplyRevocationTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.NODE_KEY_LINK) {
        return NodeKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.VOTING_KEY_LINK && version == TransactionVersion.VOTING_KEY_LINK) {
        return VotingKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    } else if (type === TransactionType.AGGREGATE_COMPLETE || type === TransactionType.AGGREGATE_BONDED) {
        return AggregateTransaction.createFromPayload(payload);
    } else {
        throw new Error(`Transaction type ${type} not implemented yet for version ${version}.`);
    }
};
