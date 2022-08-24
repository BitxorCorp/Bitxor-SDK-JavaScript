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
exports.MetadataEntry = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
class MetadataEntry {
    /**
     * Constructor
     * @param {number} version - The version
     * @param {string} compositeHash - The composite hash
     * @param {string} sourceAddress - The metadata source address (provider)
     * @param {string} targetAddress - The metadata target address
     * @param {UInt64} scopedMetadataKey - The key scoped to source, target and type
     * @param {MetadatType} metadataType - The metadata type (Account | Token | Namespace)
     * @param {string} value - The metadata value
     * @param {UnresolvedTokenId | undefined} targetId - The target token or namespace identifier
     */
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * The composite hash
     */
    compositeHash, 
    /**
     * The metadata source address (provider)
     */
    sourceAddress, 
    /**
     * The metadata target address
     */
    targetAddress, 
    /**
     * The key scoped to source, target and type
     */
    scopedMetadataKey, 
    /**
     * The metadata type
     */
    metadataType, 
    /**
     * The metadata value
     */
    value, 
    /**
     * The target token or namespace identifier
     */
    targetId) {
        this.version = version;
        this.compositeHash = compositeHash;
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.metadataType = metadataType;
        this.value = value;
        this.targetId = targetId;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        var _a;
        const sourceAddress = this.sourceAddress.toBuilder();
        const targetAddress = this.targetAddress.toBuilder();
        /** Metadata key scoped to source, target and type. */
        const scopedMetadataKey = new bitxor_catbuffer_typescript_1.ScopedMetadataKeyDto(this.scopedMetadataKey.toDTO());
        /** Target id. */
        const targetId = ((_a = this.targetId) === null || _a === void 0 ? void 0 : _a.id.toDTO()) || [0, 0];
        /** Metadata type. */
        const metadataType = this.metadataType.valueOf();
        /** Value. */
        const value = new bitxor_catbuffer_typescript_1.MetadataValueBuilder(format_1.Convert.utf8ToUint8(this.value));
        return new bitxor_catbuffer_typescript_1.MetadataEntryBuilder(this.version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value).serialize();
    }
}
exports.MetadataEntry = MetadataEntry;
//# sourceMappingURL=MetadataEntry.js.map