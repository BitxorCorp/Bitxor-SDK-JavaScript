"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const utf8_1 = require("utf8");
const utilities = require("./Utilities");
class Convert {
    /**
     * Generate xor for two byte arrays and return in hex string
     * @param value1 - Value 1 bytes
     * @param value2  - Value 2 bytes
     * @return {string} - delta value in Hex
     */
    static xor(value1, value2) {
        const buffer1 = Buffer.from(value1.buffer);
        const buffer2 = Buffer.from(value2.buffer);
        const length = Math.max(buffer1.length, buffer2.length);
        const delta = [];
        for (let i = 0; i < length; ++i) {
            const xorBuffer = buffer1[i] ^ buffer2[i];
            delta.push(xorBuffer);
        }
        return Convert.uint8ToHex(Uint8Array.from(delta));
    }
    /**
     * It splits the number's bytes into a an array.
     * @param number the number
     * @param arraySize the expected size of the array.
     */
    static numberToUint8Array(number, arraySize) {
        const uint8Array = new Uint8Array(arraySize);
        for (let index = 0; index < uint8Array.length; index++) {
            const byte = number & 0xff;
            uint8Array[index] = byte;
            number = (number - byte) / 256;
        }
        return uint8Array;
    }
    /**
     * It creates a number from the bytes in the array.
     * @param array the number from the bytes.
     */
    static uintArray8ToNumber(array) {
        let value = 0;
        for (let index = 0; index < array.length; index++) {
            value += array[index] << (index * 8);
        }
        return value >>> 0;
    }
}
exports.Convert = Convert;
/**
 * Decodes two hex characters into a byte.
 * @param {string} char1 The first hex digit.
 * @param {string} char2 The second hex digit.
 * @returns {number} The decoded byte.
 */
Convert.toByte = (char1, char2) => {
    const byte = utilities.tryParseByte(char1, char2);
    if (undefined === byte) {
        throw Error(`unrecognized hex char, char1:${char1}, char2:${char2}`);
    }
    return byte;
};
/**
 * Determines whether or not a string is a hex string.
 * @param {string} input The string to test.
 * @param {string} expectedSize the expected size of the input
 * @returns {boolean} true if the input is a hex string, false otherwise.
 */
Convert.isHexString = (input, expectedSize = 0) => {
    if (0 !== input.length % 2) {
        return false;
    }
    for (let i = 0; i < input.length; i += 2) {
        if (undefined === utilities.tryParseByte(input[i], input[i + 1])) {
            return false;
        }
    }
    if (expectedSize && expectedSize !== input.length) {
        return false;
    }
    return true;
};
/**
 * Validates if a string is a valid hex of the expected size.
 * @param {string} input The string to test.
 * @param {string} expectedSize the expected size of the input
 * @param {string} message error message.
 */
Convert.validateHexString = (input, expectedSize, message) => {
    if (!Convert.isHexString(input, expectedSize)) {
        throw new Error(`${message}. Value ${input} is not an hex string of size ${expectedSize}.`);
    }
};
/**
 * Converts a hex string to a uint8 array.
 * @param {string} input A hex encoded string.
 * @returns {Uint8Array} A uint8 array corresponding to the input.
 */
Convert.hexToUint8 = (input) => {
    if (0 !== input.length % 2) {
        throw Error(`hex string has unexpected size '${input.length}'`);
    }
    const output = new Uint8Array(input.length / 2);
    for (let i = 0; i < input.length; i += 2) {
        output[i / 2] = Convert.toByte(input[i], input[i + 1]);
    }
    return output;
};
/**
 * Reversed convertion hex string to a uint8 array.
 * @param {string} input A hex encoded string.
 * @returns {Uint8Array} A uint8 array corresponding to the input.
 */
Convert.hexToUint8Reverse = (input) => {
    if (0 !== input.length % 2) {
        throw Error(`hex string has unexpected size '${input.length}'`);
    }
    const output = new Uint8Array(input.length / 2);
    for (let i = 0; i < input.length; i += 2) {
        output[output.length - 1 - i / 2] = Convert.toByte(input[i], input[i + 1]);
    }
    return output;
};
/**
 * Converts a uint8 array to a hex string.
 * @param {Uint8Array} input A uint8 array.
 * @returns {string} A hex encoded string corresponding to the input.
 */
Convert.uint8ToHex = (input) => {
    let s = '';
    for (const byte of input) {
        s += utilities.Nibble_To_Char_Map[byte >> 4];
        s += utilities.Nibble_To_Char_Map[byte & 0x0f];
    }
    return s;
};
/**
 * Converts a uint8 array to a uint32 array.
 * @param {Uint8Array} input A uint8 array.
 * @returns {Uint32Array} A uint32 array created from the input.
 */
Convert.uint8ToUint32 = (input) => new Uint32Array(input.buffer);
/**
 * Converts a uint32 array to a uint8 array.
 * @param {Uint32Array} input A uint32 array.
 * @returns {Uint8Array} A uint8 array created from the input.
 */
Convert.uint32ToUint8 = (input) => new Uint8Array(input.buffer);
/** Converts an unsigned byte to a signed byte with the same binary representation.
 * @param {number} input An unsigned byte.
 * @returns {number} A signed byte with the same binary representation as the input.
 *
 */
Convert.uint8ToInt8 = (input) => {
    if (0xff < input) {
        throw Error(`input '${input}' is out of range`);
    }
    return (input << 24) >> 24;
};
/** Converts a signed byte to an unsigned byte with the same binary representation.
 * @param {number} input A signed byte.
 * @returns {number} An unsigned byte with the same binary representation as the input.
 */
Convert.int8ToUint8 = (input) => {
    if (127 < input || -128 > input) {
        throw Error(`input '${input}' is out of range`);
    }
    return input & 0xff;
};
/**
 * Convert UTF-8 to hex
 * @param {string} input - An UTF-8 string
 * @return {string}
 */
Convert.utf8ToHex = (input) => {
    return Buffer.from(input, 'utf-8').toString('hex').toUpperCase();
};
/**
 * Convert UTF-8 string to Uint8Array
 * @param {string} input - An string with UTF-8 encoding
 * @return {Uint8Array}
 */
Convert.utf8ToUint8 = (input) => {
    const hex = Convert.utf8ToHex(input);
    return Convert.hexToUint8(hex);
};
/**
 * Convert Uint8Array to string with UTF-8 encoding
 * @param {Uint8Array} input - An UTF-8 string
 * @return {string}
 */
Convert.uint8ToUtf8 = (input) => {
    // return new TextDecoder().decode(input);
    const hex = Convert.uint8ToHex(input);
    return Convert.decodeHex(hex);
};
/**
 * decode hex to uft8 string
 * @param hex - Hex input
 * @returns {string}
 */
Convert.decodeHex = (hex) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    try {
        return (0, utf8_1.decode)(str);
    }
    catch (e) {
        return str;
    }
};
//# sourceMappingURL=Convert.js.map