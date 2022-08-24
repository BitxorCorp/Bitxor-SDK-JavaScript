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
exports.MultisigAccountModificationTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const PublicAccount_1 = require("../account/PublicAccount");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Modify multisig account transactions are part of the Bitxor's multisig account system.
 * A modify multisig account transaction holds an array of multisig cosignatory modifications,
 * min number of signatures to approve a transaction and a min number of signatures to remove a cosignatory.
 * @since 1.0
 */
class MultisigAccountModificationTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param minApprovalDelta
     * @param minRemovalDelta
     * @param addressAdditions
     * @param addressDeletions
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The number of signatures needed to approve a transaction.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    minApprovalDelta, 
    /**
     * The number of signatures needed to remove a cosignatory.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    minRemovalDelta, 
    /**
     * The Cosignatory address additions.
     */
    addressAdditions, 
    /**
     * The Cosignatory address deletion.
     */
    addressDeletions, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.minApprovalDelta = minApprovalDelta;
        this.minRemovalDelta = minRemovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }
    /**
     * Create a modify multisig account transaction object
     * @param deadline - The deadline to include the transaction.
     * @param minApprovalDelta - The min approval relative change.
     * @param minRemovalDelta - The min removal relative change.
     * @param addressAdditions - Cosignatory address additions.
     * @param addressDeletions - Cosignatory address deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {MultisigAccountModificationTransaction}
     */
    static create(deadline, minApprovalDelta, minRemovalDelta, addressAdditions, addressDeletions, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new MultisigAccountModificationTransaction(networkType, TransactionVersion_1.TransactionVersion.MULTISIG_ACCOUNT_MODIFICATION, deadline, maxFee, minApprovalDelta, minRemovalDelta, addressAdditions, addressDeletions, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.MultisigAccountModificationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = MultisigAccountModificationTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), builder.getMinApprovalDelta(), builder.getMinRemovalDelta(), builder.getAddressAdditions().map((addition) => {
            return UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(addition.unresolvedAddress));
        }), builder.getAddressDeletions().map((deletion) => {
            return UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(deletion.unresolvedAddress));
        }), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.MultisigAccountModificationTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), this.minRemovalDelta, this.minApprovalDelta, this.addressAdditions.map((addition) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(addition.encodeUnresolvedAddress(this.networkType));
        }), this.addressDeletions.map((deletion) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(deletion.encodeUnresolvedAddress(this.networkType));
        }));
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedMultisigAccountModificationTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.MULTISIG_ACCOUNT_MODIFICATION.valueOf(), this.minRemovalDelta, this.minApprovalDelta, this.addressAdditions.map((addition) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(addition.encodeUnresolvedAddress(this.networkType));
        }), this.addressDeletions.map((deletion) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(deletion.encodeUnresolvedAddress(this.networkType));
        }));
    }
    /**
     * @internal
     * @returns {MultisigAccountModificationTransaction}
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
        return (super.isSigned(address) ||
            this.addressAdditions.find((_) => _.equals(address)) !== undefined ||
            this.addressDeletions.find((_) => _.equals(address)) !== undefined);
    }
}
exports.MultisigAccountModificationTransaction = MultisigAccountModificationTransaction;
//# sourceMappingURL=MultisigAccountModificationTransaction.js.map