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
exports.NetworkType = void 0;
/**
 * Static class containing network type constants.
 */
var NetworkType;
(function (NetworkType) {
    /**
     * Main net network
     * @type {number}
     */
    NetworkType[NetworkType["MAIN_NET"] = 3554] = "MAIN_NET";
    /**
     * Test net network
     * @type {number}
     */
    NetworkType[NetworkType["TEST_NET"] = 39204] = "TEST_NET";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
//# sourceMappingURL=NetworkType.js.map