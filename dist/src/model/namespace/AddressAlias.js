"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressAlias = void 0;
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
const RawAddress_1 = require("../../core/format/RawAddress");
const Alias_1 = require("./Alias");
const AliasType_1 = require("./AliasType");
/**
 * The AddressAlias structure describes address aliases
 *
 * @since 0.10.2
 */
class AddressAlias extends Alias_1.Alias {
    /**
     * Create AddressAlias object
     * @param content
     */
    constructor(
    /**
     * The alias address
     */
    address) {
        super(AliasType_1.AliasType.Address, address, undefined);
        this.address = address;
    }
    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    equals(alias) {
        return alias && alias.type === this.type && this.address.equals(alias.address);
    }
    /**
     * Generate alias buffer
     * @return {Uint8Array}
     */
    serialize() {
        return RawAddress_1.RawAddress.stringToAddress(this.address.plain());
    }
}
exports.AddressAlias = AddressAlias;
//# sourceMappingURL=AddressAlias.js.map