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
exports.AccountRestrictionTransaction = void 0;
const UInt64_1 = require("../UInt64");
const AccountAddressRestrictionTransaction_1 = require("./AccountAddressRestrictionTransaction");
const AccountOperationRestrictionTransaction_1 = require("./AccountOperationRestrictionTransaction");
const AccountTokenRestrictionTransaction_1 = require("./AccountTokenRestrictionTransaction");
class AccountRestrictionTransaction {
    /**
     * Create an account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountAddressRestrictionTransaction}
     */
    static createAddressRestrictionModificationTransaction(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return AccountAddressRestrictionTransaction_1.AccountAddressRestrictionTransaction.create(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee, signature, signer);
    }
    /**
     * Create an account token restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountTokenRestrictionTransaction}
     */
    static createTokenRestrictionModificationTransaction(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return AccountTokenRestrictionTransaction_1.AccountTokenRestrictionTransaction.create(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee, signature, signer);
    }
    /**
     * Create an account operation restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountOperationRestrictionTransaction}
     */
    static createOperationRestrictionModificationTransaction(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        return AccountOperationRestrictionTransaction_1.AccountOperationRestrictionTransaction.create(deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, networkType, maxFee, signature, signer);
    }
}
exports.AccountRestrictionTransaction = AccountRestrictionTransaction;
//# sourceMappingURL=AccountRestrictionTransaction.js.map