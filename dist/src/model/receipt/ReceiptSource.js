"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptSource = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
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
 * The receipt source object.
 */
class ReceiptSource {
    /**
     * @constructor
     * @param primaryId - The transaction primary source (e.g. index within block).
     * @param secondaryId - The transaction secondary source (e.g. index within aggregate).
     */
    constructor(
    /**
     * The transaction primary source (e.g. index within block).
     */
    primaryId, 
    /**
     * The transaction secondary source (e.g. index within aggregate).
     */
    secondaryId) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        return bitxor_catbuffer_typescript_1.GeneratorUtils.concatTypedArrays(bitxor_catbuffer_typescript_1.GeneratorUtils.uintToBuffer(this.primaryId, 4), bitxor_catbuffer_typescript_1.GeneratorUtils.uintToBuffer(this.secondaryId, 4));
    }
}
exports.ReceiptSource = ReceiptSource;
//# sourceMappingURL=ReceiptSource.js.map