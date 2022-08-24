import { ChronoUnit, LocalDateTime, ZoneId } from '@js-joda/core';
export declare const defaultChronoUnit: ChronoUnit;
export declare const defaultDeadline = 2;
/**
 * The deadline of the transaction. The deadline is given as the number of seconds elapsed since the creation of the genesis block.
 * If a transaction does not get included in a block before the deadline is reached, it is deleted.
 */
export declare class Deadline {
    /**
     * Deadline value (without Genesis epoch adjustment)
     */
    adjustedValue: number;
    /**
     * Create deadline model. Default to 2 chrono hours in advance.
     * @param {number} epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties. e.g. 1573430400;
     * @param {number} deadline the deadline unit value.
     * @param {ChronoUnit} chronoUnit the crhono unit. e.g ChronoUnit.HOURS
     * @returns {Deadline}
     */
    static create(epochAdjustment: number, deadline?: number, chronoUnit?: ChronoUnit): Deadline;
    /**
     *
     * Create an empty Deadline object using min local datetime.
     * It can be used used for embedded or genesis transactions
     *
     * @returns {Deadline}
     */
    static createEmtpy(): Deadline;
    /**
     *
     * Create a Deadline where the adjusted values was externally calculated.
     *
     * @returns {Deadline}
     */
    static createFromAdjustedValue(adjustedValue: number): Deadline;
    /**
     * @param value
     * @returns {Deadline}
     */
    static createFromDTO(value: string | number[]): Deadline;
    /**
     * Constructor
     * @param adjustedValue Adjusted value. (Local datetime minus genesis epoch adjustment)
     */
    private constructor();
    /**
     * Returns deadline as local date time.
     * @param epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties.
     * @returns {LocalDateTime}
     */
    toLocalDateTime(epochAdjustment: number): LocalDateTime;
    /**
     * Returns deadline as local date time.
     * @param epochAdjustment the network's epoch adjustment (seconds). Defined in the network/properties.
     * @param zoneId the Zone Id.
     * @returns {LocalDateTime}
     */
    toLocalDateTimeGivenTimeZone(epochAdjustment: number, zoneId: ZoneId): LocalDateTime;
}
