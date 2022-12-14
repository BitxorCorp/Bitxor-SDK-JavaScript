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
exports.NetworkCurrencies = void 0;
const Currency_1 = require("./Currency");
/**
 * Object holding the bitxor network currencies, main and harvest.
 */
class NetworkCurrencies {
    /**
     * Constructor
     *
     * @param currency the network main currency.
     * @param harvest the network harvest currency.
     */
    constructor(currency, harvest) {
        this.currency = currency;
        this.harvest = harvest;
    }
}
exports.NetworkCurrencies = NetworkCurrencies;
/**
 * The pre-configured public currencies for easier offline access.
 */
NetworkCurrencies.PUBLIC = new NetworkCurrencies(Currency_1.Currency.PUBLIC, Currency_1.Currency.PUBLIC);
//# sourceMappingURL=NetworkCurrencies.js.map