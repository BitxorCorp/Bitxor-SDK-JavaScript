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
exports.Transaction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const utils_1 = require("../../core/utils");
const transaction_1 = require("../../infrastructure/transaction");
const UInt64_1 = require("../UInt64");
const SignedTransaction_1 = require("./SignedTransaction");
const TransactionType_1 = require("./TransactionType");
/**
 * An abstract transaction class that serves as the base class of all Bitxor transactions.
 */
class Transaction {
    /**
     * @constructor
     * @param type
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(
    /**
     * The transaction type.
     */
    type, 
    /**
     * The network type.
     */
    networkType, 
    /**
     * The transaction version number.
     */
    version, 
    /**
     * The deadline to include the transaction.
     */
    deadline, 
    /**
     * A sender of a transaction must specify during the transaction definition a max_fee,
     * meaning the maximum fee the account allows to spend for this transaction.
     */
    maxFee, 
    /**
     * The transaction signature (missing if part of an aggregate transaction).
     */
    signature, 
    /**
     * The account of the transaction creator.
     */
    signer, 
    /**
     * Transactions meta data object contains additional information about the transaction.
     */
    transactionInfo) {
        this.type = type;
        this.networkType = networkType;
        this.version = version;
        this.deadline = deadline;
        this.maxFee = maxFee;
        this.signature = signature;
        this.signer = signer;
        this.transactionInfo = transactionInfo;
        this.payloadSize = undefined;
    }
    /**
     * Generate transaction hash hex
     *
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/EntityHasher.cpp#L32
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/EntityHasher.cpp#L35
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/sdk/src/extensions/TransactionExtensions.cpp#L46
     * @param {string} transactionPayload HexString Payload
     * @param {Array<number>} generationHashBuffer Network generation hash byte
     * @returns {string} Returns Transaction Payload hash
     */
    static createTransactionHash(transactionPayload, generationHashBuffer) {
        // prepare
        const entityHash = new Uint8Array(32);
        const transactionBytes = format_1.Convert.hexToUint8(transactionPayload);
        // read transaction type
        const typeIdx = Transaction.Type_Index;
        const typeBytes = transactionBytes.slice(typeIdx, typeIdx + 2).reverse(); // REVERSED
        const entityType = parseInt(format_1.Convert.uint8ToHex(typeBytes), 16);
        const isAggregateTransaction = [TransactionType_1.TransactionType.AGGREGATE_BONDED, TransactionType_1.TransactionType.AGGREGATE_COMPLETE].find((type) => entityType === type) !==
            undefined;
        // 1) add full signature
        const signature = transactionBytes.slice(8, 8 + 64);
        // 2) add public key to match sign/verify behavior (32 bytes)
        const pubKeyIdx = signature.length;
        const publicKey = transactionBytes.slice(8 + 64, 8 + 64 + 32);
        // 3) add generationHash (32 bytes)
        const generationHashIdx = pubKeyIdx + publicKey.length;
        const generationHash = Uint8Array.from(generationHashBuffer);
        // 4) add transaction data without header (EntityDataBuffer)
        // @link https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/EntityHasher.cpp#L30
        const transactionBodyIdx = generationHashIdx + generationHash.length;
        let transactionBody = transactionBytes.slice(Transaction.Header_Size);
        // in case of aggregate transactions, we hash only the merkle transaction hash.
        if (isAggregateTransaction) {
            transactionBody = transactionBytes.slice(Transaction.Header_Size, Transaction.Body_Index + 32);
        }
        // 5) concatenate binary hash parts
        // layout: `signature_R || signerPublicKey || generationHash || EntityDataBuffer`
        const entityHashBytes = new Uint8Array(signature.length + publicKey.length + generationHash.length + transactionBody.length);
        entityHashBytes.set(signature, 0);
        entityHashBytes.set(publicKey, pubKeyIdx);
        entityHashBytes.set(generationHash, generationHashIdx);
        entityHashBytes.set(transactionBody, transactionBodyIdx);
        // 6) create SHA3 hash of transaction data
        // Note: Transaction hashing *always* uses SHA3
        crypto_1.SHA3Hasher.func(entityHash, entityHashBytes, 32);
        return format_1.Convert.uint8ToHex(entityHash);
    }
    /**
     * Set transaction maxFee using fee multiplier for **ONLY NONE AGGREGATE TRANSACTIONS**
     * @param feeMultiplier The fee multiplier
     * @returns {TransferTransaction}
     */
    setMaxFee(feeMultiplier) {
        if (this.type === TransactionType_1.TransactionType.AGGREGATE_BONDED || this.type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE) {
            throw new Error('setMaxFee can only be used for none aggregate transactions.');
        }
        return utils_1.DtoMapping.assign(this, {
            maxFee: UInt64_1.UInt64.fromUint(this.size * feeMultiplier),
        });
    }
    /**
     * @internal
     * Serialize and sign transaction creating a new SignedTransaction
     * @param account - The account to sign the transaction
     * @param generationHash - Network generation hash hex
     * @returns {SignedTransaction}
     */
    signWith(account, generationHash) {
        const generationHashBytes = Array.from(format_1.Convert.hexToUint8(generationHash));
        const byteBuffer = Array.from(this.generateBytes());
        // 1. prepare the raw transaction to be signed
        const signingBytes = this.getSigningBytes(byteBuffer, generationHashBytes);
        // 2. sign the raw transaction
        const signature = Transaction.signRawTransaction(account.privateKey, Uint8Array.from(signingBytes));
        // 3. prepare the (signed) payload
        const payload = Transaction.preparePayload(Uint8Array.from(byteBuffer), signature, account.publicKey);
        return new SignedTransaction_1.SignedTransaction(payload, Transaction.createTransactionHash(payload, generationHashBytes), account.publicKey, this.type, this.networkType);
    }
    /**
     * Signs raw transaction with the given private key
     * @param {string} privateKey - Private key of the signer account
     * @param {Uint8Array} rawTransactionSigningBytes - Raw transaction siging bytes
     * @returns {Uint8Array} Signature byte array
     */
    static signRawTransaction(privateKey, rawTransactionSigningBytes) {
        const keyPairEncoded = crypto_1.KeyPair.createKeyPairFromPrivateKeyString(privateKey);
        return crypto_1.KeyPair.sign(keyPairEncoded, new Uint8Array(rawTransactionSigningBytes));
    }
    /**
     * Prepares and return signed payload
     * @param {Uint8Array} serializedTransaction Serialized transaction
     * @param {Uint8Array} signature Signature of the transaction
     * @param {string} publicKey Public key of the signing account
     * @returns {string} Payload (ready to be announced)
     */
    static preparePayload(serializedTransaction, signature, publicKey) {
        const transactionBytes = Array.from(serializedTransaction);
        const signatureBytes = Array.from(signature);
        const signedTransactionBuffer = transactionBytes
            .splice(0, 8)
            .concat(signatureBytes)
            .concat(Array.from(format_1.Convert.hexToUint8(publicKey)))
            .concat(Array.from(new Uint8Array(3)))
            .concat(transactionBytes.splice(64 + 32 + 3, transactionBytes.length));
        return format_1.Convert.uint8ToHex(signedTransactionBuffer);
    }
    /**
     * Generate signing bytes
     * @param payloadBytes Payload buffer
     * @param generationHashBytes GenerationHash buffer
     * @return {number[]}
     */
    getSigningBytes(payloadBytes, generationHashBytes) {
        const byteBufferWithoutHeader = payloadBytes.slice(3 + 64 + 32 + 8);
        if (this.type === TransactionType_1.TransactionType.AGGREGATE_BONDED || this.type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE) {
            return generationHashBytes.concat(byteBufferWithoutHeader.slice(0, 53));
        }
        else {
            return generationHashBytes.concat(byteBufferWithoutHeader);
        }
    }
    /**
     * Converts the transaction into AggregateTransaction compatible
     * @returns {Array.<*>} AggregateTransaction bytes
     */
    aggregateTransaction() {
        const signerPublicKey = format_1.Convert.hexToUint8(this.signer.publicKey);
        let resultBytes = Array.from(this.generateBytes());
        resultBytes.splice(0, 4 + 64 + 32);
        resultBytes = Array.from(signerPublicKey).concat(resultBytes);
        resultBytes.splice(32 + 2 + 2, 16);
        return Array.from(new Uint8Array([
            (resultBytes.length + 4) & 0x000000ff,
            ((resultBytes.length + 4) & 0x0000ff00) >> 8,
            ((resultBytes.length + 4) & 0x00ff0000) >> 16,
            ((resultBytes.length + 4) & 0xff000000) >> 24,
        ])).concat(resultBytes);
    }
    /**
     * Convert an aggregate transaction to an inner transaction including transaction signer.
     * Signer is optional for `AggregateComplete` transaction `ONLY`.
     * If no signer provided, aggregate transaction signer will be delegated on signing
     * @param signer - Innre transaction signer.
     * @returns InnerTransaction
     */
    toAggregate(signer) {
        if (this.type === TransactionType_1.TransactionType.AGGREGATE_BONDED || this.type === TransactionType_1.TransactionType.AGGREGATE_COMPLETE) {
            throw new Error('Inner transaction cannot be an aggregated transaction.');
        }
        return utils_1.DtoMapping.assign(this, { signer });
    }
    /**
     * Transaction pending to be included in a block
     * @returns {boolean}
     */
    isUnconfirmed() {
        return (this.transactionInfo != null &&
            this.transactionInfo.height.compact() === 0 &&
            this.transactionInfo.hash !== undefined &&
            this.transactionInfo.merkleComponentHash !== undefined &&
            this.transactionInfo.hash.toUpperCase() === this.transactionInfo.merkleComponentHash.toUpperCase());
    }
    /**
     * Transaction included in a block
     * @returns {boolean}
     */
    isConfirmed() {
        return this.transactionInfo != null && this.transactionInfo.height.compact() > 0;
    }
    /**
     * Returns if a transaction has missing signatures.
     * @returns {boolean}
     */
    hasMissingSignatures() {
        return (this.transactionInfo != null &&
            this.transactionInfo.height.compact() === 0 &&
            this.transactionInfo.hash !== undefined &&
            this.transactionInfo.merkleComponentHash !== undefined &&
            this.transactionInfo.hash.toUpperCase() !== this.transactionInfo.merkleComponentHash.toUpperCase());
    }
    /**
     * Transaction is not known by the network
     * @return {boolean}
     */
    isUnannounced() {
        return this.transactionInfo == null;
    }
    /**
     * @internal
     */
    versionToDTO() {
        return (this.networkType << 8) + this.version;
    }
    /**
     * @internal
     */
    versionToHex() {
        return '0x' + this.versionToDTO().toString(16);
    }
    /**
     * @description reapply a given value to the transaction in an immutable way
     * @param {Deadline} deadline
     * @returns {Transaction}
     * @memberof Transaction
     */
    reapplyGiven(deadline) {
        if (this.isUnannounced()) {
            return utils_1.DtoMapping.assign(this, { deadline });
        }
        throw new Error("an Announced transaction can't be modified");
    }
    /**
     * @override Transaction.size()
     * @description get the byte size of a transaction using the builder
     * @returns {number}
     * @memberof TransferTransaction
     */
    get size() {
        var _a;
        return (_a = this.payloadSize) !== null && _a !== void 0 ? _a : this.createBuilder().getSize();
    }
    /**
     * @internal
     * Set payload size
     * @param size payload size
     * @returns {AggregateTransaction}
     */
    setPayloadSize(size) {
        this.payloadSize = size;
        return this;
    }
    /**
     * @internal
     * @returns {Uint8Array}
     */
    generateBytes() {
        return this.createBuilder().serialize();
    }
    /**
     * @description Serialize a transaction object
     * @returns {string}
     * @memberof Transaction
     */
    serialize() {
        return format_1.Convert.uint8ToHex(this.generateBytes());
    }
    /**
     * @description Create JSON object
     * @returns {Object}
     * @memberof Transaction
     */
    toJSON() {
        const commonTransactionObject = {
            type: this.type,
            network: this.networkType,
            version: this.version,
            maxFee: this.maxFee.toString(),
            deadline: this.deadline.toString(),
            signature: this.signature ? this.signature : '',
        };
        if (this.signer) {
            Object.assign(commonTransactionObject, {
                signerPublicKey: this.signer.publicKey,
            });
        }
        const childClassObject = (0, transaction_1.SerializeTransactionToJSON)(this);
        return {
            transaction: Object.assign(commonTransactionObject, childClassObject),
        };
    }
    /**
     * @internal
     * Check if index and height exists in transactionInfo
     * @returns TransactionInfo
     */
    checkTransactionHeightAndIndex() {
        if (this.transactionInfo === undefined || this.transactionInfo.height === undefined || this.transactionInfo.index === undefined) {
            throw new Error('Transaction height or index undefined');
        }
        return this.transactionInfo;
    }
    /**
     * @internal
     * Checks if the transaction is signer by an address.
     * @param address the address.
     */
    isSigned(address) {
        return this.signer !== undefined && this.signer.address.equals(address);
    }
    /**
     * @internal
     *
     * Converts the optional signer to a PublicKeyDto that can be serialized.
     */
    getSignerAsBuilder() {
        var _a;
        return ((_a = this.signer) === null || _a === void 0 ? void 0 : _a.toBuilder()) || new bitxor_catbuffer_typescript_1.PublicKeyDto(new Uint8Array(32));
    }
    /**
     * @internal
     *
     * Converts the optional signature to a SignatureDto that can be serialized.
     */
    getSignatureAsBuilder() {
        return new bitxor_catbuffer_typescript_1.SignatureDto(this.signature !== undefined ? format_1.Convert.hexToUint8(this.signature) : new Uint8Array(64));
    }
    /**
     * @internal
     *
     * Returns the signature from the serialized payload.
     */
    static getSignatureFromPayload(payload, isEmbedded) {
        const signature = payload.substring(16, 144);
        return this.resolveSignature(signature, isEmbedded);
    }
    /**
     * @internal
     *
     * Returns the signature hold in the transaction.
     */
    static resolveSignature(signature, isEmbedded) {
        return !signature || isEmbedded || signature.match(`^[0]*$`) ? undefined : signature;
    }
}
exports.Transaction = Transaction;
/**
 * Transaction header size
 *
 * Included fields are `size`, `verifiableEntityHeader_Reserved1`,
 * `signature`, `signerPublicKey` and `entityBody_Reserved1`.
 *
 * @var {number}
 */
Transaction.Header_Size = 8 + 64 + 32 + 3;
/**
 * Index of the transaction *type*
 *
 * Included fields are the transaction header, `version`
 * and `network`
 *
 * @var {number}
 */
Transaction.Type_Index = Transaction.Header_Size + 3;
/**
 * Index of the transaction *body*
 *
 * Included fields are the transaction header, `version`,
 * `network`, `type`, `maxFee` and `deadline`
 *
 * @var {number}
 */
Transaction.Body_Index = Transaction.Header_Size + 1 + 2 + 2 + 8 + 8;
//# sourceMappingURL=Transaction.js.map