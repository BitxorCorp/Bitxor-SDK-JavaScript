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
exports.NodeHealth = void 0;
/**
 * The node info structure describes basic information of a node health.
 */
class NodeHealth {
    /**
     * @param apiNode
     * @param db
     */
    constructor(
    /**
     * The api node status
     */
    apiNode, 
    /**
     * The database status
     */
    db) {
        this.apiNode = apiNode;
        this.db = db;
    }
}
exports.NodeHealth = NodeHealth;
//# sourceMappingURL=NodeHealth.js.map