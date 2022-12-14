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
exports.LockHashUtils = void 0;
const js_sha256_1 = require("js-sha256");
const js_sha3_1 = require("js-sha3");
const ripemd160 = require("ripemd160");
const LockHashAlgorithm_1 = require("../../model/lock/LockHashAlgorithm");
/**
 * Hash utilities for SecretLock hashing
 */
class LockHashUtils {
    /**
     * Perform SHA3_256 hash
     * @param input buffer to be hashed
     * @returns {string} Hash in hexidecimal format
     */
    static Op_Sha3_256(input) {
        return js_sha3_1.sha3_256.create().update(input).hex().toUpperCase();
    }
    /**
     * Perform SHA256 hash
     * @param input buffer to be hashed
     * @returns {string} Hash in hexidecimal format
     */
    static Op_Hash_256(input) {
        const hash = (0, js_sha256_1.sha256)(input);
        return (0, js_sha256_1.sha256)(Buffer.from(hash, 'hex')).toUpperCase();
    }
    /**
     * Perform ripemd160 hash
     * @param input buffer to be hashed
     * @returns {string} Hash in hexidecimal format
     */
    static Op_Hash_160(input) {
        const sha256Hash = (0, js_sha256_1.sha256)(input);
        return new ripemd160().update(Buffer.from(sha256Hash, 'hex')).digest('hex').toUpperCase();
    }
    /**
     * Perform hash for SecretLock with proficed hash algorithm
     * @param hashAlgorithm Hash algorithm
     * @param input buffer to be hashed
     * @returns {string} Hash in hexidecimal format
     */
    static Hash(hashAlgorithm, input) {
        switch (hashAlgorithm) {
            case LockHashAlgorithm_1.LockHashAlgorithm.Op_Hash_160:
                return LockHashUtils.Op_Hash_160(input);
            case LockHashAlgorithm_1.LockHashAlgorithm.Op_Hash_256:
                return LockHashUtils.Op_Hash_256(input);
            case LockHashAlgorithm_1.LockHashAlgorithm.Op_Sha3_256:
                return LockHashUtils.Op_Sha3_256(input);
            default:
                throw new Error('HashAlgorithm is invalid.');
        }
    }
}
exports.LockHashUtils = LockHashUtils;
//# sourceMappingURL=LockHashUtils.js.map