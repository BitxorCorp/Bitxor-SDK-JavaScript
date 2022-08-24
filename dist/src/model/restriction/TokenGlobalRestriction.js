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
exports.TokenGlobalRestriction = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
/**
 * Token global restriction structure describes restriction information for an token.
 */
class TokenGlobalRestriction {
    /**
     * Constructor
     * @param version
     * @param compositeHash
     * @param entryType
     * @param tokenId
     * @param restrictions
     */
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * composite hash
     */
    compositeHash, 
    /**
     * Token restriction entry type.
     */
    entryType, 
    /**
     * Token identifier.
     */
    tokenId, 
    /**
     * Token restriction items
     */
    restrictions) {
        this.version = version;
        this.compositeHash = compositeHash;
        this.entryType = entryType;
        this.tokenId = tokenId;
        this.restrictions = restrictions;
    }
    /**
     * Returns the restriction for a given key.
     *
     * @param key the key.
     */
    getRestriction(key) {
        return this.restrictions.find((item) => item.key.equals(key));
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        const tokenId = this.tokenId.toBuilder();
        const keyPairs = new bitxor_catbuffer_typescript_1.GlobalKeyValueSetBuilder(this.restrictions
            .sort((a, b) => a.key.compare(b.key))
            .map((item) => {
            const key = new bitxor_catbuffer_typescript_1.TokenRestrictionKeyDto(item.key.toDTO());
            const value = item.restrictionValue.toDTO();
            const restrictionRule = new bitxor_catbuffer_typescript_1.RestrictionRuleBuilder(item.referenceTokenId.toBuilder(), value, item.restrictionType);
            return new bitxor_catbuffer_typescript_1.GlobalKeyValueBuilder(key, restrictionRule);
        }));
        const globalRestrictionBuilder = new bitxor_catbuffer_typescript_1.TokenGlobalRestrictionEntryBuilder(tokenId, keyPairs);
        return new bitxor_catbuffer_typescript_1.TokenRestrictionEntryBuilder(this.version, bitxor_catbuffer_typescript_1.TokenRestrictionEntryTypeDto.GLOBAL, undefined, globalRestrictionBuilder).serialize();
    }
}
exports.TokenGlobalRestriction = TokenGlobalRestriction;
//# sourceMappingURL=TokenGlobalRestriction.js.map