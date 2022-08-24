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
exports.NamespaceInfo = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const NamespaceRegistrationType_1 = require("./NamespaceRegistrationType");
const Long = require("long");
/**
 * Object containing information of a namespace.
 */
class NamespaceInfo {
    /**
     * @param version
     * @param active
     * @param index
     * @param recordId
     * @param registrationType
     * @param depth
     * @param levels
     * @param parentId
     * @param ownerAddress
     * @param startHeight
     * @param endHeight
     * @param alias
     */
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * Namespace is active.
     */
    active, 
    /**
     * The namespace index.
     */
    index, 
    /**
     * The meta data id.
     */
    recordId, 
    /**
     * The namespace registration type, namespace and sub namespace.
     */
    registrationType, 
    /**
     * The level of namespace.
     */
    depth, 
    /**
     * The namespace id levels.
     */
    levels, 
    /**
     * The namespace parent id.
     */
    parentId, 
    /**
     * The namespace owner's address.
     */
    ownerAddress, 
    /**
     * The height at which the ownership begins.
     */
    startHeight, 
    /**
     * The height at which the ownership ends.
     */
    endHeight, 
    /**
     * The alias linked to a namespace.
     */
    alias) {
        this.version = version;
        this.active = active;
        this.index = index;
        this.recordId = recordId;
        this.registrationType = registrationType;
        this.depth = depth;
        this.levels = levels;
        this.parentId = parentId;
        this.ownerAddress = ownerAddress;
        this.startHeight = startHeight;
        this.endHeight = endHeight;
        this.alias = alias;
    }
    /**
     * Namespace id
     * @returns {Id}
     */
    get id() {
        return this.levels[this.levels.length - 1];
    }
    /**
     * Is root namespace
     * @returns {boolean}
     */
    isRoot() {
        return this.registrationType === 0;
    }
    /**
     * Is sub namepsace
     * @returns {boolean}
     */
    isSubnamespace() {
        return this.registrationType === 1;
    }
    /**
     * Has alias
     * @returns {boolean}
     */
    hasAlias() {
        return this.alias.type !== 0;
    }
    /**
     * Get parent id
     * @returns {Id}
     */
    parentNamespaceId() {
        if (this.isRoot()) {
            throw new Error('Is a Root Namespace');
        }
        return this.parentId;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(fullPath) {
        const root = fullPath.find((n) => n.registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.RootNamespace);
        if (!root) {
            throw new Error('Cannot find root namespace info.');
        }
        const id = root.id.toBuilder();
        const ownerAddress = root.ownerAddress.toBuilder();
        const lifetime = new bitxor_catbuffer_typescript_1.NamespaceLifetimeBuilder(new bitxor_catbuffer_typescript_1.HeightDto(root.startHeight.toDTO()), new bitxor_catbuffer_typescript_1.HeightDto(root.endHeight.toDTO()));
        const rootAlias = this.getAliasBuilder(root);
        const paths = this.getNamespacePath(fullPath, root.id);
        return new bitxor_catbuffer_typescript_1.RootNamespaceHistoryBuilder(this.version, id, ownerAddress, lifetime, rootAlias, paths).serialize();
    }
    /**
     * Generate the namespace full path builder
     * @param namespaces Full path of namespaces
     * @param rootId Root namespace id
     * @returns {NamespacePathBuilder[]}
     */
    getNamespacePath(namespaces, rootId) {
        const path = [];
        const level1 = this.sortNamespaceInfo(namespaces.filter((n) => n.depth === 2 && n.parentId.equals(rootId)));
        level1.forEach((n) => {
            const level2 = this.sortNamespaceInfo(namespaces.filter((l) => l.depth === 3 && l.parentId.equals(n.id)));
            path.push(new bitxor_catbuffer_typescript_1.NamespacePathBuilder([n.id.toBuilder()], this.getAliasBuilder(n)));
            if (level2.length) {
                level2.forEach((l) => {
                    path.push(new bitxor_catbuffer_typescript_1.NamespacePathBuilder([n.id.toBuilder(), l.id.toBuilder()], this.getAliasBuilder(l)));
                });
            }
        });
        return path;
    }
    /**
     * Generate namespace alias builder
     * @param namespaceInfo namespace info
     * @requires {NamespaceAliasBuilder}
     */
    getAliasBuilder(namespaceInfo) {
        var _a, _b;
        return new bitxor_catbuffer_typescript_1.NamespaceAliasBuilder(namespaceInfo.alias.type.valueOf(), (_a = namespaceInfo.alias.tokenId) === null || _a === void 0 ? void 0 : _a.toBuilder(), (_b = namespaceInfo.alias.address) === null || _b === void 0 ? void 0 : _b.toBuilder());
    }
    /**
     * Sort namespace info by namespace id
     * @param info array of namespace info
     * @returns {NamespaceInfo[]}
     */
    sortNamespaceInfo(info) {
        return info.sort((a, b) => {
            const long_a = Long.fromBits(a.id.id.lower, a.id.id.higher, true);
            const long_b = Long.fromBits(b.id.id.lower, b.id.id.higher, true);
            return long_a.compare(long_b);
        });
    }
}
exports.NamespaceInfo = NamespaceInfo;
//# sourceMappingURL=NamespaceInfo.js.map