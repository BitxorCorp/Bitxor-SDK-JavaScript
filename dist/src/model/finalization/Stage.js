"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
exports.Stage = void 0;
/**
 * Message group stage enum
 */
var Stage;
(function (Stage) {
    Stage[Stage["Prevote"] = 0] = "Prevote";
    Stage[Stage["Precommit"] = 1] = "Precommit";
    Stage[Stage["Count"] = 2] = "Count";
})(Stage = exports.Stage || (exports.Stage = {}));
//# sourceMappingURL=Stage.js.map