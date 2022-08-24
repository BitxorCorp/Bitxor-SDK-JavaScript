"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLinkVotingKey = void 0;
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
 * Account link voting key
 */
class AccountLinkVotingKey {
    /**
     *
     */
    constructor(
    /**
     * public key
     */
    publicKey, 
    /**
     * Start epoch
     */
    startEpoch, 
    /**
     * End epoch
     */
    endEpoch) {
        this.publicKey = publicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }
}
exports.AccountLinkVotingKey = AccountLinkVotingKey;
//# sourceMappingURL=AccountLinkVotingKey.js.map