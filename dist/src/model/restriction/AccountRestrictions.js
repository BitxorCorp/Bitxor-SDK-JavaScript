"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictions = void 0;
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
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
/**
 * Account restrictions structure describes restriction information for an account.
 */
class AccountRestrictions {
    /**
     * Constructor
     * @param version version
     * @param recordId the data base id.
     * @param address the target address
     * @param restrictions the restrictions
     */
    constructor(version, recordId, address, restrictions) {
        this.version = version;
        this.recordId = recordId;
        this.address = address;
        this.restrictions = restrictions;
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        const address = this.address.toBuilder();
        const restrictions = this.restrictions.map((r) => {
            const addressRestrictions = new bitxor_catbuffer_typescript_1.AccountRestrictionAddressValueBuilder(r.values.filter((v) => typeof v !== 'number' && v.isAddress()).map((a) => a.toBuilder()));
            const tokenIdRestrictions = new bitxor_catbuffer_typescript_1.AccountRestrictionTokenValueBuilder(r.values.filter((v) => typeof v !== 'number' && v.isTokenId()).map((a) => a.toBuilder()));
            const transactionTypeRestrictions = new bitxor_catbuffer_typescript_1.AccountRestrictionTransactionTypeValueBuilder(r.values.filter((v) => typeof v === 'number').map((a) => a));
            return new bitxor_catbuffer_typescript_1.AccountRestrictionsInfoBuilder(bitxor_catbuffer_typescript_1.GeneratorUtils.toFlags(bitxor_catbuffer_typescript_1.AccountRestrictionFlagsDto, r.restrictionFlags), addressRestrictions, tokenIdRestrictions, transactionTypeRestrictions);
        });
        return new bitxor_catbuffer_typescript_1.AccountRestrictionsBuilder(this.version, address, restrictions).serialize();
    }
}
exports.AccountRestrictions = AccountRestrictions;
//# sourceMappingURL=AccountRestrictions.js.map