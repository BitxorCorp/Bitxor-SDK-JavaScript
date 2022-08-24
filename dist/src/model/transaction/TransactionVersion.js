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
exports.TransactionVersion = void 0;
/**
 * Static class containing transaction version constants.
 *
 * Transaction format versions are defined in bitxorcore-server in
 * each transaction's plugin source code.
 *
 * In [bitxorcore-server](https://github.com/bitxorcorp/bitxorcore-server), the `DEFINE_TRANSACTION_CONSTANTS` macro
 * is used to define the `TYPE` and `VERSION` of the transaction format.
 *
 * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/plugins/txes/transfer/src/model/TransferTransaction.h#L37
 */
class TransactionVersion {
}
exports.TransactionVersion = TransactionVersion;
/**
 * Transfer Transaction transaction version.
 * @type {number}
 */
TransactionVersion.TRANSFER = 1;
/**
 * Register namespace transaction version.
 * @type {number}
 */
TransactionVersion.NAMESPACE_REGISTRATION = 1;
/**
 * Token definition transaction version.
 * @type {number}
 */
TransactionVersion.TOKEN_DEFINITION = 1;
/**
 * Token supply change transaction.
 * @type {number}
 */
TransactionVersion.TOKEN_SUPPLY_CHANGE = 1;
/**
 * Token supply revocation transaction.
 * @type {number}
 */
TransactionVersion.TOKEN_SUPPLY_REVOCATION = 1;
/**
 * Modify multisig account transaction version.
 * @type {number}
 */
TransactionVersion.MULTISIG_ACCOUNT_MODIFICATION = 1;
/**
 * Aggregate complete transaction version.
 * @type {number}
 */
TransactionVersion.AGGREGATE_COMPLETE = 1;
/**
 * Aggregate bonded transaction version
 */
TransactionVersion.AGGREGATE_BONDED = 1;
/**
 * Lock transaction version
 * @type {number}
 */
TransactionVersion.HASH_LOCK = 1;
/**
 * Secret Lock transaction version
 * @type {number}
 */
TransactionVersion.SECRET_LOCK = 1;
/**
 * Secret Proof transaction version
 * @type {number}
 */
TransactionVersion.SECRET_PROOF = 1;
/**
 * Address Alias transaction version
 * @type {number}
 */
TransactionVersion.ADDRESS_ALIAS = 1;
/**
 * Token Alias transaction version
 * @type {number}
 */
TransactionVersion.TOKEN_ALIAS = 1;
/**
 * Token global restriction transaction version
 * @type {number}
 */
TransactionVersion.TOKEN_GLOBAL_RESTRICTION = 1;
/**
 * Token address restriction transaction version
 * @type {number}
 */
TransactionVersion.TOKEN_ADDRESS_RESTRICTION = 1;
/**
 * Account Restriction address transaction version
 * @type {number}
 */
TransactionVersion.ACCOUNT_ADDRESS_RESTRICTION = 1;
/**
 * Account Restriction token transaction version
 * @type {number}
 */
TransactionVersion.ACCOUNT_TOKEN_RESTRICTION = 1;
/**
 * Account Restriction operation transaction version
 * @type {number}
 */
TransactionVersion.MODIFY_ACCOUNT_RESTRICTION_ENTITY_TYPE = 1;
/**
 * Link account transaction version
 * @type {number}
 */
TransactionVersion.ACCOUNT_KEY_LINK = 1;
/**
 * Account metadata transaction version
 * @type {number}
 */
TransactionVersion.ACCOUNT_METADATA = 1;
/**
 * Token metadata transaction version
 * @type {number}
 */
TransactionVersion.TOKEN_METADATA = 1;
/**
 * Namespace metadata transaction version
 * @type {number}
 */
TransactionVersion.NAMESPACE_METADATA = 1;
/**
 * Vrf key link transaction version.
 * @type {number}
 */
TransactionVersion.VRF_KEY_LINK = 1;
/**
 * Voting key link transaction version.
 * @type {number}
 */
TransactionVersion.VOTING_KEY_LINK = 1;
/**
 * Node key link transaction version.
 * @type {number}
 */
TransactionVersion.NODE_KEY_LINK = 1;
//# sourceMappingURL=TransactionVersion.js.map