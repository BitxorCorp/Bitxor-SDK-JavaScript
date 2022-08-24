"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRestrictionType = void 0;
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
var TokenRestrictionType;
(function (TokenRestrictionType) {
    /**
     * uninitialized value indicating no restriction
     */
    TokenRestrictionType[TokenRestrictionType["NONE"] = 0] = "NONE";
    /**
     * allow if equal
     */
    TokenRestrictionType[TokenRestrictionType["EQ"] = 1] = "EQ";
    /**
     * allow if not equal
     */
    TokenRestrictionType[TokenRestrictionType["NE"] = 2] = "NE";
    /**
     * allow if less than
     */
    TokenRestrictionType[TokenRestrictionType["LT"] = 3] = "LT";
    /**
     * allow if less than or equal
     */
    TokenRestrictionType[TokenRestrictionType["LE"] = 4] = "LE";
    /**
     * allow if greater than
     */
    TokenRestrictionType[TokenRestrictionType["GT"] = 5] = "GT";
    /**
     * allow if greater than or equal
     */
    TokenRestrictionType[TokenRestrictionType["GE"] = 6] = "GE";
})(TokenRestrictionType = exports.TokenRestrictionType || (exports.TokenRestrictionType = {}));
//# sourceMappingURL=TokenRestrictionType.js.map