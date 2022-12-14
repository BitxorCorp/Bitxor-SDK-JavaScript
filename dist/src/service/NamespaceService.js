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
exports.NamespaceService = void 0;
const operators_1 = require("rxjs/operators");
/**
 * Namespace service
 */
class NamespaceService {
    /**
     * Constructor
     * @param namespaceRepository
     */
    constructor(namespaceRepository) {
        this.namespaceRepository = namespaceRepository;
    }
    /**
     * Get namespace info and name from namespace Id
     * @param id
     * @returns {Observable<Namespace>}
     */
    namespace(id) {
        return this.namespaceRepository.getNamespace(id).pipe((0, operators_1.mergeMap)((namespaceInfo) => this.namespaceRepository.getNamespacesNames(namespaceInfo.levels).pipe((0, operators_1.map)((names) => Object.assign({
            __proto__: Object.getPrototypeOf(namespaceInfo),
        }, namespaceInfo, {
            name: this.extractFullNamespace(namespaceInfo, names),
        })))));
    }
    extractFullNamespace(namespace, namespaceNames) {
        return namespace.levels
            .map((level) => {
            const namespaceName = namespaceNames.find((name) => name.namespaceId.equals(level));
            if (namespace === undefined) {
                throw new Error('Not found');
            }
            return namespaceName;
        })
            .map((namespaceName) => namespaceName.name)
            .join('.');
    }
}
exports.NamespaceService = NamespaceService;
//# sourceMappingURL=NamespaceService.js.map