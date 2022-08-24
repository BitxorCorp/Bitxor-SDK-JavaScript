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
exports.AccountMetadataTransaction = void 0;
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
 * Announce an account metadata transaction to associate a key-value state to an account.
 */
class AccountMetadataTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param targetAddress
     * @param scopedMetadataKey
     * @param valueSizeDelta
     * @param value
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * target account address.
     */
    targetAddress, 
    /**
     * Metadata key scoped to source, target and type.
     */
    scopedMetadataKey, 
    /**
     * Change in value size in bytes.
     */
    valueSizeDelta, 
    /**
     * xor of previous and the new value
     * Difference between the previous value and new value.
     */
    value, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.ACCOUNT_METADATA, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    /**
     * Create a account meta data transaction object
     * @param deadline - transaction deadline
     * @param targetAddress - target account address.
     * @param scopedMetadataKey - Metadata key scoped to source, target and type.
     * @param valueSizeDelta - Change in value size in bytes.
     * @param value - Difference between the previous value and new value.
     *                You can calculate value as xor(previous-value, new-value).
     *                If there is no previous value, use directly the new value.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountMetadataTransaction}
     */
    static create(deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new AccountMetadataTransaction(networkType, TransactionVersion_1.TransactionVersion.ACCOUNT_METADATA, deadline, maxFee, targetAddress, scopedMetadataKey, valueSizeDelta, value, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.AccountMetadataTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = AccountMetadataTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(builder.getTargetAddress().unresolvedAddress)), new UInt64_1.UInt64(builder.getScopedMetadataKey()), builder.getValueSizeDelta(), builder.getValue(), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.AccountMetadataTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_METADATA.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)), this.scopedMetadataKey.toDTO(), this.valueSizeDelta, this.value);
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedAccountMetadataTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_METADATA.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)), this.scopedMetadataKey.toDTO(), this.valueSizeDelta, this.value);
    }
    /**
     * @internal
     * @returns {AccountMetadataTransaction}
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
        return super.isSigned(address) || this.targetAddress.equals(address);
    }
}
exports.AccountMetadataTransaction = AccountMetadataTransaction;
//# sourceMappingURL=AccountMetadataTransaction.js.map