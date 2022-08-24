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
exports.NamespaceTokenIdGenerator = void 0;
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
class NamespaceTokenIdGenerator {
}
exports.NamespaceTokenIdGenerator = NamespaceTokenIdGenerator;
/**
 * @param {Uint8Array} nonce Token nonce
 * @param {Uint8Array} ownerAddress Address
 * @returns {number[]} token Id
 */
NamespaceTokenIdGenerator.tokenId = (nonce, ownerAddress) => {
    return format_1.IdGenerator.generateTokenId(nonce, ownerAddress);
};
/**
 * @returns random token nonce
 */
NamespaceTokenIdGenerator.generateRandomTokenNonce = () => {
    return crypto_1.Crypto.randomBytes(4);
};
/**
 * @param {string} namespaceName - The namespace name
 * @returns sub namespace id
 */
NamespaceTokenIdGenerator.namespaceId = (namespaceName) => {
    const path = format_1.IdGenerator.generateNamespacePath(namespaceName);
    return path.length ? format_1.IdGenerator.generateNamespacePath(namespaceName)[path.length - 1] : [];
};
/**
 * @param {string} parentNamespaceName - The parent namespace name
 * @param {string} namespaceName - The namespace name
 * @returns sub namespace parent id
 */
NamespaceTokenIdGenerator.subnamespaceParentId = (parentNamespaceName, namespaceName) => {
    const path = format_1.IdGenerator.generateNamespacePath(`${parentNamespaceName}.${namespaceName}`);
    return format_1.IdGenerator.generateNamespacePath(parentNamespaceName)[path.length - 2];
};
/**
 * @param {string} parentNamespaceName - The parent namespace name
 * @param {string} namespaceName - The namespace name
 * @returns sub namespace id
 */
NamespaceTokenIdGenerator.subnamespaceNamespaceId = (parentNamespaceName, namespaceName) => {
    const path = format_1.IdGenerator.generateNamespacePath(`${parentNamespaceName}.${namespaceName}`);
    return path[path.length - 1];
};
//# sourceMappingURL=NamespaceTokenIdGenerator.js.map