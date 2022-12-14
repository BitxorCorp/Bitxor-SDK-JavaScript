export declare const createBuilder: () => any;
export declare const Nibble_To_Char_Map: string[];
export declare const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export declare const Decoded_Block_Size = 5;
export declare const Encoded_Block_Size = 8;
export declare const tryParseByte: (char1: any, char2: any) => any;
/**
 * Tries to parse a string representing an unsigned integer.
 * @param {string} str The string to parse.
 * @returns { number | undefined} The number represented by the input or undefined.
 */
export declare const tryParseUint: (str: string) => number | undefined;
export declare const idGeneratorConst: {
    namespace_base_id: number[];
    name_pattern: RegExp;
};
export declare const throwInvalidFqn: (reason: any, name: any) => void;
export declare const extractPartName: (name: string, start: number, size: number) => string;
export declare const append: (path: any, id: any) => any;
export declare const split: (name: string, processor: any) => any;
export declare const generateNamespaceId: (parentId: number[], name: string) => number[];
export declare const encodeBlock: (input: any, inputOffset: number, output: any, outputOffset: number) => any;
export declare const Char_To_Decoded_Char_Map: () => any;
export declare const decodeChar: (c: any) => any;
export declare const decodeBlock: (input: any, inputOffset: number, output: any, outputOffset: number) => any;
/**
 * Traverses the tree object to pick addresses strings.
 * @param {array} array of multisig children
 * @param {parse} function to parse tree and pick children addresses
 */
export declare const parseObjectProperties: (obj: [], parse: any) => any;
