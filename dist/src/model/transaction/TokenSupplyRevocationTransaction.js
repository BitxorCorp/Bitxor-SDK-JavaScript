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
exports.TokenSupplyRevocationTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const core_1 = require("../../core");
const format_1 = require("../../core/format");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const PublicAccount_1 = require("../account/PublicAccount");
const token_1 = require("../token");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Creators of a revokable token will be able to recall any and all balances from any holders. Holders of these tokens implicitly place trust in the issuer.
 * The token issuer can revoke and recall balances using this transaction.
 */
class TokenSupplyRevocationTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param sourceAddress
     * @param token
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * Address from which tokens should be revoked.
     */
    sourceAddress, 
    /**
     * Revoked token and amount.
     */
    token, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_SUPPLY_REVOCATION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.sourceAddress = sourceAddress;
        this.token = token;
    }
    /**
     * Create a token supply revocation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param sourceAddress - Address from which tokens should be revoked.
     * @param token - Revoked token and amount.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenSupplyRevocationTransaction}
     */
    static create(deadline, sourceAddress, token, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenSupplyRevocationTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_SUPPLY_REVOCATION, deadline, maxFee, sourceAddress, token, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenSupplyRevocationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenSupplyRevocationTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const tokenBuilder = builder.getToken();
        const id = new UInt64_1.UInt64(tokenBuilder.tokenId.unresolvedTokenId).toHex();
        const token = new token_1.Token(UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(id), new UInt64_1.UInt64(tokenBuilder.amount.amount));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const deadline = isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp);
        const transaction = TokenSupplyRevocationTransaction.create(deadline, UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(builder.getSourceAddress().unresolvedAddress)), token, networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const tokenBuilder = new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO()));
        return new bitxor_catbuffer_typescript_1.TokenSupplyRevocationTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), this.type.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.sourceAddress.encodeUnresolvedAddress(this.networkType)), tokenBuilder);
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        const tokenBuilder = new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO()));
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenSupplyRevocationTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), this.type.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.sourceAddress.encodeUnresolvedAddress(this.networkType)), tokenBuilder);
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenSupplyRevocationTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return core_1.DtoMapping.assign(this, {
            sourceAddress: statement.resolveAddress(this.sourceAddress, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
            token: statement.resolveToken(this.token, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
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
exports.TokenSupplyRevocationTransaction = TokenSupplyRevocationTransaction;
//# sourceMappingURL=TokenSupplyRevocationTransaction.js.map