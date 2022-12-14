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
exports.RestrictionFlag = void 0;
/**
 * @internal
 * Account restriction type
 * 0x01	Account restriction type is an address.
 * 0x02	Account restriction type is a token id.
 * 0x04	Account restriction type is a transaction type.
 * 0x05	restriction type sentinel.
 * 0x40 Account restriction is interpreted as outgoing restriction.
 * 0x80 Account restriction is interpreted as blocking operation.
 */
var RestrictionFlag;
(function (RestrictionFlag) {
    RestrictionFlag[RestrictionFlag["Address"] = 1] = "Address";
    RestrictionFlag[RestrictionFlag["Token"] = 2] = "Token";
    RestrictionFlag[RestrictionFlag["TransactionType"] = 4] = "TransactionType";
    RestrictionFlag[RestrictionFlag["Outgoing"] = 16384] = "Outgoing";
    RestrictionFlag[RestrictionFlag["Block"] = 32768] = "Block";
})(RestrictionFlag = exports.RestrictionFlag || (exports.RestrictionFlag = {}));
//# sourceMappingURL=RestrictionFlag.js.map