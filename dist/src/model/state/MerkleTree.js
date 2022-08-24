"use strict";
/*
import { MerkleTreeBranch } from './MerkleTreeBranch';
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
exports.MerkleTree = void 0;
const format_1 = require("../../core/format");
const MerkleTreeNodeType_1 = require("./MerkleTreeNodeType");
const MerkleTreeParser_1 = require("./MerkleTreeParser");
/**
 * Merkle tree.
 */
class MerkleTree {
    /**
     * @param branches the branches
     * @param the leaf the leaf.
     */
    constructor(branches, leaf) {
        this.branches = branches;
        this.leaf = leaf;
    }
    /***
     *
     * @param raw
     */
    static fromRaw(raw) {
        var _a;
        const tree = new MerkleTreeParser_1.default().parseMerkleTreeFromRaw(format_1.Convert.hexToUint8(raw));
        return new MerkleTree(tree.filter((b) => b.type == MerkleTreeNodeType_1.MerkleTreeNodeType.Branch).map((b) => b), (_a = tree.filter((b) => b.type == MerkleTreeNodeType_1.MerkleTreeNodeType.Leaf).map((b) => b)) === null || _a === void 0 ? void 0 : _a[0]);
    }
}
exports.MerkleTree = MerkleTree;
//# sourceMappingURL=MerkleTree.js.map