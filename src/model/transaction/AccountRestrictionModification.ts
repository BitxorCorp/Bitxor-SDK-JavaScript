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

import { Address } from '../account/Address';
import { AccountRestrictionModificationAction } from '../restriction/AccountRestrictionModificationAction';
import { TokenId } from '../token/TokenId';
import { TransactionType } from './TransactionType';

export class AccountRestrictionModification<T> {
    /**
     * Constructor
     * @param modificationAction
     * @param value
     */
    constructor(
        /**
         * Modification type.
         */
        public readonly modificationAction: AccountRestrictionModificationAction,
        /**
         * Modification value (Address, Token or Transaction Type).
         */
        public readonly value: T,
    ) {}

    /**
     * Create an address filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Address)
     * @returns {AccountRestrictionModification}
     */
    public static createForAddress(
        modificationAction: AccountRestrictionModificationAction,
        value: Address,
    ): AccountRestrictionModification<string> {
        return new AccountRestrictionModification<string>(modificationAction, value.plain());
    }
    /**
     * Create an token filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Token)
     * @returns {AccountRestrictionModification}
     */
    public static createForToken(
        modificationAction: AccountRestrictionModificationAction,
        value: TokenId,
    ): AccountRestrictionModification<number[]> {
        return new AccountRestrictionModification<number[]>(modificationAction, value.id.toDTO());
    }

    /**
     * Create an operation filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param operation - modification value (Transaction Type)
     * @returns {AccountRestrictionModification}
     */
    public static createForOperation(
        modificationAction: AccountRestrictionModificationAction,
        value: number,
    ): AccountRestrictionModification<TransactionType> {
        return new AccountRestrictionModification<TransactionType>(modificationAction, value);
    }

    /**
     * @internal
     */
    toDTO(): any {
        return {
            value: this.value,
            modificationAction: this.modificationAction,
        };
    }
}
