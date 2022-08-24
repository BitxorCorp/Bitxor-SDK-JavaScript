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
exports.Deadline = exports.defaultDeadline = exports.defaultChronoUnit = void 0;
const core_1 = require("@js-joda/core");
const UInt64_1 = require("../UInt64");
exports.defaultChronoUnit = core_1.ChronoUnit.HOURS;
exports.defaultDeadline = 2;
/**
 * The deadline of the transaction. The deadline is given as the number of seconds elapsed since the creation of the genesis block.
 * If a transaction does not get included in a block before the deadline is reached, it is deleted.
 */
class Deadline {
    /**
     * Constructor
     * @param adjustedValue Adjusted value. (Local datetime minus genesis epoch adjustment)
     */
    constructor(adjustedValue) {
        this.adjustedValue = adjustedValue;
    }
    /**
     * Create deadline model. Default to 2 chrono hours in advance.
     * @param {number} epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties. e.g. 1573430400;
     * @param {number} deadline the deadline unit value.
     * @param {ChronoUnit} chronoUnit the crhono unit. e.g ChronoUnit.HOURS
     * @returns {Deadline}
     */
    static create(epochAdjustment, deadline = exports.defaultDeadline, chronoUnit = exports.defaultChronoUnit) {
        const deadlineDateTime = core_1.Instant.now().plus(deadline, chronoUnit);
        if (deadline <= 0) {
            throw new Error('deadline should be greater than 0');
        }
        return Deadline.createFromAdjustedValue(deadlineDateTime.minusSeconds(epochAdjustment).toEpochMilli());
    }
    /**
     *
     * Create an empty Deadline object using min local datetime.
     * It can be used used for embedded or genesis transactions
     *
     * @returns {Deadline}
     */
    static createEmtpy() {
        return Deadline.createFromAdjustedValue(0);
    }
    /**
     *
     * Create a Deadline where the adjusted values was externally calculated.
     *
     * @returns {Deadline}
     */
    static createFromAdjustedValue(adjustedValue) {
        return new Deadline(adjustedValue);
    }
    /**
     * @param value
     * @returns {Deadline}
     */
    static createFromDTO(value) {
        const uint64Value = 'string' === typeof value ? UInt64_1.UInt64.fromNumericString(value) : new UInt64_1.UInt64(value);
        return new Deadline(uint64Value.compact());
    }
    /**
     * @internal
     */
    toDTO() {
        return UInt64_1.UInt64.fromUint(this.adjustedValue).toDTO();
    }
    /**
     * @internal
     */
    toString() {
        return UInt64_1.UInt64.fromUint(this.adjustedValue).toString();
    }
    /**
     * Returns deadline as local date time.
     * @param epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties.
     * @returns {LocalDateTime}
     */
    toLocalDateTime(epochAdjustment) {
        return this.toLocalDateTimeGivenTimeZone(epochAdjustment, core_1.ZoneId.SYSTEM);
    }
    /**
     * Returns deadline as local date time.
     * @param epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties.
     * @param zoneId the Zone Id.
     * @returns {LocalDateTime}
     */
    toLocalDateTimeGivenTimeZone(epochAdjustment, zoneId) {
        return core_1.LocalDateTime.ofInstant(core_1.Instant.ofEpochMilli(this.adjustedValue).plusMillis(core_1.Duration.ofSeconds(epochAdjustment).toMillis()), zoneId);
    }
}
exports.Deadline = Deadline;
//# sourceMappingURL=Deadline.js.map