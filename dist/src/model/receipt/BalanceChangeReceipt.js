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
exports.BalanceChangeReceipt = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const Receipt_1 = require("./Receipt");
const ReceiptVersion_1 = require("./ReceiptVersion");
/**
 * Balance Change: A token credit or debit was triggered.
 */
class BalanceChangeReceipt extends Receipt_1.Receipt {
    /**
     * Balance change expiry receipt
     * @param targetAddress - The target account address.
     * @param tokenId - The token id.
     * @param amount - The amount of token.
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(
    /**
     * The target account address.
     */
    targetAddress, 
    /**
     * The token id.
     */
    tokenId, 
    /**
     * The amount of token.
     */
    amount, version, type, size) {
        super(version, type, size);
        this.targetAddress = targetAddress;
        this.tokenId = tokenId;
        this.amount = amount;
    }
    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        return new bitxor_catbuffer_typescript_1.BalanceChangeReceiptBuilder(ReceiptVersion_1.ReceiptVersion.BALANCE_CHANGE, this.type.valueOf(), new bitxor_catbuffer_typescript_1.TokenBuilder(this.tokenId.toBuilder(), new bitxor_catbuffer_typescript_1.AmountDto(this.amount.toDTO())), this.targetAddress.toBuilder()).serialize();
    }
}
exports.BalanceChangeReceipt = BalanceChangeReceipt;
//# sourceMappingURL=BalanceChangeReceipt.js.map