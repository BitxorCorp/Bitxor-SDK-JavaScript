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
exports.AccountRestrictionModification = void 0;
class AccountRestrictionModification {
    /**
     * Constructor
     * @param modificationAction
     * @param value
     */
    constructor(
    /**
     * Modification type.
     */
    modificationAction, 
    /**
     * Modification value (Address, Token or Transaction Type).
     */
    value) {
        this.modificationAction = modificationAction;
        this.value = value;
    }
    /**
     * Create an address filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Address)
     * @returns {AccountRestrictionModification}
     */
    static createForAddress(modificationAction, value) {
        return new AccountRestrictionModification(modificationAction, value.plain());
    }
    /**
     * Create an token filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Token)
     * @returns {AccountRestrictionModification}
     */
    static createForToken(modificationAction, value) {
        return new AccountRestrictionModification(modificationAction, value.id.toDTO());
    }
    /**
     * Create an operation filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param operation - modification value (Transaction Type)
     * @returns {AccountRestrictionModification}
     */
    static createForOperation(modificationAction, value) {
        return new AccountRestrictionModification(modificationAction, value);
    }
    /**
     * @internal
     */
    toDTO() {
        return {
            value: this.value,
            modificationAction: this.modificationAction,
        };
    }
}
exports.AccountRestrictionModification = AccountRestrictionModification;
//# sourceMappingURL=AccountRestrictionModification.js.map