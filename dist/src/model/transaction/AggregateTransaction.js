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
exports.AggregateTransaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const utils_1 = require("../../core/utils");
const transaction_1 = require("../../infrastructure/transaction");
const account_1 = require("../account");
const UInt64_1 = require("../UInt64");
const AggregateTransactionCosignature_1 = require("./AggregateTransactionCosignature");
const Deadline_1 = require("./Deadline");
const SignedTransaction_1 = require("./SignedTransaction");
const Transaction_1 = require("./Transaction");
const TransactionType_1 = require("./TransactionType");
const TransactionVersion_1 = require("./TransactionVersion");
/**
 * Aggregate innerTransactions contain multiple innerTransactions that can be initiated by different accounts.
 */
class AggregateTransaction extends Transaction_1.Transaction {
    /**
     * @param networkType
     * @param type
     * @param version
     * @param deadline
     * @param maxFee
     * @param innerTransactions
     * @param cosignatures
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType, type, version, deadline, maxFee, 
    /**
     * The array of innerTransactions included in the aggregate transaction.
     */
    innerTransactions, 
    /**
     * The array of transaction cosigners signatures.
     */
    cosignatures, signature, signer, transactionInfo) {
        super(type, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.innerTransactions = innerTransactions;
        this.cosignatures = cosignatures;
    }
    /**
     * Create an aggregate complete transaction object
     * @param deadline - The deadline to include the transaction.
     * @param innerTransactions - The array of inner innerTransactions.
     * @param networkType - The network type.
     * @param cosignatures
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AggregateTransaction}
     */
    static createComplete(deadline, innerTransactions, networkType, cosignatures, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new AggregateTransaction(networkType, TransactionType_1.TransactionType.AGGREGATE_COMPLETE, TransactionVersion_1.TransactionVersion.AGGREGATE_COMPLETE, deadline, maxFee, innerTransactions, cosignatures, signature, signer);
    }
    /**
     * Create an aggregate bonded transaction object
     * @param {Deadline} deadline
     * @param {InnerTransaction[]} innerTransactions
     * @param {NetworkType} networkType
     * @param {AggregateTransactionCosignature[]} cosignatures
     * @param {UInt64} maxFee - (Optional) Max fee defined by the sender
     * @param {string} signature - (Optional) Transaction signature
     * @param {PublicAccount} signer - (Optional) Signer public account
     * @return {AggregateTransaction}
     */
    static createBonded(deadline, innerTransactions, networkType, cosignatures = [], maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return new AggregateTransaction(networkType, TransactionType_1.TransactionType.AGGREGATE_BONDED, TransactionVersion_1.TransactionVersion.AGGREGATE_BONDED, deadline, maxFee, innerTransactions, cosignatures, signature, signer);
    }
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @returns {AggregateTransaction}
     */
    static createFromPayload(payload) {
        /**
         * Get transaction type from the payload hex
         * As buffer uses separate builder class for Complete and bonded
         */
        const builder = bitxor_catbuffer_typescript_1.AggregateCompleteTransactionBuilder.loadFromBinary(format_1.Convert.hexToUint8(payload));
        const type = builder.type;
        const innerTransactions = builder.getTransactions();
        const networkType = builder.getNetwork().valueOf();
        const signerPublicKey = format_1.Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const signature = Transaction_1.Transaction.getSignatureFromPayload(payload, false);
        const consignatures = builder.getCosignatures().map((cosig) => {
            return new AggregateTransactionCosignature_1.AggregateTransactionCosignature(format_1.Convert.uint8ToHex(cosig.signature.signature), account_1.PublicAccount.createFromPublicKey(format_1.Convert.uint8ToHex(cosig.signerPublicKey.publicKey), networkType), new UInt64_1.UInt64(cosig.version));
        });
        return type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE
            ? AggregateTransaction.createComplete(Deadline_1.Deadline.createFromDTO(builder.deadline.timestamp), innerTransactions.map((transactionRaw) => {
                return (0, transaction_1.CreateTransactionFromPayload)(format_1.Convert.uint8ToHex(transactionRaw.serialize()), true);
            }), networkType, consignatures, new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType))
            : AggregateTransaction.createBonded(Deadline_1.Deadline.createFromDTO(builder.deadline.timestamp), innerTransactions.map((transactionRaw) => {
                return (0, transaction_1.CreateTransactionFromPayload)(format_1.Convert.uint8ToHex(transactionRaw.serialize()), true);
            }), networkType, consignatures, new UInt64_1.UInt64(builder.fee.amount), signature, signerPublicKey.match(`^[0]+$`) ? undefined : account_1.PublicAccount.createFromPublicKey(signerPublicKey, networkType));
    }
    /**
     * @description add inner transactions to current list
     * @param {InnerTransaction[]} transaction
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    addTransactions(transactions) {
        const innerTransactions = this.innerTransactions.concat(transactions);
        return utils_1.DtoMapping.assign(this, { innerTransactions });
    }
    /**
     * @description add cosignatures to current list
     * @param {AggregateTransactionCosignature[]} transaction
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    addCosignatures(cosigs) {
        const cosignatures = this.cosignatures.concat(cosigs);
        return utils_1.DtoMapping.assign(this, { cosignatures });
    }
    /**
     * @internal
     * Sign transaction with cosignatories creating a new SignedTransaction
     * @param initiatorAccount - Initiator account
     * @param cosignatories - The array of accounts that will cosign the transaction
     * @param generationHash - Network generation hash hex
     * @returns {SignedTransaction}
     */
    signTransactionWithCosignatories(initiatorAccount, cosignatories, generationHash) {
        const signedTransaction = this.signWith(initiatorAccount, generationHash);
        const transactionHashBytes = format_1.Convert.hexToUint8(signedTransaction.hash);
        let signedPayload = signedTransaction.payload;
        cosignatories.forEach((cosigner) => {
            const keyPairEncoded = crypto_1.KeyPair.createKeyPairFromPrivateKeyString(cosigner.privateKey);
            const signature = crypto_1.KeyPair.sign(keyPairEncoded, transactionHashBytes);
            signedPayload += UInt64_1.UInt64.fromUint(0).toHex() + cosigner.publicKey + format_1.Convert.uint8ToHex(signature);
        });
        // Calculate new size
        const size = `00000000${(signedPayload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);
        signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
        return new SignedTransaction_1.SignedTransaction(signedPayload, signedTransaction.hash, initiatorAccount.publicKey, this.type, this.networkType);
    }
    /**
     * @internal
     * Sign transaction with cosignatories collected from cosigned transactions and creating a new SignedTransaction
     * For off chain Aggregated Complete Transaction co-signing.
     * @param initiatorAccount - Initiator account
     * @param {CosignatureSignedTransaction[]} cosignatureSignedTransactions - Array of cosigned transaction
     * @param generationHash - Network generation hash hex
     * @return {SignedTransaction}
     */
    signTransactionGivenSignatures(initiatorAccount, cosignatureSignedTransactions, generationHash) {
        const signedTransaction = this.signWith(initiatorAccount, generationHash);
        let signedPayload = signedTransaction.payload;
        cosignatureSignedTransactions.forEach((cosignedTransaction) => {
            signedPayload += cosignedTransaction.version.toHex() + cosignedTransaction.signerPublicKey + cosignedTransaction.signature;
        });
        // Calculate new size
        const size = `00000000${(signedPayload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);
        signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
        return new SignedTransaction_1.SignedTransaction(signedPayload, signedTransaction.hash, initiatorAccount.publicKey, this.type, this.networkType);
    }
    /**
     * Check if account has signed transaction
     * @param publicAccount - Signer public account
     * @returns {boolean}
     */
    signedByAccount(publicAccount) {
        return (this.cosignatures.find((cosignature) => cosignature.signer.equals(publicAccount)) !== undefined ||
            (this.signer !== undefined && this.signer.equals(publicAccount)));
    }
    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    createBuilder() {
        const transactions = this.innerTransactions.map((transaction) => transaction.toEmbeddedTransaction());
        const cosignatures = this.cosignatures.map((cosignature) => {
            const signerBytes = format_1.Convert.hexToUint8(cosignature.signer.publicKey);
            const signatureBytes = format_1.Convert.hexToUint8(cosignature.signature);
            return new bitxor_catbuffer_typescript_1.CosignatureBuilder(cosignature.version.toDTO(), new bitxor_catbuffer_typescript_1.PublicKeyDto(signerBytes), new bitxor_catbuffer_typescript_1.SignatureDto(signatureBytes));
        });
        const builder = this.type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE ? bitxor_catbuffer_typescript_1.AggregateCompleteTransactionBuilder : bitxor_catbuffer_typescript_1.AggregateBondedTransactionBuilder;
        return new builder(this.getSignatureAsBuilder(), this.getSignerAsBuilder(), this.versionToDTO(), this.networkType.valueOf(), this.type.valueOf(), new bitxor_catbuffer_typescript_1.AmountDto(this.maxFee.toDTO()), new bitxor_catbuffer_typescript_1.TimestampDto(this.deadline.toDTO()), new bitxor_catbuffer_typescript_1.Hash256Dto(this.calculateInnerTransactionHash()), transactions, cosignatures);
    }
    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    toEmbeddedTransaction() {
        throw new Error('Method not implemented');
    }
    /**
     * @internal
     * Generate inner transaction root hash (merkle tree)
     * @returns {Uint8Array}
     */
    calculateInnerTransactionHash() {
        // Note: Transaction hashing *always* uses SHA3
        const hasher = crypto_1.SHA3Hasher.createHasher(32);
        const builder = new crypto_1.MerkleHashBuilder(32);
        this.innerTransactions.forEach((transaction) => {
            const entityHash = new Uint8Array(32);
            // for each embedded transaction hash their body
            hasher.reset();
            const byte = transaction.toEmbeddedTransaction().serialize();
            const padding = new Uint8Array(bitxor_catbuffer_typescript_1.GeneratorUtils.getPaddingSize(byte.length, 8));
            hasher.update(bitxor_catbuffer_typescript_1.GeneratorUtils.concatTypedArrays(byte, padding));
            hasher.finalize(entityHash);
            // update merkle tree (add transaction hash)
            builder.update(entityHash);
        });
        // calculate root hash with all transactions
        return builder.getRootHash();
    }
    /**
     * @internal
     * @returns {AggregateTransaction}
     */
    resolveAliases(statement) {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return utils_1.DtoMapping.assign(this, {
            innerTransactions: this.innerTransactions
                .map((tx) => tx.resolveAliases(statement, transactionInfo.index))
                .sort((a, b) => a.transactionInfo.index - b.transactionInfo.index),
        });
    }
    /**
     * Set transaction maxFee using fee multiplier for **ONLY AGGREGATE TRANSACTIONS**
     * @param feeMultiplier The fee multiplier
     * @param requiredCosignatures Required number of cosignatures
     * @returns {AggregateTransaction}
     */
    setMaxFeeForAggregate(feeMultiplier, requiredCosignatures) {
        if (this.type !== TransactionType_1.TransactionType.AGGREGATE_BONDED && this.type !== TransactionType_1.TransactionType.AGGREGATE_COMPLETE) {
            throw new Error('setMaxFeeForAggregate can only be used for aggregate transactions.');
        }
        // Check if current cosignature count is greater than requiredCosignatures.
        const calculatedCosignatures = requiredCosignatures > this.cosignatures.length ? requiredCosignatures : this.cosignatures.length;
        // version + public key + signature
        const sizePerCosignature = 8 + 32 + 64;
        // Remove current cosignature length and use the calculated one.
        const calculatedSize = this.size - this.cosignatures.length * sizePerCosignature + calculatedCosignatures * sizePerCosignature;
        return utils_1.DtoMapping.assign(this, {
            maxFee: UInt64_1.UInt64.fromUint(calculatedSize * feeMultiplier),
        });
    }
    /**
     * @internal
     * Check a given address should be notified in websocket channels
     * @param address address to be notified
     * @returns {boolean}
     */
    shouldNotifyAccount(address) {
        return (super.isSigned(address) ||
            this.cosignatures.find((_) => _.signer.address.equals(address)) !== undefined ||
            this.innerTransactions.find((innerTransaction) => innerTransaction.shouldNotifyAccount(address)) !== undefined);
    }
}
exports.AggregateTransaction = AggregateTransaction;
//# sourceMappingURL=AggregateTransaction.js.map