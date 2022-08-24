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
exports.AccountKeyLinkTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const account_1 = require("../account");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Announce an AccountKeyLinkTransaction to delegate the account importance to a proxy account.
 * By doing so, you can enable delegated harvesting
 */
class AccountKeyLinkTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param linkedPublicKey
     * @param linkAction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The public key of the remote account.
     */
    linkedPublicKey, 
    /**
     * The account link action.
     */
    linkAction, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.ACCOUNT_KEY_LINK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
        format_1.Convert.validateHexString(linkedPublicKey, 64, 'Invalid linkedPublicKey');
    }
    /**
     * Create a link account transaction object
     * @param deadline - The deadline to include the transaction.
     * @param linkedPublicKey - The public key of the remote account.
     * @param linkAction - The account link action.
     * @param networkType - the network type
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountLinkTransaction}
     */
    static create(deadline, linkedPublicKey, linkAction, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new AccountKeyLinkTransaction(networkType, TransactionVersion_1.TransactionVersion.ACCOUNT_KEY_LINK, deadline, maxFee, linkedPublicKey, linkAction, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.AccountKeyLinkTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = AccountKeyLinkTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), format_1.Convert.uint8ToHex(builder.getLinkedPublicKey().publicKey), builder.getLinkAction().valueOf(), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.AccountKeyLinkTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_KEY_LINK.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.PublicKeyDto(format_1.Convert.hexToUint8(this.linkedPublicKey)), this.linkAction.valueOf());
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedAccountKeyLinkTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.ACCOUNT_KEY_LINK.valueOf(), new bitxor_catbuffer_typescript_1.PublicKeyDto(format_1.Convert.hexToUint8(this.linkedPublicKey)), this.linkAction.valueOf());
    }
    /**
     * @internal
     * @returns {AccountKeyLinkTransaction}
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
        return super.isSigned(address) || account_1.Address.createFromPublicKey(this.linkedPublicKey, this.networkType).equals(address);
    }
}
exports.AccountKeyLinkTransaction = AccountKeyLinkTransaction;
//# sourceMappingURL=AccountKeyLinkTransaction.js.map