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
exports.MultisigAccountInfo = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
/**
 * The multisig account graph info structure describes the information of all the mutlisig levels an account is involved in.
 */
class MultisigAccountInfo {
    /**
     * @param version
     * @param accountAddress
     * @param minApproval
     * @param minRemoval
     * @param cosignatoryAddresses
     * @param multisigAddresses
     */
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * The account multisig address.
     */
    accountAddress, 
    /**
     * The number of signatures needed to approve a transaction.
     */
    minApproval, 
    /**
     * The number of signatures needed to remove a cosignatory.
     */
    minRemoval, 
    /**
     * The multisig account cosignatories.
     */
    cosignatoryAddresses, 
    /**
     * The multisig accounts this account is cosigner of.
     */
    multisigAddresses) {
        this.version = version;
        this.accountAddress = accountAddress;
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }
    /**
     * Checks if the account is a multisig account.
     * @returns {boolean}
     */
    isMultisig() {
        return this.minRemoval !== 0 && this.minApproval !== 0;
    }
    /**
     * Checks if an account is cosignatory of the multisig account.
     * @param address
     * @returns {boolean}
     */
    hasCosigner(address) {
        return this.cosignatoryAddresses.find((cosigner) => cosigner.equals(address)) !== undefined;
    }
    /**
     * Checks if the multisig account is cosignatory of an account.
     * @param address
     * @returns {boolean}
     */
    isCosignerOfMultisigAccount(address) {
        return this.multisigAddresses.find((multisig) => multisig.equals(address)) !== undefined;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        return new bitxor_catbuffer_typescript_1.MultisigEntryBuilder(this.version, this.minApproval, this.minRemoval, this.accountAddress.toBuilder(), this.cosignatoryAddresses.map((cosig) => cosig.toBuilder()), this.multisigAddresses.map((address) => address.toBuilder())).serialize();
    }
}
exports.MultisigAccountInfo = MultisigAccountInfo;
//# sourceMappingURL=MultisigAccountInfo.js.map