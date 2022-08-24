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
import {
    AccountRestrictionAddressValueBuilder,
    AccountRestrictionFlagsDto,
    AccountRestrictionsBuilder,
    AccountRestrictionsInfoBuilder,
    AccountRestrictionTokenValueBuilder,
    AccountRestrictionTransactionTypeValueBuilder,
    GeneratorUtils,
} from 'bitxor-catbuffer-typescript';
import { Address } from '../account';
import { TokenId } from '../token';
import { AccountRestriction } from './AccountRestriction';

/**
 * Account restrictions structure describes restriction information for an account.
 */
export class AccountRestrictions {
    /**
     * Constructor
     * @param version version
     * @param recordId the data base id.
     * @param address the target address
     * @param restrictions the restrictions
     */
    constructor(
        public readonly version: number,
        public readonly recordId: string,
        public readonly address: Address,
        public readonly restrictions: AccountRestriction[],
    ) {}

    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        const address = this.address.toBuilder();
        const restrictions: AccountRestrictionsInfoBuilder[] = this.restrictions.map((r) => {
            const addressRestrictions = new AccountRestrictionAddressValueBuilder(
                r.values.filter((v) => typeof v !== 'number' && v.isAddress()).map((a) => (a as Address).toBuilder()),
            );
            const tokenIdRestrictions = new AccountRestrictionTokenValueBuilder(
                r.values.filter((v) => typeof v !== 'number' && v.isTokenId()).map((a) => (a as TokenId).toBuilder()),
            );
            const transactionTypeRestrictions = new AccountRestrictionTransactionTypeValueBuilder(
                r.values.filter((v) => typeof v === 'number').map((a) => a as number),
            );
            return new AccountRestrictionsInfoBuilder(
                GeneratorUtils.toFlags(AccountRestrictionFlagsDto, r.restrictionFlags),
                addressRestrictions,
                tokenIdRestrictions,
                transactionTypeRestrictions,
            );
        });

        return new AccountRestrictionsBuilder(this.version, address, restrictions).serialize();
    }
}
