/**
 * UInt64 data model
 */
export declare class UInt64 {
    /**
     * uint64 lower part
     */
    readonly lower: number;
    /**
     * uint64 higher part
     */
    readonly higher: number;
    /**
     * Create from uint value
     * @param value
     * @returns {UInt64}
     */
    static fromUint(value: number): UInt64;
    /**
     * Parses a hex string into a UInt64.
     * @param {string} input A hex encoded string.
     * @returns {module:coders/uint64~uint64} The uint64 representation of the input.
     */
    static fromHex(input: string): UInt64;
    /**
     * Parses a numeric string into a UInt64.
     * @param {string} input A numeric string.
     * @returns {module:coders/uint64~uint64} The uint64 representation of the input.
     */
    static fromNumericString(input: string): UInt64;
    /**
     * Check if input string is a numeric string or not
     * @param {string} input A string.
     * @returns {boolean}
     */
    static isLongNumericString(input: string): boolean;
    /**
     * Constructor
     * @param uintArray
     */
    constructor(uintArray: number[]);
    /**
     * Get DTO representation with format: `[lower, higher]`
     *
     * @returns {[number,number]}
     */
    toDTO(): number[];
    /**
     * Get hexadecimal representation
     *
     * @return {string}
     */
    toHex(): string;
    /**
     * Get numeric string representation
     *
     * @return {string}
     */
    toString(): string;
    /**
     * Compact higher and lower uint parts into a uint
     * @returns {number}
     */
    compact(): any;
    /**
     * Compares for equality
     * @param other
     * @returns {boolean}
     */
    equals(other: UInt64): boolean;
    /**
     * Compares two UInt64
     * @param other
     * @returns {number} - -1, 0, 1
     */
    compare(other: UInt64): number;
    /**
     * UInt64 add operation
     * @param other
     * @returns {UInt64}
     */
    add(other: UInt64): UInt64;
    /**
     * UInt64 add operation
     * @param other
     * @returns {UInt64}
     */
    subtract(other: UInt64): UInt64;
    /**
     * Convert long value to UInt64
     * @param longValue long value
     */
    private longToUint64;
}
