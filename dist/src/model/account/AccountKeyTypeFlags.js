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
exports.AccountKeyTypeFlags = void 0;
/**
 * The account key flags enum,.
 */
var AccountKeyTypeFlags;
(function (AccountKeyTypeFlags) {
    /**
     * Unset key.
     */
    AccountKeyTypeFlags[AccountKeyTypeFlags["Unset"] = 0] = "Unset";
    /**
     * Linked account public key.
     * note This can be either a remote or main account public key depending on context.
     */
    AccountKeyTypeFlags[AccountKeyTypeFlags["Linked"] = 1] = "Linked";
    /**
     * Node public key on which remote is allowed to harvest.
     */
    AccountKeyTypeFlags[AccountKeyTypeFlags["Node"] = 2] = "Node";
    /**
     * VRF public key.
     */
    AccountKeyTypeFlags[AccountKeyTypeFlags["VRF"] = 4] = "VRF";
    /**
     * All valid keys.
     */
    AccountKeyTypeFlags[AccountKeyTypeFlags["All"] = 7] = "All";
})(AccountKeyTypeFlags = exports.AccountKeyTypeFlags || (exports.AccountKeyTypeFlags = {}));
//# sourceMappingURL=AccountKeyTypeFlags.js.map