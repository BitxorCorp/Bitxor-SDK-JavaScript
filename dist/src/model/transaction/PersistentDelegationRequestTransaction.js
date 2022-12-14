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
exports.PersistentDelegationRequestTransaction = void 0;
const Address_1 = require("../account/Address");
const PersistentHarvestingDelegationMessage_1 = require("../message/PersistentHarvestingDelegationMessage");
const UInt64_1 = require("../UInt64");
const TransferTransaction_1 = require("./TransferTransaction");
class PersistentDelegationRequestTransaction extends TransferTransaction_1.TransferTransaction {
    /**
     * Create a PersistentDelegationRequestTransaction with special message payload
     * for presistent harvesting delegation unlocking
     * @param deadline - The deadline to include the transaction.
     * @param remoteLinkedPrivateKey - Remote harvester signing private key linked to the main account
     * @param vrfPrivateKey - VRF private key linked to the main account
     * @param nodePublicKey - Node certificate public key
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TransferTransaction}
     */
    static createPersistentDelegationRequestTransaction(deadline, remoteLinkedPrivateKey, vrfPrivateKey, nodePublicKey, networkType, maxFee = new UInt64_1.UInt64([0, 0]), signature, signer) {
        const message = PersistentHarvestingDelegationMessage_1.PersistentHarvestingDelegationMessage.create(remoteLinkedPrivateKey, vrfPrivateKey, nodePublicKey, networkType);
        return super.create(deadline, Address_1.Address.createFromPublicKey(nodePublicKey, networkType), [], message, networkType, maxFee, signature, signer);
    }
}
exports.PersistentDelegationRequestTransaction = PersistentDelegationRequestTransaction;
//# sourceMappingURL=PersistentDelegationRequestTransaction.js.map