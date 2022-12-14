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
exports.ResolutionEntry = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const RawAddress_1 = require("../../core/format/RawAddress");
const UInt64_1 = require("../UInt64");
/**
 * The receipt source object.
 */
class ResolutionEntry {
    /**
     * @constructor
     * @param resolved - A resolved address or resolved tokenId (alias).
     * @param source - The receipt source.
     */
    constructor(
    /**
     * A resolved address or resolved tokenId (alias).
     */
    resolved, 
    /**
     * The receipt source.
     */
    source) {
        this.resolved = resolved;
        this.source = source;
    }
    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        let resolvedBytes;
        if (this.resolved.isAddress()) {
            resolvedBytes = RawAddress_1.RawAddress.stringToAddress(this.resolved.plain());
        }
        else {
            resolvedBytes = bitxor_catbuffer_typescript_1.GeneratorUtils.uint64ToBuffer(UInt64_1.UInt64.fromHex(this.resolved.toHex()).toDTO());
        }
        const sourceBytes = this.source.serialize();
        return bitxor_catbuffer_typescript_1.GeneratorUtils.concatTypedArrays(resolvedBytes, sourceBytes);
    }
}
exports.ResolutionEntry = ResolutionEntry;
//# sourceMappingURL=ResolutionEntry.js.map