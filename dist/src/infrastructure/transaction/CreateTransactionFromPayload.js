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
exports.CreateTransactionFromPayload = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const transaction_1 = require("../../model/transaction");
/**
 * @internal
 * @param payload - The transaction binary data
 * @param isEmbedded - Is the transaction an embedded inner transaction
 * @returns {Transaction | InnerTransaction}
 * @constructor
 */
const CreateTransactionFromPayload = (payload, isEmbedded = false) => {
    const transactionBuilder = isEmbedded
        ? bitxor_catbuffer_typescript_1.EmbeddedTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
        : bitxor_catbuffer_typescript_1.TransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
    const type = transactionBuilder.getType().valueOf();
    const version = transactionBuilder.getVersion();
    if (type === transaction_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION) {
        return transaction_1.AccountAddressRestrictionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.ACCOUNT_TOKEN_RESTRICTION) {
        return transaction_1.AccountTokenRestrictionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.ACCOUNT_OPERATION_RESTRICTION) {
        return transaction_1.AccountOperationRestrictionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.ACCOUNT_KEY_LINK) {
        return transaction_1.AccountKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.ADDRESS_ALIAS) {
        return transaction_1.AddressAliasTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_ALIAS) {
        return transaction_1.TokenAliasTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_DEFINITION) {
        return transaction_1.TokenDefinitionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_SUPPLY_CHANGE) {
        return transaction_1.TokenSupplyChangeTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.NAMESPACE_REGISTRATION) {
        return transaction_1.NamespaceRegistrationTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TRANSFER) {
        return transaction_1.TransferTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.SECRET_LOCK) {
        return transaction_1.SecretLockTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.SECRET_PROOF) {
        return transaction_1.SecretProofTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION) {
        return transaction_1.MultisigAccountModificationTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.HASH_LOCK) {
        return transaction_1.LockFundsTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_GLOBAL_RESTRICTION) {
        return transaction_1.TokenGlobalRestrictionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_ADDRESS_RESTRICTION) {
        return transaction_1.TokenAddressRestrictionTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.ACCOUNT_METADATA) {
        return transaction_1.AccountMetadataTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_METADATA) {
        return transaction_1.TokenMetadataTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.NAMESPACE_METADATA) {
        return transaction_1.NamespaceMetadataTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.VRF_KEY_LINK) {
        return transaction_1.VrfKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.TOKEN_SUPPLY_REVOCATION) {
        return transaction_1.TokenSupplyRevocationTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.NODE_KEY_LINK) {
        return transaction_1.NodeKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.VOTING_KEY_LINK && version == transaction_1.TransactionVersion.VOTING_KEY_LINK) {
        return transaction_1.VotingKeyLinkTransaction.createFromPayload(payload, isEmbedded);
    }
    else if (type === transaction_1.TransactionType.AGGREGATE_COMPLETE || type === transaction_1.TransactionType.AGGREGATE_BONDED) {
        return transaction_1.AggregateTransaction.createFromPayload(payload);
    }
    else {
        throw new Error(`Transaction type ${type} not implemented yet for version ${version}.`);
    }
};
exports.CreateTransactionFromPayload = CreateTransactionFromPayload;
//# sourceMappingURL=CreateTransactionFromPayload.js.map