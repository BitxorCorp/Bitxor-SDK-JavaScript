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
exports.OperationRestrictionFlag = void 0;
const RestrictionFlag_1 = require("./RestrictionFlag");
var OperationRestrictionFlag;
(function (OperationRestrictionFlag) {
    /**
     * Allow only outgoing transactions with a given transaction type.
     */
    OperationRestrictionFlag[OperationRestrictionFlag["AllowOutgoingTransactionType"] = 16388] = "AllowOutgoingTransactionType";
    /**
     * Block outgoing transactions with a given transaction type.
     */
    OperationRestrictionFlag[OperationRestrictionFlag["BlockOutgoingTransactionType"] = 49156] = "BlockOutgoingTransactionType";
})(OperationRestrictionFlag = exports.OperationRestrictionFlag || (exports.OperationRestrictionFlag = {}));
//# sourceMappingURL=OperationRestrictionFlag.js.map