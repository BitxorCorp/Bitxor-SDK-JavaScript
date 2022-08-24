"use strict";
/*
import { AccountLinkNetworkProperties } from './AccountLinkNetworkProperties';
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
exports.PluginProperties = void 0;
/**
 * Network related configuration properties.
 */
class PluginProperties {
    /**
     * @param accountlink - Network identifier.
     * @param aggregate - Genesis public key.
     * @param lockhash - Genesis generation hash.
     * @param locksecret - Genesis epoch time adjustment.
     * @param metadata -
     * @param token -
     * @param multisig -
     * @param namespace -
     * @param restrictionaccount -
     * @param restrictiontoken -
     * @param transfer -
     */
    constructor(accountlink, aggregate, lockhash, locksecret, metadata, token, multisig, namespace, restrictionaccount, restrictiontoken, transfer) {
        this.accountlink = accountlink;
        this.aggregate = aggregate;
        this.lockhash = lockhash;
        this.locksecret = locksecret;
        this.metadata = metadata;
        this.token = token;
        this.multisig = multisig;
        this.namespace = namespace;
        this.restrictionaccount = restrictionaccount;
        this.restrictiontoken = restrictiontoken;
        this.transfer = transfer;
    }
}
exports.PluginProperties = PluginProperties;
//# sourceMappingURL=PluginProperties.js.map