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
exports.Wallet = void 0;
/**
 * Wallet base model
 */
class Wallet {
    /**
     * @internal
     * @param name
     * @param network
     * @param address
     * @param creationDate
     * @param schema
     */
    constructor(
    /**
     * The wallet's name
     */
    name, 
    /**
     * The wallet's address
     */
    address, 
    /**
     * Wallet schema number
     */
    schema) {
        this.name = name;
        this.address = address;
        this.schema = schema;
    }
    /**
     * The wallet's network type
     * @type {NetworkType}
     */
    get networkType() {
        return this.address.networkType;
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map