"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObjectProperties = exports.decodeBlock = exports.decodeChar = exports.Char_To_Decoded_Char_Map = exports.encodeBlock = exports.generateNamespaceId = exports.split = exports.append = exports.extractPartName = exports.throwInvalidFqn = exports.idGeneratorConst = exports.tryParseUint = exports.tryParseByte = exports.Encoded_Block_Size = exports.Decoded_Block_Size = exports.Alphabet = exports.Nibble_To_Char_Map = exports.createBuilder = void 0;
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
const js_sha3_1 = require("js-sha3");
const createBuilder = () => {
    const map = {};
    return {
        map,
        /**
         * Adds a range mapping to the map.
         * @param {string} start The start character.
         * @param {string} end The end character.
         * @param {number} base The value corresponding to the start character.
         * @memberof module:utils/charMapping~CharacterMapBuilder
         * @instance
         */
        addRange: (start, end, base) => {
            const startCode = start.charCodeAt(0);
            const endCode = end.charCodeAt(0);
            for (let code = startCode; code <= endCode; ++code) {
                map[String.fromCharCode(code)] = code - startCode + base;
            }
        },
    };
};
exports.createBuilder = createBuilder;
const Char_To_Nibble_Map = () => {
    const builder = (0, exports.createBuilder)();
    builder.addRange('0', '9', 0);
    builder.addRange('a', 'f', 10);
    builder.addRange('A', 'F', 10);
    return builder.map;
};
const Char_To_Digit_Map = () => {
    const builder = (0, exports.createBuilder)();
    builder.addRange('0', '9', 0);
    return builder.map;
};
exports.Nibble_To_Char_Map = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
exports.Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
exports.Decoded_Block_Size = 5;
exports.Encoded_Block_Size = 8;
const tryParseByte = (char1, char2) => {
    const charMap = Char_To_Nibble_Map();
    const nibble1 = charMap[char1];
    const nibble2 = charMap[char2];
    return undefined === nibble1 || undefined === nibble2 ? undefined : (nibble1 << 4) | nibble2;
};
exports.tryParseByte = tryParseByte;
/**
 * Tries to parse a string representing an unsigned integer.
 * @param {string} str The string to parse.
 * @returns { number | undefined} The number represented by the input or undefined.
 */
const tryParseUint = (str) => {
    if ('0' === str) {
        return 0;
    }
    let value = 0;
    for (const char of str) {
        const charMap = Char_To_Digit_Map();
        const digit = charMap[char];
        if (undefined === digit || (0 === value && 0 === digit)) {
            return undefined;
        }
        value *= 10;
        value += digit;
        if (value > Number.MAX_SAFE_INTEGER) {
            return undefined;
        }
    }
    return value;
};
exports.tryParseUint = tryParseUint;
exports.idGeneratorConst = {
    namespace_base_id: [0, 0],
    name_pattern: /^[a-z0-9][a-z0-9-_]*$/,
};
const throwInvalidFqn = (reason, name) => {
    throw Error(`fully qualified id is invalid due to ${reason} (${name})`);
};
exports.throwInvalidFqn = throwInvalidFqn;
const extractPartName = (name, start, size) => {
    if (0 === size) {
        (0, exports.throwInvalidFqn)('empty part', name);
    }
    const partName = name.substr(start, size);
    if (!exports.idGeneratorConst.name_pattern.test(partName)) {
        (0, exports.throwInvalidFqn)(`invalid part name [${partName}]`, name);
    }
    return partName;
};
exports.extractPartName = extractPartName;
const append = (path, id) => {
    path.push(id);
};
exports.append = append;
const split = (name, processor) => {
    let start = 0;
    for (let index = 0; index < name.length; ++index) {
        if ('.' === name[index]) {
            processor(start, index - start);
            start = index + 1;
        }
    }
    return start;
};
exports.split = split;
const generateNamespaceId = (parentId, name) => {
    const hash = js_sha3_1.sha3_256.create();
    hash.update(Uint32Array.from(parentId).buffer);
    hash.update(name);
    const result = new Uint32Array(hash.arrayBuffer());
    // right zero-filling required to keep unsigned number representation
    return [result[0], (result[1] | 0x80000000) >>> 0];
};
exports.generateNamespaceId = generateNamespaceId;
const encodeBlock = (input, inputOffset, output, outputOffset) => {
    output[outputOffset + 0] = exports.Alphabet[input[inputOffset + 0] >> 3];
    output[outputOffset + 1] = exports.Alphabet[((input[inputOffset + 0] & 0x07) << 2) | (input[inputOffset + 1] >> 6)];
    output[outputOffset + 2] = exports.Alphabet[(input[inputOffset + 1] & 0x3e) >> 1];
    output[outputOffset + 3] = exports.Alphabet[((input[inputOffset + 1] & 0x01) << 4) | (input[inputOffset + 2] >> 4)];
    output[outputOffset + 4] = exports.Alphabet[((input[inputOffset + 2] & 0x0f) << 1) | (input[inputOffset + 3] >> 7)];
    output[outputOffset + 5] = exports.Alphabet[(input[inputOffset + 3] & 0x7f) >> 2];
    output[outputOffset + 6] = exports.Alphabet[((input[inputOffset + 3] & 0x03) << 3) | (input[inputOffset + 4] >> 5)];
    output[outputOffset + 7] = exports.Alphabet[input[inputOffset + 4] & 0x1f];
};
exports.encodeBlock = encodeBlock;
const Char_To_Decoded_Char_Map = () => {
    const builder = (0, exports.createBuilder)();
    builder.addRange('A', 'Z', 0);
    builder.addRange('2', '7', 26);
    return builder.map;
};
exports.Char_To_Decoded_Char_Map = Char_To_Decoded_Char_Map;
const decodeChar = (c) => {
    const charMap = (0, exports.Char_To_Decoded_Char_Map)();
    const decodedChar = charMap[c];
    if (undefined !== decodedChar) {
        return decodedChar;
    }
    throw Error(`illegal base32 character ${c}`);
};
exports.decodeChar = decodeChar;
const decodeBlock = (input, inputOffset, output, outputOffset) => {
    const bytes = new Uint8Array(exports.Encoded_Block_Size);
    for (let i = 0; i < exports.Encoded_Block_Size; ++i) {
        bytes[i] = (0, exports.decodeChar)(input[inputOffset + i]);
    }
    output[outputOffset + 0] = (bytes[0] << 3) | (bytes[1] >> 2);
    output[outputOffset + 1] = ((bytes[1] & 0x03) << 6) | (bytes[2] << 1) | (bytes[3] >> 4);
    output[outputOffset + 2] = ((bytes[3] & 0x0f) << 4) | (bytes[4] >> 1);
    output[outputOffset + 3] = ((bytes[4] & 0x01) << 7) | (bytes[5] << 2) | (bytes[6] >> 3);
    output[outputOffset + 4] = ((bytes[6] & 0x07) << 5) | bytes[7];
};
exports.decodeBlock = decodeBlock;
/**
 * Traverses the tree object to pick addresses strings.
 * @param {array} array of multisig children
 * @param {parse} function to parse tree and pick children addresses
 */
const parseObjectProperties = (obj, parse) => {
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            (0, exports.parseObjectProperties)(obj[k], parse);
        }
        else if (Object.prototype.hasOwnProperty.call(obj, k)) {
            parse(k, obj[k]);
        }
    }
};
exports.parseObjectProperties = parseObjectProperties;
//# sourceMappingURL=Utilities.js.map