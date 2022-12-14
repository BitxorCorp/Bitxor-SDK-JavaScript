"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
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
const js_sha3_1 = require("js-sha3");
const utilities = require("./Utilities");
class IdGenerator {
}
exports.IdGenerator = IdGenerator;
/**
 * Generates a token id given a nonce and a address.
 * @param {object} nonce The token nonce.
 * @param {object} ownerAddress The address.
 * @returns {module:coders/uint64~uint64} The token id.
 */
IdGenerator.generateTokenId = (nonce, ownerAddress) => {
    const hash = js_sha3_1.sha3_256.create();
    hash.update(nonce);
    hash.update(ownerAddress);
    const result = new Uint32Array(hash.arrayBuffer());
    return [result[0], result[1] & 0x7fffffff];
};
/**
 * Parses a unified namespace name into a path.
 * @param {string} name The unified namespace name.
 * @returns {array<module:coders/uint64~uint64>} The namespace path.
 */
IdGenerator.generateNamespacePath = (name) => {
    if (0 >= name.length) {
        utilities.throwInvalidFqn('having zero length', name);
    }
    let namespaceId = utilities.idGeneratorConst.namespace_base_id;
    const path = [];
    const start = utilities.split(name, (substringStart, size) => {
        namespaceId = utilities.generateNamespaceId(namespaceId, utilities.extractPartName(name, substringStart, size));
        utilities.append(path, namespaceId);
    });
    namespaceId = utilities.generateNamespaceId(namespaceId, utilities.extractPartName(name, start, name.length - start));
    utilities.append(path, namespaceId);
    return path;
};
//# sourceMappingURL=IdGenerator.js.map