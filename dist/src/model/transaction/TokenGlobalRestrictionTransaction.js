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
exports.TokenGlobalRestrictionTransaction = void 0;
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
class TokenGlobalRestrictionTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType - The network type
     * @param version - The transaction version
     * @param deadline - The deadline to include the transaction.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param tokenId - The unresolved token identifier.
     * @param referenceTokenId - The token id providing the restriction key.
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param previousRestrictionType - The previous restriction tpye.
     * @param signature - The transaction signature
     * @param signer - The signer
     * @param transactionInfo - The transaction info
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The token id.
     */
    tokenId, 
    /**
     * The refrence token id.
     */
    referenceTokenId, 
    /**
     * The restriction key.
     */
    restrictionKey, 
    /**
     * The previous restriction value.
     */
    previousRestrictionValue, 
    /**
     * The previous restriction type.
     */
    previousRestrictionType, 
    /**
     * The new restriction value.
     */
    newRestrictionValue, 
    /**
     * The new restriction type.
     */
    newRestrictionType, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_GLOBAL_RESTRICTION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.tokenId = tokenId;
        this.referenceTokenId = referenceTokenId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionValue = newRestrictionValue;
        this.newRestrictionType = newRestrictionType;
    }
    /**
     * Create a token address restriction transaction object
     *
     * The token global restrictions are the network-wide rules that will determine
     * whether an account will be able to transact a given token.
     *
     * Only accounts tagged with the key identifiers and values that meet the conditions
     * will be able to execute transactions involving the token.
     *
     * Additionally, the token creator can define restrictions that depend directly on
     * global restrictions set on another token - known as **reference token**.
     * The referenced token and the restricted token do not necessarily have to be created
     * by the same account, enabling the delegation of token permissions to a third party.
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param newRestrictionType - The new restriction tpye.
     * @param networkType - The network type.
     * @param referenceTokenId - (Optional) The unresolved token identifier providing the restriction key.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenGlobalRestrictionTransaction}
     */
    static create(deadline, tokenId, restrictionKey, previousRestrictionValue, previousRestrictionType, newRestrictionValue, newRestrictionType, networkType, referenceTokenId = UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(UInt64_1.UInt64.fromUint(0).toHex()), maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenGlobalRestrictionTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_GLOBAL_RESTRICTION, deadline, maxFee, tokenId, referenceTokenId, restrictionKey, previousRestrictionValue, previousRestrictionType, newRestrictionValue, newRestrictionType, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenGlobalRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenGlobalRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenGlobalRestrictionTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(new UInt64_1.UInt64(builder.getTokenId().unresolvedTokenId).toHex()), new UInt64_1.UInt64(builder.getRestrictionKey()), new UInt64_1.UInt64(builder.getPreviousRestrictionValue()), builder.getPreviousRestrictionType().valueOf(), new UInt64_1.UInt64(builder.getNewRestrictionValue()), builder.getNewRestrictionType().valueOf(), networkType, UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(new UInt64_1.UInt64(builder.getReferenceTokenId().unresolvedTokenId).toHex()), isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.TokenGlobalRestrictionTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_GLOBAL_RESTRICTION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.referenceTokenId.id.toDTO()), this.restrictionKey.toDTO(), this.previousRestrictionValue.toDTO(), this.newRestrictionValue.toDTO(), this.previousRestrictionType.valueOf(), this.newRestrictionType.valueOf());
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenGlobalRestrictionTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_GLOBAL_RESTRICTION.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.referenceTokenId.id.toDTO()), this.restrictionKey.toDTO(), this.previousRestrictionValue.toDTO(), this.newRestrictionValue.toDTO(), this.previousRestrictionType.valueOf(), this.newRestrictionType.valueOf());
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenGlobalRestrictionTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping_1.DtoMapping.assign(this, {
            tokenId: statement.resolveTokenId(this.tokenId, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
            referenceTokenId: statement.resolveTokenId(this.referenceTokenId, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
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
exports.TokenGlobalRestrictionTransaction = TokenGlobalRestrictionTransaction;
//# sourceMappingURL=TokenGlobalRestrictionTransaction.js.map