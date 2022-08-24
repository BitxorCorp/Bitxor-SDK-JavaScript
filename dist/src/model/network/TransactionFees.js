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
exports.TransactionFees = void 0;
/**
 * Transacation Fees
 */
class TransactionFees {
    /**
     * @param averageFeeMultiplier - Average fee multiplier over the last \"numBlocksTransactionFeeStats\".
     * @param medianFeeMultiplier - Median fee multiplier over the last \"numBlocksTransactionFeeStats\".
     * @param highestFeeMultiplier - Highest fee multiplier over the last "numBlocksTransactionFeeStats".
     * @param lowestFeeMultiplier - Lowest fee multiplier over the last "numBlocksTransactionFeeStats".
     * @param minFeeMultiplier - Node specific. Minimal fee multiplier on the current selected node.
     */
    constructor(averageFeeMultiplier, medianFeeMultiplier, highestFeeMultiplier, lowestFeeMultiplier, minFeeMultiplier) {
        this.averageFeeMultiplier = averageFeeMultiplier;
        this.medianFeeMultiplier = medianFeeMultiplier;
        this.highestFeeMultiplier = highestFeeMultiplier;
        this.lowestFeeMultiplier = lowestFeeMultiplier;
        this.minFeeMultiplier = minFeeMultiplier;
    }
}
exports.TransactionFees = TransactionFees;
//# sourceMappingURL=TransactionFees.js.map