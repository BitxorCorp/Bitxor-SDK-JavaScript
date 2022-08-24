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
exports.TokenSupplyChangeTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const DtoMapping_1 = require("../../core/utils/DtoMapping");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const PublicAccount_1 = require("../account/PublicAccount");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * In case a token has the flag 'supplyMutable' set to true, the creator of the token can change the supply,
 * i.e. increase or decrease the supply.
 */
class TokenSupplyChangeTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param tokenId
     * @param action
     * @param delta
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The unresolved token id.
     */
    tokenId, 
    /**
     * The supply type.
     */
    action, 
    /**
     * The supply change in units for the token.
     */
    delta, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_SUPPLY_CHANGE, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.tokenId = tokenId;
        this.action = action;
        this.delta = delta;
    }
    /**
     * Create a token supply change transaction object
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The unresolved token id.
     * @param action - The supply change action (increase | decrease).
     * @param delta - The supply change in units for the token.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenSupplyChangeTransaction}
     */
    static create(deadline, tokenId, action, delta, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenSupplyChangeTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_SUPPLY_CHANGE, deadline, maxFee, tokenId, action, delta, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenSupplyChangeTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenSupplyChangeTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenSupplyChangeTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(new UInt64_1.UInt64(builder.getTokenId().unresolvedTokenId).toHex()), builder.getAction().valueOf(), new UInt64_1.UInt64(builder.getDelta().amount), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.TokenSupplyChangeTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_SUPPLY_CHANGE.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.delta.toDTO()), this.action.valueOf());
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenSupplyChangeTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_SUPPLY_CHANGE.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.delta.toDTO()), this.action.valueOf());
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenSupplyChangeTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping_1.DtoMapping.assign(this, {
            tokenId: statement.resolveTokenId(this.tokenId, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
        });
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
exports.TokenSupplyChangeTransaction = TokenSupplyChangeTransaction;
//# sourceMappingURL=TokenSupplyChangeTransaction.js.map