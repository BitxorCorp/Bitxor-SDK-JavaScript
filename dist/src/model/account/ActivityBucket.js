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
exports.ActivityBucket = void 0;
/**
 * Account activity bucket.
 */
class ActivityBucket {
    /**
     * Constructor
     * @param meta
     * @param accountRestrictions
     */
    constructor(
    /**
     * Start height
     */
    startHeight, 
    /**
     * Total fees paid.
     */
    totalFeesPaid, 
    /**
     * Beneficiary count.
     */
    beneficiaryCount, 
    /**
     * Raw score.
     */
    rawScore) {
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
}
exports.ActivityBucket = ActivityBucket;
//# sourceMappingURL=ActivityBucket.js.map