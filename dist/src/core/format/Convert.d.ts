export declare class Convert {
    /**
     * Decodes two hex characters into a byte.
     * @param {string} char1 The first hex digit.
     * @param {string} char2 The second hex digit.
     * @returns {number} The decoded byte.
     */
    static toByte: (char1: string, char2: string) => number;
    /**
     * Determines whether or not a string is a hex string.
     * @param {string} input The string to test.
     * @param {string} expectedSize the expected size of the input
     * @returns {boolean} true if the input is a hex string, false otherwise.
     */
    static isHexString: (input: string, expectedSize?: number) => boolean;
    /**
     * Validates if a string is a valid hex of the expected size.
     * @param {string} input The string to test.
     * @param {string} expectedSize the expected size of the input
     * @param {string} message error message.
     */
    static validateHexString: (input: string, expectedSize: number, message: string) => void;
    /**
     * Converts a hex string to a uint8 array.
     * @param {string} input A hex encoded string.
     * @returns {Uint8Array} A uint8 array corresponding to the input.
     */
    static hexToUint8: (input: string) => Uint8Array;
    /**
     * Reversed convertion hex string to a uint8 array.
     * @param {string} input A hex encoded string.
     * @returns {Uint8Array} A uint8 array corresponding to the input.
     */
    static hexToUint8Reverse: (input: string) => Uint8Array;
    /**
     * Converts a uint8 array to a hex string.
     * @param {Uint8Array} input A uint8 array.
     * @returns {string} A hex encoded string corresponding to the input.
     */
    static uint8ToHex: (input: any) => string;
    /**
     * Converts a uint8 array to a uint32 array.
     * @param {Uint8Array} input A uint8 array.
     * @returns {Uint32Array} A uint32 array created from the input.
     */
    static uint8ToUint32: (input: any) => Uint32Array;
    /**
     * Converts a uint32 array to a uint8 array.
     * @param {Uint32Array} input A uint32 array.
     * @returns {Uint8Array} A uint8 array created from the input.
     */
    static uint32ToUint8: (input: Uint32Array) => Uint8Array;
    /** Converts an unsigned byte to a signed byte with the same binary representation.
     * @param {number} input An unsigned byte.
     * @returns {number} A signed byte with the same binary representation as the input.
     *
     */
    static uint8ToInt8: (input: number) => number;
    /** Converts a signed byte to an unsigned byte with the same binary representation.
     * @param {number} input A signed byte.
     * @returns {number} An unsigned byte with the same binary representation as the input.
     */
    static int8ToUint8: (input: number) => number;
    /**
     * Convert UTF-8 to hex
     * @param {string} input - An UTF-8 string
     * @return {string}
     */
    static utf8ToHex: (input: string) => string;
    /**
     * Convert UTF-8 string to Uint8Array
     * @param {string} input - An string with UTF-8 encoding
     * @return {Uint8Array}
     */
    static utf8ToUint8: (input: string) => Uint8Array;
    /**
     * Convert Uint8Array to string with UTF-8 encoding
     * @param {Uint8Array} input - An UTF-8 string
     * @return {string}
     */
    static uint8ToUtf8: (input: Uint8Array) => string;
    /**
     * decode hex to uft8 string
     * @param hex - Hex input
     * @returns {string}
     */
    static decodeHex: (hex: string) => string;
    /**
     * Generate xor for two byte arrays and return in hex string
     * @param value1 - Value 1 bytes
     * @param value2  - Value 2 bytes
     * @return {string} - delta value in Hex
     */
    static xor(value1: Uint8Array, value2: Uint8Array): string;
    /**
     * It splits the number's bytes into a an array.
     * @param number the number
     * @param arraySize the expected size of the array.
     */
    static numberToUint8Array(number: number, arraySize: number): Uint8Array;
    /**
     * It creates a number from the bytes in the array.
     * @param array the number from the bytes.
     */
    static uintArray8ToNumber(array: Uint8Array): number;
}
