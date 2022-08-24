"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
exports.SecretLockInfo = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
/**
 * Secret lock information
 */
class SecretLockInfo {
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * The stored database id.
     */
    recordId, 
    /**
     * Owner's address.
     */
    ownerAddress, 
    /**
     * Locked moasic id.
     */
    tokenId, 
    /**
     * Locked fund amount.
     */
    amount, 
    /**
     * Block height of the lock expires.
     */
    endHeight, 
    /**
     * Current lock status.
     */
    status, 
    /**
     * The lock hash algorithm.
     */
    hashAlgorithm, 
    /**
     * The lock secret.
     */
    secret, 
    /**
     * The recipient's address.
     */
    recipientAddress, 
    /**
     * The composite hash.
     */
    compositeHash) {
        this.version = version;
        this.recordId = recordId;
        this.ownerAddress = ownerAddress;
        this.tokenId = tokenId;
        this.amount = amount;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipientAddress = recipientAddress;
        this.compositeHash = compositeHash;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        const ownerAddress = this.ownerAddress.toBuilder();
        const token = new bitxor_catbuffer_typescript_1.TokenBuilder(this.tokenId.toBuilder(), new bitxor_catbuffer_typescript_1.AmountDto(this.amount.toDTO()));
        const endHeight = new bitxor_catbuffer_typescript_1.HeightDto(this.endHeight.toDTO());
        const recipient = this.recipientAddress.toBuilder();
        const secret = new bitxor_catbuffer_typescript_1.Hash256Dto(format_1.Convert.hexToUint8(this.secret));
        return new bitxor_catbuffer_typescript_1.SecretLockInfoBuilder(this.version, ownerAddress, token, endHeight, this.status.valueOf(), this.hashAlgorithm.valueOf(), secret, recipient).serialize();
    }
}
exports.SecretLockInfo = SecretLockInfo;
//# sourceMappingURL=SecretLockInfo.js.map