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
exports.TransferTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const Long = require("long");
const format_1 = require("../../core/format");
const utils_1 = require("../../core/utils");
const account_1 = require("../account");
const message_1 = require("../message");
const token_1 = require("../token");
const UInt64_1 = require("../UInt64");
const Deadline_1 = require("./Deadline");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Transfer transactions contain data about transfers of tokens and message to another account.
 */
class TransferTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param recipientAddress
     * @param tokens
     * @param message
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The address of the recipient address.
     */
    recipientAddress, 
    /**
     * The array of Token objects.
     */
    tokens, 
    /**
     * The transaction message of 2048 characters.
     */
    message = message_1.EmptyMessage, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TRANSFER, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.recipientAddress = recipientAddress;
        this.tokens = tokens;
        this.message = message;
        this.validate();
    }
    /**
     * Create a transfer transaction object.
     *
     * - This method can also be used to create PersistentDelegationRequestTransaction
     * with `PersistentHarvestingDelegationMessage` provided.
     * @param deadline - The deadline to include the transaction.
     * @param recipientAddress - The recipient address of the transaction.
     * @param tokens - The array of tokens.
     * @param message - The transaction message.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TransferTransaction}
     */
    static create(deadline, recipientAddress, tokens, message, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TransferTransaction(networkType, TransactionVersion_1.TransactionVersion.TRANSFER, deadline, maxFee, recipientAddress, tokens, message, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTransferTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TransferTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TransferTransaction.create(isEmbedded ? Deadline_1.Deadline.createEmtpy() : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), utils_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(builder.getRecipientAddress().unresolvedAddress)), builder.getTokens().map((token) => {
            const id = new UInt64_1.UInt64(token.tokenId.unresolvedTokenId).toHex();
            return new token_1.Token(utils_1.UnresolvedMapping.toUnresolvedToken(id), new UInt64_1.UInt64(token.amount.amount));
        }), message_1.MessageFactory.createMessageFromBuffer(builder.getMessage()), networkType, isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * Validate Transfer transaction creation with provided message
     * @internal
     */
    validate() {
        var _a;
        if (((_a = this.message) === null || _a === void 0 ? void 0 : _a.type) === message_1.MessageType.PersistentHarvestingDelegationMessage) {
            if (this.tokens.length > 0) {
                throw new Error('PersistentDelegationRequestTransaction should be created without Token');
            }
            else if (!/^[0-9a-fA-F]{264}$/.test(this.message.payload)) {
                throw new Error('PersistentDelegationRequestTransaction message is invalid');
            }
        }
    }
    /**
     * Return the string notation for the set recipient
     * @internal
     * @returns {string}
     */
    recipientToString() {
        if (this.recipientAddress.isNamespaceId()) {
            // namespaceId recipient, return hexadecimal notation
            return this.recipientAddress.toHex();
        }
        // address recipient
        return this.recipientAddress.plain();
    }
    /**
     * Return sorted token arrays
     * @internal
     * @returns {Token[]}
     */
    sortTokens() {
        return this.tokens.sort((a, b) => {
            const long_a = Long.fromBits(a.id.id.lower, a.id.id.higher, true);
            const long_b = Long.fromBits(b.id.id.lower, b.id.id.higher, true);
            return long_a.compare(long_b);
        });
    }
    /**
     * Return message buffer
     * @internal
     * @returns {Uint8Array}
     */
    getMessageBuffer() {
        if (!this.message || !this.message.payload) {
            return Uint8Array.of();
        }
        const messgeHex = this.message.type === message_1.MessageType.PersistentHarvestingDelegationMessage
            ? this.message.payload
            : format_1.Convert.utf8ToHex(this.message.payload);
        const payloadBuffer = format_1.Convert.hexToUint8(messgeHex);
        const typeBuffer = bitxor_catbuffer_typescript_1.GeneratorUtils.uintToBuffer(this.message.type, 1);
        return this.message.type === message_1.MessageType.PersistentHarvestingDelegationMessage || !this.message.payload
            ? payloadBuffer
            : bitxor_catbuffer_typescript_1.GeneratorUtils.concatTypedArrays(typeBuffer, payloadBuffer);
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        return new bitxor_catbuffer_typescript_1.TransferTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TRANSFER.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.recipientAddress.encodeUnresolvedAddress(this.networkType)), this.sortTokens().map((token) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(token.amount.toDTO()));
        }), this.getMessageBuffer());
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTransferTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TRANSFER.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.recipientAddress.encodeUnresolvedAddress(this.networkType)), this.sortTokens().map((token) => {
            return new bitxor_catbuffer_typescript_1.UnresolvedTokenBuilder(new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(token.id.id.toDTO()), new bitxor_catbuffer_typescript_1.AmountDto(token.amount.toDTO()));
        }), this.getMessageBuffer());
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TransferTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return utils_1.DtoMapping.assign(this, {
            recipientAddress: statement.resolveAddress(this.recipientAddress, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
            tokens: this.tokens.map((token) => statement.resolveToken(token, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex)),
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
exports.TransferTransaction = TransferTransaction;
//# sourceMappingURL=TransferTransaction.js.map