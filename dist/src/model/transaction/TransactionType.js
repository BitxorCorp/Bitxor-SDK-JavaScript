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
exports.TransactionType = void 0;
/**
 * Enum containing transaction type constants.
 */
var TransactionType;
(function (TransactionType) {
    /** Reserved entity type. */
    TransactionType[TransactionType["RESERVED"] = 0] = "RESERVED";
    /**
     * Transfer Transaction transaction type.
     * @type {number}
     */
    TransactionType[TransactionType["TRANSFER"] = 16724] = "TRANSFER";
    /**
     * Register namespace transaction type.
     * @type {number}
     */
    TransactionType[TransactionType["NAMESPACE_REGISTRATION"] = 16718] = "NAMESPACE_REGISTRATION";
    /**
     * Address alias transaction type
     * @type {number}
     */
    TransactionType[TransactionType["ADDRESS_ALIAS"] = 16974] = "ADDRESS_ALIAS";
    /**
     * Token alias transaction type
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_ALIAS"] = 17230] = "TOKEN_ALIAS";
    /**
     * Token definition transaction type.
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_DEFINITION"] = 16717] = "TOKEN_DEFINITION";
    /**
     * Token supply change transaction.
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_SUPPLY_CHANGE"] = 16973] = "TOKEN_SUPPLY_CHANGE";
    /**
     * Token supply revocation transaction.
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_SUPPLY_REVOCATION"] = 17229] = "TOKEN_SUPPLY_REVOCATION";
    /**
     * Modify multisig account transaction type.
     * @type {number}
     */
    TransactionType[TransactionType["MULTISIG_ACCOUNT_MODIFICATION"] = 16725] = "MULTISIG_ACCOUNT_MODIFICATION";
    /**
     * Aggregate complete transaction type.
     * @type {number}
     */
    TransactionType[TransactionType["AGGREGATE_COMPLETE"] = 16705] = "AGGREGATE_COMPLETE";
    /**
     * Aggregate bonded transaction type
     */
    TransactionType[TransactionType["AGGREGATE_BONDED"] = 16961] = "AGGREGATE_BONDED";
    /**
     * Lock transaction type
     * @type {number}
     */
    TransactionType[TransactionType["HASH_LOCK"] = 16712] = "HASH_LOCK";
    /**
     * Secret Lock Transaction type
     * @type {number}
     */
    TransactionType[TransactionType["SECRET_LOCK"] = 16722] = "SECRET_LOCK";
    /**
     * Secret Proof transaction type
     * @type {number}
     */
    TransactionType[TransactionType["SECRET_PROOF"] = 16978] = "SECRET_PROOF";
    /**
     * Account restriction address transaction type
     * @type {number}
     */
    TransactionType[TransactionType["ACCOUNT_ADDRESS_RESTRICTION"] = 16720] = "ACCOUNT_ADDRESS_RESTRICTION";
    /**
     * Account restriction token transaction type
     * @type {number}
     */
    TransactionType[TransactionType["ACCOUNT_TOKEN_RESTRICTION"] = 16976] = "ACCOUNT_TOKEN_RESTRICTION";
    /**
     * Account restriction operation transaction type
     * @type {number}
     */
    TransactionType[TransactionType["ACCOUNT_OPERATION_RESTRICTION"] = 17232] = "ACCOUNT_OPERATION_RESTRICTION";
    /**
     * Link account transaction type
     * @type {number}
     */
    TransactionType[TransactionType["ACCOUNT_KEY_LINK"] = 16716] = "ACCOUNT_KEY_LINK";
    /**
     * Token address restriction type
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_ADDRESS_RESTRICTION"] = 16977] = "TOKEN_ADDRESS_RESTRICTION";
    /**
     * Token global restriction type
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_GLOBAL_RESTRICTION"] = 16721] = "TOKEN_GLOBAL_RESTRICTION";
    /**
     * Account metadata transaction
     * @type {number}
     */
    TransactionType[TransactionType["ACCOUNT_METADATA"] = 16708] = "ACCOUNT_METADATA";
    /**
     * Token metadata transaction
     * @type {number}
     */
    TransactionType[TransactionType["TOKEN_METADATA"] = 16964] = "TOKEN_METADATA";
    /**
     * Namespace metadata transaction
     * @type {number}
     */
    TransactionType[TransactionType["NAMESPACE_METADATA"] = 17220] = "NAMESPACE_METADATA";
    /**
     * Link vrf key transaction
     * @type {number}
     */
    TransactionType[TransactionType["VRF_KEY_LINK"] = 16963] = "VRF_KEY_LINK";
    /**
     * Link voting key transaction
     * @type {number}
     */
    TransactionType[TransactionType["VOTING_KEY_LINK"] = 16707] = "VOTING_KEY_LINK";
    /**
     * Link node key transaction
     * @type {number}
     */
    TransactionType[TransactionType["NODE_KEY_LINK"] = 16972] = "NODE_KEY_LINK";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=TransactionType.js.map