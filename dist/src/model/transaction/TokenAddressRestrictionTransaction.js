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
exports.TokenAddressRestrictionTransaction = void 0;
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
class TokenAddressRestrictionTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param tokenId
     * @param signature
     * @param restrictionKey
     * @param targetAddress
     * @param previousRestrictionValue
     * @param newRestrictionValue
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, version, deadline, maxFee, 
    /**
     * The token id.
     */
    tokenId, 
    /**
     * The restriction key.
     */
    restrictionKey, 
    /**
     * The affected unresolved address.
     */
    targetAddress, 
    /**
     * The previous restriction value.
     */
    previousRestrictionValue, 
    /**
     * The new restriction value.
     */
    newRestrictionValue, signature, signer, transactionInfo) {
        super(TransactionType_1.TransactionType.TOKEN_ADDRESS_RESTRICTION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.tokenId = tokenId;
        this.restrictionKey = restrictionKey;
        this.targetAddress = targetAddress;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
    }
    /**
     * Create a token address restriction transaction object
     *
     * Enabling accounts to transact with the token is similar to the process of
     * adding elevated permissions to a user in a company computer network.
     *
     * The token creator can modify the permissions of an account by sending a
     * token restriction transaction targeting the account address.
     *
     * **TokenAddressRestrictionTransaction can only be announced in with Aggregate Transaction
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The unresolved token identifier.
     * @param restrictionKey - The restriction key.
     * @param targetAddress - The affected unresolved address.
     * @param newRestrictionValue - The new restriction value.
     * @param networkType - The network type.
     * @param previousRestrictionValue - (Optional) The previous restriction value.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAddressRestrictionTransaction}
     */
    static create(deadline, tokenId, restrictionKey, targetAddress, newRestrictionValue, networkType, previousRestrictionValue = UInt64_1.UInt64.fromHex('FFFFFFFFFFFFFFFF'), maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new TokenAddressRestrictionTransaction(networkType, TransactionVersion_1.TransactionVersion.TOKEN_ADDRESS_RESTRICTION, deadline, maxFee, tokenId, restrictionKey, targetAddress, previousRestrictionValue, newRestrictionValue, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload, isEmbedded = false) {
        const builder = isEmbedded
            ? bitxor_catbuffer_typescript_1.EmbeddedTokenAddressRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload))
            : bitxor_catbuffer_typescript_1.TokenAddressRestrictionTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenAddressRestrictionTransaction.create(isEmbedded
            ? Deadline_1.Deadline.createEmtpy()
            : Deadline_1.Deadline.createFromDTO(builder.getDeadline().timestamp), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedToken(new UInt64_1.UInt64(builder.getTokenId().unresolvedTokenId).toHex()), new UInt64_1.UInt64(builder.getRestrictionKey()), UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddress(format_1.Convert.uint8ToHex(builder.getTargetAddress().unresolvedAddress)), new UInt64_1.UInt64(builder.getNewRestrictionValue()), networkType, new UInt64_1.UInt64(builder.getPreviousRestrictionValue()), isEmbedded ? new UInt64_1.UInt64([0, 0]) : new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
        return isEmbedded ? transaction.toAggregate(PublicAccount_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }
    /**
     * Return the string notation for the set recipient
     * @internal
     * @returns {string}
     */
    targetAddressToString() {
        if (this.targetAddress.isNamespaceId()) {
            // namespaceId recipient, return hexadecimal notation
            return this.targetAddress.toHex();
        }
        // address recipient
        return this.targetAddress.plain();
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactionBuilder = new bitxor_catbuffer_typescript_1.TokenAddressRestrictionTransactionBuilder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_ADDRESS_RESTRICTION.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), this.restrictionKey.toDTO(), this.previousRestrictionValue.toDTO(), this.newRestrictionValue.toDTO(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)));
        return transactionBuilder;
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        return new bitxor_catbuffer_typescript_1.EmbeddedTokenAddressRestrictionTransactionBuilder(this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), TransactionType_1.TransactionType.TOKEN_ADDRESS_RESTRICTION.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(this.tokenId.id.toDTO()), this.restrictionKey.toDTO(), this.previousRestrictionValue.toDTO(), this.newRestrictionValue.toDTO(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)));
    }
    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenAddressRestrictionTransaction}
     */
    resolveAliases(statement, aggregateTransactionIndex = 0) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping_1.DtoMapping.assign(this, {
            tokenId: statement.resolveTokenId(this.tokenId, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
            targetAddress: statement.resolveAddress(this.targetAddress, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
        });
    }
    /**
     * @internal
     * Check a given address should be notified in websocket channels
     * @param address address to be notified
     * @returns {boolean}
     */
    shouldNotifyAccount(address) {
        return super.isSigned(address) || this.targetAddress.equals(address);
    }
}
exports.TokenAddressRestrictionTransaction = TokenAddressRestrictionTransaction;
//# sourceMappingURL=TokenAddressRestrictionTransaction.js.map