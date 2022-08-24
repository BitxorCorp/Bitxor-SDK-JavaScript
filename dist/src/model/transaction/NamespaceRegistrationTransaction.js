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
exports.NamespaceRegistrationTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const Utilities = require("../../core/format/Utilities");
const transaction_1 = require("../../infrastructure/transaction");
const account_1 = require("../account");
const namespace_1 = require("../namespace");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Accounts can rent a namespace for an amount of blocks and after a this renew the contract.
 * This is done via a NamespaceRegistrationTransaction.
 */
class NamespaceRegistrationTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param registrationType
     * @param namespaceName
     * @param namespaceId
     * @param duration
     * @param parentId
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The namespace type could be namespace or sub namespace
     */
    registrationType, 
    /**
     * The namespace name
     */
    namespaceName, 
    /**
     * The id of the namespace derived from namespaceName.
     * When creating a sub namespace the namespaceId is derived from namespaceName and parentName.
     */
    namespaceId, 
    /**
     * The number of blocks a namespace is active
     */
    duration, 
    /**
     * The id of the parent sub namespace
     */
    parentId, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.NAMESPACE_REGISTRATION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.registrationType = registrationType;
        this.namespaceName = namespaceName;
        this.namespaceId = namespaceId;
        this.duration = duration;
        this.parentId = parentId;
    }
    /**
     * Create a root namespace object
     * @param deadline - The deadline to include the transaction.
     * @param namespaceName - The namespace name.
     * @param duration - The duration of the namespace.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {NamespaceRegistrationTransaction}
     */
    static createRootNamespace(deadline, namespaceName, duration, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new NamespaceRegistrationTransaction(networkType, TransactionVersion_1.TransactionVersion.NAMESPACE_REGISTRATION, deadline, maxFee, namespace_1.NamespaceRegistrationType.RootNamespace, namespaceName, new namespace_1.NamespaceId(namespaceName), duration, undefined, signature, signer);
    }
    /**
     * Create a sub namespace object
     * @param deadline - The deadline to include the transaction.
     * @param namespaceName - The namespace name.
     * @param parentNamespace - The parent namespace name.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - Transaction signature
     * @param signer - Signer public account
     * @returns {NamespaceRegistrationTransaction}
     */
    static createSubNamespace(deadline, namespaceName, parentNamespace, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        let parentId;
        if (typeof parentNamespace === 'string') {
            parentId = new namespace_1.NamespaceId(transaction_1.NamespaceTokenIdGenerator.subnamespaceParentId(parentNamespace, namespaceName));
        }
        else {
            parentId = parentNamespace;
        }
        const namespaceId = typeof parentNamespace === 'string'
            ? new namespace_1.NamespaceId(transaction_1.NamespaceTokenIdGenerator.subnamespaceNamespaceId(parentNamespace, namespaceName))
            : new namespace_1.NamespaceId(Utilities.generateNamespaceId(parentId.id.toDTO(), namespaceName));
        return new NamespaceRegistrationTransaction(networkType, TransactionVersion_1.TransactionVersion.NAMESPACE_REGISTRATION, deadline, maxFee, namespace_1.NamespaceRegistrationType.SubNamespace, namespaceName, namespaceId, undefined, parentId, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.NamespaceRegistrationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const registrationType = builder.getRegistrationType().valueOf();
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = registrationType === namespace_1.NamespaceRegistrationType.RootNamespace
            ? NamespaceRegistrationTransaction.createRootNamespace(isEmbedded
                ? Deadline_1.Deadline.createEmtpy()
                : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), format_1.Convert.decodeHex(format_1.Convert.uint8ToHex(builder.getName())), new UInt64_1.UInt64(builder.getDuration().blockDuration), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType))
            : NamespaceRegistrationTransaction.createSubNamespace(isEmbedded
                ? Deadline_1.Deadline.createEmtpy()
                : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), format_1.Convert.decodeHex(format_1.Convert.uint8ToHex(builder.getName())), new namespace_1.NamespaceId(builder.getParentId().namespaceId), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        let transactionBuilder;
        if (this.registrationType === namespace_1.NamespaceRegistrationType.RootNamespace) {
            transactionBuilder = bitxor_catbuffer_typescript_1.NamespaceRegistrationTransactionBuilder.createNamespaceRegistrationTransactionBuilderROOT(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.NAMESPACE_REGISTRATION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), this.namespaceId.toBuilder(), format_1.Convert.hexToUint8(format_1.Convert.utf8ToHex(this.namespaceName)));
        }
        else {
            transactionBuilder = bitxor_catbuffer_typescript_1.NamespaceRegistrationTransactionBuilder.createNamespaceRegistrationTransactionBuilderCHILD(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.NAMESPACE_REGISTRATION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), this.parentId.toBuilder(), this.namespaceId.toBuilder(), format_1.Convert.hexToUint8(format_1.Convert.utf8ToHex(this.namespaceName)));
        }
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        if (this.registrationType === namespace_1.NamespaceRegistrationType.RootNamespace) {
            return bitxor_catbuffer_typescript_1.EmbeddedNamespaceRegistrationTransactionBuilder.createEmbeddedNamespaceRegistrationTransactionBuilderROOT(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.NAMESPACE_REGISTRATION.valueOf(), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), this.namespaceId.toBuilder(), format_1.Convert.hexToUint8(format_1.Convert.utf8ToHex(this.namespaceName)));
        }
        return bitxor_catbuffer_typescript_1.EmbeddedNamespaceRegistrationTransactionBuilder.createEmbeddedNamespaceRegistrationTransactionBuilderCHILD(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.NAMESPACE_REGISTRATION.valueOf(), this.parentId.toBuilder(), this.namespaceId.toBuilder(), format_1.Convert.hexToUint8(format_1.Convert.utf8ToHex(this.namespaceName)));
    }
    /**
     * @internal
     * @returns {NamespaceRegistrationTransaction}
     */
    resolveAliases() {
        return this;
    }
    /**
     * @internal
     * Check a given address should be notified in websocket channels
     * @param address address to be notified
     * @returns {boolean}
     */
    shouldNotifyAccount(address) {
        return super.isSigned(address);
    }
}
exports.NamespaceRegistrationTransaction = NamespaceRegistrationTransaction;
//# sourceMappingURL=NamespaceRegistrationTransaction.js.map