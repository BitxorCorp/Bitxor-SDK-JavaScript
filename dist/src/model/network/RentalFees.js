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
exports.RentalFees = void 0;
/**
 * Rental Fees
 */
class RentalFees {
    /**
     * @param effectiveRootNamespaceRentalFeePerBlock - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveRootNamespaceEternalFee - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveChildNamespaceRentalFee - Absolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     * @param effectiveTokenRentalFee - bsolute amount. An amount of 123456789 (absolute) for a token with divisibility 6 means 123.456789 (relative).
     */
    constructor(effectiveRootNamespaceRentalFeePerBlock, effectiveRootNamespaceEternalFee, effectiveChildNamespaceRentalFee, effectiveTokenRentalFee) {
        this.effectiveRootNamespaceRentalFeePerBlock = effectiveRootNamespaceRentalFeePerBlock;
        this.effectiveRootNamespaceEternalFee = effectiveRootNamespaceEternalFee;
        this.effectiveChildNamespaceRentalFee = effectiveChildNamespaceRentalFee;
        this.effectiveTokenRentalFee = effectiveTokenRentalFee;
    }
}
exports.RentalFees = RentalFees;
//# sourceMappingURL=RentalFees.js.map