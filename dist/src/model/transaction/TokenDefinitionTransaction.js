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
exports.TokenDefinitionTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const PublicAccount_1 = require("../account/PublicAccount");
const TokenFlags_1 = require("../token/TokenFlags");
const TokenId_1 = require("../token/TokenId");
const TokenNonce_1 = require("../token/TokenNonce");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Before a token can be created or transferred, a corresponding definition of the token has to be created and published to the network.
 * This is done via a token definition transaction.
 */
class TokenDefinitionTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param nonce
     * @param tokenId
     * @param flags
     * @param divisibility
     * @param duration
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The token nonce.
     */
    nonce, 
    /**
     * The token id.
     */
    tokenId, 
    /**
     * The token properties.
     */
    flags, 
    /**
     * Token divisibility
     */
    divisibility, 
    /**
     * Token duration, 0 value for eternal token
     */
    duration = UInt64_1.UInt64.fromUint(0), signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_DEFINITION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.nonce = nonce;
        this.tokenId = tokenId;
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    /**
     * Create a token creation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param nonce - The token nonce ex: TokenNonce.createRandom().
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param flags - The token flags.
     * @param divisibility - The token divicibility.
     * @param duration - The token duration.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenDefinitionTransaction}
     */
    static create(deadline, nonce, tokenId, flags, divisibility, duration, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenDefinitionTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_DEFINITION, deadline, maxFee, nonce, tokenId, flags, divisibility, duration, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenDefinitionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenDefinitionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenDefinitionTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), TokenNonce_1.TokenNonce.createFromUint8Array(builder.getNonce().serialize()), new TokenId_1.TokenId(builder.getId().tokenId), TokenFlags_1.TokenFlags.create(builder.getFlags().indexOf(bitxor_catbuffer_typescript_1.TokenFlagsDto.SUPPLY_MUTABLE) > -1, builder.getFlags().indexOf(bitxor_catbuffer_typescript_1.TokenFlagsDto.TRANSFERABLE) > -1, builder.getFlags().indexOf(bitxor_catbuffer_typescript_1.TokenFlagsDto.RESTRICTABLE) > -1), builder.getDivisibility(), new UInt64_1.UInt64(builder.getDuration().blockDuration), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @description Get token nonce int value
     * @returns {number}
     * @memberof TokenDefinitionTransaction
     */
    getTokenNonceIntValue() {
        return this.nonce.toDTO();
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.TokenDefinitionTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_DEFINITION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), this.tokenId.toBuilder(), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), new bitxor_catbuffer_typescript_1.TokenNonceDto(this.getTokenNonceIntValue()), bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.TokenFlagsDto, this.flags.getValue()), this.divisibility);
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenDefinitionTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_DEFINITION.valueOf(), this.tokenId.toBuilder(), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), new bitxor_catbuffer_typescript_1.TokenNonceDto(this.getTokenNonceIntValue()), bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.TokenFlagsDto, this.flags.getValue()), this.divisibility);
    }
    /**
     * @internal
     * @returns {TokenDefinitionTransaction}
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
exports.TokenDefinitionTransaction = TokenDefinitionTransaction;
//# sourceMappingURL=TokenDefinitionTransaction.js.map