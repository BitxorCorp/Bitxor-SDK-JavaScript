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
exports.ArtifactExpiryReceipt = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const Receipt_1 = require("./Receipt");
const ReceiptVersion_1 = require("./ReceiptVersion");
/**
 * Artifact Expiry: An artifact (e.g. namespace, token) expired.
 */
class ArtifactExpiryReceipt extends Receipt_1.Receipt {
    /**
     * Artifact expiry receipt
     * @param artifactId -The id of the artifact (eg. namespace, token).
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(artifactId, version, type, size) {
        super(version, type, size);
        this.artifactId = artifactId;
    }
    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        if (!this.artifactId.isNamespaceId()) {
            return new bitxor_catbuffer_typescript_1.TokenExpiryReceiptBuilder(ReceiptVersion_1.ReceiptVersion.ARTIFACT_EXPIRY, this.type.valueOf(), this.artifactId.toBuilder()).serialize();
        }
        return new bitxor_catbuffer_typescript_1.NamespaceExpiryReceiptBuilder(ReceiptVersion_1.ReceiptVersion.ARTIFACT_EXPIRY, this.type.valueOf(), this.artifactId.toBuilder()).serialize();
    }
}
exports.ArtifactExpiryReceipt = ArtifactExpiryReceipt;
//# sourceMappingURL=ArtifactExpiryReceipt.js.map