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
exports.TokenAliasTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const PublicAccount_1 = require("../account/PublicAccount");
const NamespaceId_1 = require("../namespace/NamespaceId");
const TokenId_1 = require("../token/TokenId");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
class TokenAliasTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param aliasAction
     * @param namespaceId
     * @param tokenId
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The alias action type.
     */
    aliasAction, 
    /**
     * The namespace id that will be an alias.
     */
    namespaceId, 
    /**
     * The token id.
     */
    tokenId, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_ALIAS, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.aliasAction = aliasAction;
        this.namespaceId = namespaceId;
        this.tokenId = tokenId;
    }
    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The alias action type.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    static create(deadline, aliasAction, namespaceId, tokenId, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenAliasTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_ALIAS, deadline, maxFee, aliasAction, namespaceId, tokenId, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenAliasTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenAliasTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenAliasTransaction.create(isEmbedded ? Deadline_1.Deadline.createEmtpy() : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), builder.getAliasAction().valueOf(), new NamespaceId_1.NamespaceId(builder.getNamespaceId().namespaceId), new TokenId_1.TokenId(builder.getTokenId().tokenId), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.TokenAliasTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_ALIAS.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), this.namespaceId.toBuilder(), this.tokenId.toBuilder(), this.aliasAction.valueOf());
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenAliasTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_ALIAS.valueOf(), this.namespaceId.toBuilder(), this.tokenId.toBuilder(), this.aliasAction.valueOf());
    }
    /**
     * @internal
     * @returns {TokenAliasTransaction}
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
exports.TokenAliasTransaction = TokenAliasTransaction;
//# sourceMappingURL=TokenAliasTransaction.js.map