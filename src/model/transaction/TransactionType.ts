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

/**
 * Enum containing transaction type constants.
 */
export enum TransactionType {
    /** Reserved entity type. */
    RESERVED = 0,
    /**
     * Transfer Transaction transaction type.
     * @type {number}
     */
    TRANSFER = 16724,

    /**
     * Register namespace transaction type.
     * @type {number}
     */
    NAMESPACE_REGISTRATION = 16718,

    /**
     * Address alias transaction type
     * @type {number}
     */
    ADDRESS_ALIAS = 16974,

    /**
     * Token alias transaction type
     * @type {number}
     */
    TOKEN_ALIAS = 17230,

    /**
     * Token definition transaction type.
     * @type {number}
     */
    TOKEN_DEFINITION = 16717,

    /**
     * Token supply change transaction.
     * @type {number}
     */
    TOKEN_SUPPLY_CHANGE = 16973,

    /**
     * Token supply revocation transaction.
     * @type {number}
     */
    TOKEN_SUPPLY_REVOCATION = 17229,

    /**
     * Modify multisig account transaction type.
     * @type {number}
     */
    MULTISIG_ACCOUNT_MODIFICATION = 16725,

    /**
     * Aggregate complete transaction type.
     * @type {number}
     */
    AGGREGATE_COMPLETE = 16705,

    /**
     * Aggregate bonded transaction type
     */
    AGGREGATE_BONDED = 16961,

    /**
     * Lock transaction type
     * @type {number}
     */
    HASH_LOCK = 16712,

    /**
     * Secret Lock Transaction type
     * @type {number}
     */
    SECRET_LOCK = 16722,

    /**
     * Secret Proof transaction type
     * @type {number}
     */
    SECRET_PROOF = 16978,

    /**
     * Account restriction address transaction type
     * @type {number}
     */
    ACCOUNT_ADDRESS_RESTRICTION = 16720,

    /**
     * Account restriction token transaction type
     * @type {number}
     */
    ACCOUNT_TOKEN_RESTRICTION = 16976,

    /**
     * Account restriction operation transaction type
     * @type {number}
     */
    ACCOUNT_OPERATION_RESTRICTION = 17232,

    /**
     * Link account transaction type
     * @type {number}
     */
    ACCOUNT_KEY_LINK = 16716,

    /**
     * Token address restriction type
     * @type {number}
     */
    TOKEN_ADDRESS_RESTRICTION = 16977,

    /**
     * Token global restriction type
     * @type {number}
     */
    TOKEN_GLOBAL_RESTRICTION = 16721,

    /**
     * Account metadata transaction
     * @type {number}
     */
    ACCOUNT_METADATA = 16708,

    /**
     * Token metadata transaction
     * @type {number}
     */
    TOKEN_METADATA = 16964,

    /**
     * Namespace metadata transaction
     * @type {number}
     */
    NAMESPACE_METADATA = 17220,

    /**
     * Link vrf key transaction
     * @type {number}
     */
    VRF_KEY_LINK = 16963,

    /**
     * Link voting key transaction
     * @type {number}
     */
    VOTING_KEY_LINK = 16707,

    /**
     * Link node key transaction
     * @type {number}
     */
    NODE_KEY_LINK = 16972,
}
