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
exports.CosignatureTransaction = void 0;
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const CosignatureSignedTransaction_1 = require("./CosignatureSignedTransaction");
const Transaction_1 = require("./Transaction");
/**
 * Cosignature transaction is used to sign an aggregate transactions with missing cosignatures.
 */
class CosignatureTransaction {
    /**
     * @param transactionToCosign Aggregate transaction
     */
    constructor(
    /**
     * Transaction to cosign.
     */
    transactionToCosign) {
        this.transactionToCosign = transactionToCosign;
    }
    /**
     * Create a cosignature transaction
     * @param transactionToCosign - Transaction to cosign.
     * @returns {CosignatureTransaction}
     */
    static create(transactionToCosign) {
        return new CosignatureTransaction(transactionToCosign);
    }
    /**
     * Co-sign transaction with transaction payload (off chain)
     * Creating a new CosignatureSignedTransaction
     * @param account - The signing account
     * @param payload - off transaction payload (aggregated transaction is unannounced)
     * @param generationHash - Network generation hash
     * @returns {CosignatureSignedTransaction}
     */
    static signTransactionPayload(account, payload, generationHash) {
        const transactionHash = Transaction_1.Transaction.createTransactionHash(payload, Array.from(format_1.Convert.hexToUint8(generationHash)));
        return this.signTransactionHash(account, transactionHash);
    }
    /**
     * Co-sign transaction with transaction hash (off chain)
     * Creating a new CosignatureSignedTransaction
     * @param account - The signing account
     * @param transactionHash - The hash of the aggregate transaction to be cosigned
     * @returns {CosignatureSignedTransaction}
     */
    static signTransactionHash(account, transactionHash) {
        const hashBytes = format_1.Convert.hexToUint8(transactionHash);
        const keyPairEncoded = crypto_1.KeyPair.createKeyPairFromPrivateKeyString(account.privateKey);
        const signature = crypto_1.KeyPair.sign(keyPairEncoded, new Uint8Array(hashBytes));
        return new CosignatureSignedTransaction_1.CosignatureSignedTransaction(transactionHash, format_1.Convert.uint8ToHex(signature), account.publicKey);
    }
    /**
     * Serialize and sign transaction creating a new SignedTransaction
     * @param account
     * @param transactionHash Transaction hash (optional)
     * @returns {CosignatureSignedTransaction}
     */
    signWith(account, transactionHash) {
        var _a;
        const hash = transactionHash || ((_a = this.transactionToCosign.transactionInfo) === null || _a === void 0 ? void 0 : _a.hash);
        if (!hash) {
            throw new Error('Transaction to cosign should be announced first');
        }
        return CosignatureTransaction.signTransactionHash(account, hash);
    }
}
exports.CosignatureTransaction = CosignatureTransaction;
//# sourceMappingURL=CosignatureTransaction.js.map