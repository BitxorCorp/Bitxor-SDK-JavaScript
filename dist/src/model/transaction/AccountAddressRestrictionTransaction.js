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
exports.AccountAddressRestrictionTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const utils_1 = require("../../core/utils");
const account_1 = require("../account");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
class AccountAddressRestrictionTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param restrictionFlags
     * @param restrictionAdditions
     * @param restrictionDeletions
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, restrictionFlags, restrictionAdditions, restrictionDeletions, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    /**
     * Create a modify account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - The account restriction flags.
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountAddressRestrictionTransaction}
     */
    static create(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new AccountAddressRestrictionTransaction(networkType, TransactionVersion_1.TransactionVersion.ACCOUNT_ADDRESS_RESTRICTION, deadline, maxFee, restrictionFlags, restrictionAdditions, restrictionDeletions, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.AccountAddressRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = AccountAddressRestrictionTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), bitxor_catbuffer_typescript_1.GeneratorUtils.fromFlags(bitxor_catbuffer_typescript_1.AccountRestrictionFlagsDto, builder.getRestrictionFlags()), builder.getRestrictionAdditions().map((addition) => {
            return utils_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(addition.unresolvedAddress));
        }), builder.getRestrictionDeletions().map((deletion) => {
            return utils_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(deletion.unresolvedAddress));
        }), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.AccountAddressRestrictionTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.AccountRestrictionFlagsDto, this.restrictionFlags.valueOf()), this.restrictionAdditions.map((addition) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(addition.encodeUnresolvedAddress(this.networkType));
        }), this.restrictionDeletions.map((deletion) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(deletion.encodeUnresolvedAddress(this.networkType));
        }));
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedAccountAddressRestrictionTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_ADDRESS_RESTRICTION.valueOf(), bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.AccountRestrictionFlagsDto, this.restrictionFlags.valueOf()), this.restrictionAdditions.map((addition) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(addition.encodeUnresolvedAddress(this.networkType));
        }), this.restrictionDeletions.map((deletion) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(deletion.encodeUnresolvedAddress(this.networkType));
        }));
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {AccountAddressRestrictionTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return utils_1.DtoMapping.assign(this, {
            restrictionAdditions: this.restrictionAdditions.map((addition) => statement.resolveAddress(addition, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex)),
            restrictionDeletions: this.restrictionDeletions.map((deletion) => statement.resolveAddress(deletion, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex)),
        });
    }
    /**
     * @internal
     * Check a given address should be notified in websocket channels
     * @param address address to be notified
     * @returns {boolean}
     */
    shouldNotifyAccount(address) {
        return (super.isSigned(address) ||
            this.restrictionAdditions.find((_) => _.equals(address)) !== undefined ||
            this.restrictionDeletions.find((_) => _.equals(address)) !== undefined);
    }
}
exports.AccountAddressRestrictionTransaction = AccountAddressRestrictionTransaction;
//# sourceMappingURL=AccountAddressRestrictionTransaction.js.map