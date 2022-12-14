import { AddressDto } from 'bitxor-catbuffer-typescript';
import { NetworkType } from '../network/NetworkType';
/**
 * The address structure describes an address with its network
 */
export declare class Address {
    /**
     * The address value.
     */
    private readonly address;
    /**
     * The Bitxor network type.
     */
    readonly networkType: NetworkType;
    /**
     * Create from private key
     * @param publicKey - The account public key.
     * @param networkType - The Bitxor network type.
     * @returns {Address}
     */
    static createFromPublicKey(publicKey: string, networkType: NetworkType): Address;
    /**
     * Create an Address from a given raw address.
     * @param rawAddress - Address in string format.
     *                  ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3 or SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3
     * @returns {Address}
     */
    static createFromRawAddress(rawAddress: string): Address;
    /**
     * Create an Address from a given encoded address.
     * @param {string} encoded address. Expected format: 9085215E4620D383C2DF70235B9EF7607F6A28EF6D16FD7B9C.
     * @return {Address}
     */
    static createFromEncoded(encoded: string): Address;
    /**
     * Determines the validity of an raw address string.
     * @param {string} rawAddress The raw address string. Expected format TATNE7Q5BITMUTRRN6IB4I7FLSDRDWZA37JGO5Q
     * @returns {boolean} true if the raw address string is valid, false otherwise.
     */
    static isValidRawAddress: (rawAddress: string) => boolean;
    /**
     * Determines the validity of an encoded address string.
     * @param {string} encoded The encoded address string. Expected format: 6823BB7C3C089D996585466380EDBDC19D4959184893E38C
     * @returns {boolean} true if the encoded address string is valid, false otherwise.
     */
    static isValidEncodedAddress: (encoded: string) => boolean;
    /**
     * Get address in plain format ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3.
     * @returns {string}
     */
    plain(): string;
    /**
     * Get address in the encoded format ex: NAR3W7B4BCOZSZMFIZRYB3N5YGOUSWIYJCJ6HDFH.
     * @returns {string}
     */
    encoded(): string;
    /**
     * Get address in pretty format ex: SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3.
     * @returns {string}
     */
    pretty(): string;
    /**
     * Compares addresses for equality
     * @param address - Address to compare
     * @returns {boolean}
     */
    equals(address: any): boolean;
    /**
     * Create DTO object
     */
    toDTO(): any;
    /**
     * Create Builder object
     */
    toBuilder(): AddressDto;
    /**
     * Encoded address or namespace id. Note that namespace id get the hex reversed and
     * zero padded.
     * @returns {Uint8Array}
     */
    encodeUnresolvedAddress(): Uint8Array;
    /**
     * returns that this instance is a resolved, not an alias, address.
     */
    isNamespaceId(): boolean;
    /**
     * returns that the instance is an address
     */
    isAddress(): boolean;
    /**
     * returns that the instance is not a token id
     */
    isTokenId(): boolean;
}
