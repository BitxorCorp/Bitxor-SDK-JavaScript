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
exports.MerkleTreeLeaf = void 0;
/**
 * Merkle tree leaf node.
 */
class MerkleTreeLeaf {
    /**
     * @param type
     * @param path
     * @param encodedPath
     * @param nibbleCount
     * @param value
     * @param leafHash
     */
    constructor(
    /**
     * Merkle tree node type
     */
    type, 
    /**
     * Leaf node path
     */
    path, 
    /**
     * Leaf node path encoded
     */
    encodedPath, 
    /**
     * Leaf nibble count
     */
    nibbleCount, 
    /**
     * Leaf node value hash
     */
    value, 
    /**
     * Leaf node hash
     */
    leafHash) {
        this.type = type;
        this.path = path;
        this.encodedPath = encodedPath;
        this.nibbleCount = nibbleCount;
        this.value = value;
        this.leafHash = leafHash;
    }
}
exports.MerkleTreeLeaf = MerkleTreeLeaf;
//# sourceMappingURL=MerkleTreeLeaf.js.map