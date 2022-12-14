export declare const Key_Size = 32;
export declare const Signature_Size = 64;
export declare const Half_Signature_Size: number;
export declare const Hash_Size = 64;
export declare const Half_Hash_Size: number;
/**
 * Convert an Uint8Array to WordArray
 *
 * @param {Uint8Array} ua - An Uint8Array
 * @param {number} uaLength - The Uint8Array length
 *
 * @return {WordArray}
 */
export declare const ua2words: (ua: any, uaLength: any) => any;
/**
 * Convert a wordArray to Uint8Array
 *
 * @param {Uint8Array} destUa - A destination Uint8Array
 * @param {WordArray} cryptoWords - A wordArray
 *
 * @return {Uint8Array}
 */
export declare const words2ua: (destUa: any, cryptoWords: any) => Uint8Array;
export declare const bitxorcore_crypto: any;
