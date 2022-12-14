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
exports.TransactionStatement = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const js_sha3_1 = require("js-sha3");
const ReceiptType_1 = require("./ReceiptType");
const ReceiptVersion_1 = require("./ReceiptVersion");
/**
 * A transaction statement is a collection of receipts linked with a transaction in a particular block.
 * - Balance Transfer: A token transfer was triggered.
 * - Balance Change: A token credit or debit was triggered.
 * - Artifact Expiry: An artifact (e.g. namespace, token) expired.
 */
class TransactionStatement {
    /**
     * Receipt - transaction statement object
     * @param height - The block height
     * @param source - The receipt source
     * @param receipts - The array of receipt headers.
     */
    constructor(
    /**
     * The block height.
     */
    height, 
    /**
     * The receipt source.
     */
    source, 
    /**
     * The array of receipt headers.
     */
    receipts) {
        this.height = height;
        this.source = source;
        this.receipts = receipts;
    }
    /**
     * Generate receipt hash
     * @return {string} receipt hash in hex
     */
    generateHash() {
        const hasher = js_sha3_1.sha3_256.create();
        hasher.update(bitxor_catbuffer_typescript_1.GeneratorUtils.uintToBuffer(ReceiptVersion_1.ReceiptVersion.TRANSACTION_STATEMENT, 2));
        hasher.update(bitxor_catbuffer_typescript_1.GeneratorUtils.uintToBuffer(ReceiptType_1.ReceiptType.Transaction_Group, 2));
        hasher.update(this.source.serialize());
        let receiptBytes = Uint8Array.from([]);
        this.receipts.forEach((receipt) => {
            const bytes = receipt.serialize();
            receiptBytes = bitxor_catbuffer_typescript_1.GeneratorUtils.concatTypedArrays(receiptBytes, bytes);
        });
        hasher.update(receiptBytes);
        return hasher.hex().toUpperCase();
    }
}
exports.TransactionStatement = TransactionStatement;
//# sourceMappingURL=TransactionStatement.js.map