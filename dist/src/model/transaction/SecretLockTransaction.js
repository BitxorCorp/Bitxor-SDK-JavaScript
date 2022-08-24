"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockTransaction = void 0;
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
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const DtoMapping_1 = require("../../core/utils/DtoMapping");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const PublicAccount_1 = require("../account/PublicAccount");
const LockHashAlgorithm_1 = require("../lock/LockHashAlgorithm");
const Token_1 = require("../token/Token");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
class SecretLockTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param token
     * @param duration
     * @param hashAlgorithm
     * @param secret
     * @param recipientAddress
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The locked token.
     */
    token, 
    /**
     * The duration for the funds to be released or returned.
     */
    duration, 
    /**
     * The hash algorithm, secret is generated with.
     */
    hashAlgorithm, 
    /**
     * The proof hashed.
     */
    secret, 
    /**
     * The unresolved recipientAddress of the funds.
     */
    recipientAddress, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.SECRET_LOCK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.token = token;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipientAddress = recipientAddress;
        if (!(0, LockHashAlgorithm_1.LockHashAlgorithmLengthValidator)(hashAlgorithm, this.secret)) {
            throw new Error('HashAlgorithm and Secret have incompatible length or not hexadecimal string');
        }
    }
    /**
     * Create a secret lock transaction object.
     *
     * @param deadline - The deadline to include the transaction.
     * @param token - The locked token.
     * @param duration - The funds lock duration.
     * @param hashAlgorithm - The hash algorithm secret is generated with.
     * @param secret - The proof hashed.
     * @param recipientAddress - The unresolved recipient address of the funds.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @return a SecretLockTransaction instance
     */
    static create(deadline, token, duration, hashAlgorithm, secret, recipientAddress, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new SecretLockTransaction(networkType, TransactionVersion_1.TransactionVersion.SECRET_LOCK, deadline, maxFee, token, duration, hashAlgorithm, secret, recipientAddress, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedSecretLockTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.SecretLockTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = SecretLockTransaction.create(isEmbedded ? Deadline_1.Deadline.createEmtpy() : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), new Token_1.Token(UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(new UInt64_1.UInt64(builder.getToken().tokenId.unresolvedTokenId).toHex()), new UInt64_1.UInt64(builder.getToken().amount.amount)), new UInt64_1.UInt64(builder.getDuration().blockDuration), builder.getHashAlgorithm().valueOf(), format_1.Convert.uint8ToHex(builder.getSecret().hash256), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(builder.getRecipientAddress().unresolvedAddress)), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @description Get secret bytes
     * @returns {Uint8Array}
     * @memberof SecretLockTransaction
     */
    getSecretByte() {
        return format_1.Convert.hexToUint8(64 > this.secret.length ? this.secret + '0'.repeat(64 - this.secret.length) : this.secret);
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.SecretLockTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.SECRET_LOCK.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.recipientAddress.encodeUnresolvedAddress(this.networkType)), new bitxor_catbuffer_typescript_1.Hash256Dto(this.getSecretByte()), new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO())), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), this.hashAlgorithm.valueOf());
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedSecretLockTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.SECRET_LOCK.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.recipientAddress.encodeUnresolvedAddress(this.networkType)), new bitxor_catbuffer_typescript_1.Hash256Dto(this.getSecretByte()), new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO())), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), this.hashAlgorithm.valueOf());
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {SecretLockTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping_1.DtoMapping.assign(this, {
            recipientAddress: statement.resolveAddress(this.recipientAddress, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
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
        return super.isSigned(address) || this.recipientAddress.equals(address);
    }
}
exports.SecretLockTransaction = SecretLockTransaction;
//# sourceMappingURL=SecretLockTransaction.js.map