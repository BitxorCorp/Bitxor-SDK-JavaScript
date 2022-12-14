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
exports.AddressRestrictionFlag = void 0;
const RestrictionFlag_1 = require("./RestrictionFlag");
var AddressRestrictionFlag;
(function (AddressRestrictionFlag) {
    /**
     * Allow only incoming transactions from a given address.
     */
    AddressRestrictionFlag[AddressRestrictionFlag["AllowIncomingAddress"] = 1] = "AllowIncomingAddress";
    /**
     * Allow only outgoing transactions to a given address.
     */
    AddressRestrictionFlag[AddressRestrictionFlag["AllowOutgoingAddress"] = 16385] = "AllowOutgoingAddress";
    /**
     * Block incoming transactions from a given address.
     */
    AddressRestrictionFlag[AddressRestrictionFlag["BlockIncomingAddress"] = 32769] = "BlockIncomingAddress";
    /**
     * Block outgoing transactions from a given address.
     */
    AddressRestrictionFlag[AddressRestrictionFlag["BlockOutgoingAddress"] = 49153] = "BlockOutgoingAddress";
})(AddressRestrictionFlag = exports.AddressRestrictionFlag || (exports.AddressRestrictionFlag = {}));
//# sourceMappingURL=AddressRestrictionFlag.js.map