"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyAlias = void 0;
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
const Alias_1 = require("./Alias");
const AliasType_1 = require("./AliasType");
/**
 * The EmptyAlias structure describes empty aliases (type:0)
 *
 * @since 0.10.2
 */
class EmptyAlias extends Alias_1.Alias {
    /**
     * Create EmptyAlias object
     *
     * @param type
     * @param content
     */
    constructor() {
        super(AliasType_1.AliasType.None);
    }
    /**
     * Compares EmptyAlias for equality.
     *
     * @return boolean
     */
    equals(alias) {
        return alias && alias.type === this.type;
    }
    /**
     * Generate alias buffer
     * @return {Uint8Array}
     */
    serialize() {
        return new Uint8Array(0);
    }
}
exports.EmptyAlias = EmptyAlias;
//# sourceMappingURL=EmptyAlias.js.map