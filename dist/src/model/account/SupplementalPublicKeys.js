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
exports.SupplementalPublicKeys = void 0;
/**
 * SupplementalPublicKeys
 */
class SupplementalPublicKeys {
    /**
     *
     */
    constructor(
    /**
     * Linked keys
     */
    linked, 
    /**
     * Node linked keys
     */
    node, 
    /**
     * VRF linked keys
     */
    vrf, 
    /**
     * Voting linked keys
     */
    voting) {
        this.linked = linked;
        this.node = node;
        this.vrf = vrf;
        this.voting = voting;
    }
}
exports.SupplementalPublicKeys = SupplementalPublicKeys;
//# sourceMappingURL=SupplementalPublicKeys.js.map