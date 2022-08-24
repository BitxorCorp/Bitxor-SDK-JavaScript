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
exports.TokenInfo = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
/**
 * The token info structure describes a token.
 */
class TokenInfo {
    /**
     * @param version
     * @param recordId
     * @param id
     * @param supply
     * @param startHeight
     * @param ownerAddress
     * @param revision
     * @param flags
     * @param divisibility
     * @param duration
     */
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * The database record id.
     */
    recordId, 
    /**
     * The token id.
     */
    id, 
    /**
     * The token supply.
     */
    supply, 
    /**
     * The block height were token was created.
     */
    startHeight, 
    /**
     * The token owner address.
     */
    ownerAddress, 
    /**
     * The token revision
     */
    revision, 
    /**
     * The token flags.
     */
    flags, 
    /**
     * Token divisibility
     */
    divisibility, 
    /**
     * Token duration
     */
    duration) {
        this.version = version;
        this.recordId = recordId;
        this.id = id;
        this.supply = supply;
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    /**
     * Is token supply mutable
     * @returns {boolean}
     */
    isSupplyMutable() {
        return this.flags.supplyMutable;
    }
    /**
     * Is token transferable
     * @returns {boolean}
     */
    isTransferable() {
        return this.flags.transferable;
    }
    /**
     * Is token restrictable
     * @returns {boolean}
     */
    isRestrictable() {
        return this.flags.restrictable;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        const tokenId = this.id.toBuilder();
        const supply = new bitxor_catbuffer_typescript_1.AmountDto(this.supply.toDTO());
        const startHeight = new bitxor_catbuffer_typescript_1.HeightDto(this.startHeight.toDTO());
        const ownerAddress = this.ownerAddress.toBuilder();
        const revision = this.revision;
        const duration = new bitxor_catbuffer_typescript_1.BlockDurationDto(this.duration.toDTO());
        const flags = bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.TokenFlagsDto, this.flags.getValue());
        const properties = new bitxor_catbuffer_typescript_1.TokenPropertiesBuilder(flags, this.divisibility, duration);
        const definition = new bitxor_catbuffer_typescript_1.TokenDefinitionBuilder(startHeight, ownerAddress, revision, properties);
        return new bitxor_catbuffer_typescript_1.TokenEntryBuilder(this.version, tokenId, supply, definition).serialize();
    }
}
exports.TokenInfo = TokenInfo;
//# sourceMappingURL=TokenInfo.js.map