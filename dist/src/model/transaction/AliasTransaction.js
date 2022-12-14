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
exports.AliasTransaction = void 0;
const UInt64_1 = require("../UInt64");
const AddressAliasTransaction_1 = require("./AddressAliasTransaction");
const TokenAliasTransaction_1 = require("./TokenAliasTransaction");
const Transaction_1 = require("./Transaction");
class AliasTransaction extends Transaction_1.Transaction {
    /**
     * Create an address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AddressAliasTransaction}
     */
    static createForAddress(deadline, aliasAction, namespaceId, address, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return AddressAliasTransaction_1.AddressAliasTransaction.create(deadline, aliasAction, namespaceId, address, networkType, maxFee, signature, signer);
    }
    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    static createForToken(deadline, aliasAction, namespaceId, tokenId, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return TokenAliasTransaction_1.TokenAliasTransaction.create(deadline, aliasAction, namespaceId, tokenId, networkType, maxFee, signature, signer);
    }
}
exports.AliasTransaction = AliasTransaction;
//# sourceMappingURL=AliasTransaction.js.map