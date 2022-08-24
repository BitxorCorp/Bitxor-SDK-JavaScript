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
exports.LockFundsTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const utils_1 = require("../../core/utils");
const account_1 = require("../account");
const token_1 = require("../token");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const SignedTransaction_1 = require("./SignedTransaction");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Lock funds transaction is used before sending an Aggregate bonded transaction, as a deposit to announce the transaction.
 * When aggregate bonded transaction is confirmed funds are returned to LockFundsTransaction signer.
 *
 * @since 1.0
 */
class LockFundsTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param token The locked token.
     * @param duration The funds lock duration.
     * @param signedTransaction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, token, duration, signedTransaction, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.HASH_LOCK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.token = token;
        this.duration = duration;
        this.hash = signedTransaction.hash;
        if (signedTransaction.type !== TransactionType_1.TransactionType.AGGREGATE_BONDED) {
            throw new Error('Signed transaction must be Aggregate Bonded Transaction');
        }
    }
    /**
     * Create a Lock funds transaction object
     * @param deadline - The deadline to include the transaction.
     * @param token - The locked token.
     * @param duration - The funds lock duration.
     * @param signedTransaction - The signed transaction for which funds are locked.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {LockFundsTransaction}
     */
    static create(deadline, token, duration, signedTransaction, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new LockFundsTransaction(networkType, TransactionVersion_1.TransactionVersion.HASH_LOCK, deadline, maxFee, token, duration, signedTransaction, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedHashLockTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.HashLockTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = LockFundsTransaction.create(isEmbedded ? Deadline_1.Deadline.createEmtpy() : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), new token_1.Token(new token_1.TokenId(builder.getToken().tokenId.unresolvedTokenId), new UInt64_1.UInt64(builder.getToken().amount.amount)), new UInt64_1.UInt64(builder.getDuration().blockDuration), new SignedTransaction_1.SignedTransaction('', format_1.Convert.uint8ToHex(builder.getHash().hash256), '', TransactionType_1.TransactionType.AGGREGATE_BONDED, networkType), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.HashLockTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.HASH_LOCK.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO())), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), new bitxor_catbuffer_typescript_1.Hash256Dto(format_1.Convert.hexToUint8(this.hash)));
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedHashLockTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.HASH_LOCK.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(this.token.amount.toDTO())), new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO()), new bitxor_catbuffer_typescript_1.Hash256Dto(format_1.Convert.hexToUint8(this.hash)));
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {LockFundsTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return utils_1.DtoMapping.assign(this, {
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
exports.LockFundsTransaction = LockFundsTransaction;
//# sourceMappingURL=LockFundsTransaction.js.map