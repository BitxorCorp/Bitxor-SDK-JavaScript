import { Address } from '../../model/account';
import { NamespaceId } from '../../model/namespace';
import { Token } from '../../model/token';
/**
 * Extract recipientAddress value from encoded hexadecimal notation.
 *
 * If bit 0 of byte 0 is not set (e.g. 0x90), then it is a regular address.
 * Else (e.g. 0x91) it represents a namespace id which starts at byte 1.
 *
 * @param recipientAddress {string} Encoded hexadecimal recipientAddress notation
 * @return {Address | NamespaceId}
 */
export declare const extractRecipient: (recipientAddress: any) => Address | NamespaceId;
/**
 * Extract tokens from encoded UInt64 notation.
 *
 * If most significant bit of byte 0 is set, then it is a namespaceId.
 * If most significant bit of byte 0 is not set, then it is a tokenId.
 *
 * @param tokens {Array | undefined} The DTO array of tokens (with UInt64 Id notation)
 * @return {Token[]}
 */
export declare const extractTokens: (tokens: any) => Token[];
