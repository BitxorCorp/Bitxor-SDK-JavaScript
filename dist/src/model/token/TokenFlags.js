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
exports.TokenFlags = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
/**
 * Token flags model
 */
class TokenFlags {
    /**
     * @param flags
     */
    constructor(flags) {
        this.supplyMutable = (flags & bitxor_catbuffer_typescript_1.TokenFlagsDto.SUPPLY_MUTABLE) !== 0;
        this.transferable = (flags & bitxor_catbuffer_typescript_1.TokenFlagsDto.TRANSFERABLE) !== 0;
        this.restrictable = (flags & bitxor_catbuffer_typescript_1.TokenFlagsDto.RESTRICTABLE) !== 0;
        this.revokable = (flags & bitxor_catbuffer_typescript_1.TokenFlagsDto.REVOKABLE) !== 0;
    }
    /**
     * Static constructor function with default parameters
     * @returns {TokenFlags}
     * @param supplyMutable
     * @param transferable
     * @param restrictable
     * @param revokable
     */
    static create(supplyMutable, transferable, restrictable = false, revokable = false) {
        const flags = this.toFlag({
            supplyMutable: supplyMutable,
            transferable: transferable,
            restrictable: restrictable,
            revokable: revokable,
        });
        return new TokenFlags(flags);
    }
    /**
     * Get token flag value in number
     * @returns {number}
     */
    getValue() {
        return TokenFlags.toFlag(this);
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            flags: this.getValue(),
        };
    }
    /**
     * It "adds up" individual flags into a bit wise number flag.
     *
     * @param supplyMutable - if the supply is mutable. First flag.
     * @param transferable - if the balance can be transferred. Second flag.
     * @param restrictable - if the transaction can be restricted. Third flag.
     * @param revokable - if the balance can be revoked. Fourth flag.
     * @private
     */
    static toFlag({ supplyMutable, transferable, restrictable, revokable, }) {
        return (supplyMutable ? 1 : 0) + (transferable ? 2 : 0) + (restrictable ? 4 : 0) + (revokable ? 8 : 0);
    }
}
exports.TokenFlags = TokenFlags;
//# sourceMappingURL=TokenFlags.js.map