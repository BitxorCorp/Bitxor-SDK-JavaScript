"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
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
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const NetworkType_1 = require("../network/NetworkType");
/**
 * The address structure describes an address with its network
 */
class Address {
    /**
     * @internal
     * @param address
     * @param networkType
     */
    constructor(
    /**
     * The address value.
     */
    address, 
    /**
     * The Bitxor network type.
     */
    networkType) {
        this.address = address;
        this.networkType = networkType;
    }
    /**
     * Create from private key
     * @param publicKey - The account public key.
     * @param networkType - The Bitxor network type.
     * @returns {Address}
     */
    static createFromPublicKey(publicKey, networkType) {
        const publicKeyUint8 = format_1.Convert.hexToUint8(publicKey);
        const address = format_1.RawAddress.addressToString(format_1.RawAddress.publicKeyToAddress(publicKeyUint8, networkType));
        return new Address(address, networkType);
    }
    /**
     * Create an Address from a given raw address.
     * @param rawAddress - Address in string format.
     *                  ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3 or SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3
     * @returns {Address}
     */
    static createFromRawAddress(rawAddress) {
        let networkType;
        const addressTrimAndUpperCase = rawAddress.trim().toUpperCase().replace(/-/g, '');
        if (addressTrimAndUpperCase.length !== 39) {
            throw new Error('Address ' + addressTrimAndUpperCase + ' has to be 39 characters long');
        }
        if (addressTrimAndUpperCase.substring(0, 3) === 'TES') {
            networkType = NetworkType_1.NetworkType.TEST_NET;
        }
        else if (addressTrimAndUpperCase.substring(0, 3) === 'BXR') {
            networkType = NetworkType_1.NetworkType.MAIN_NET;
        }
        else {
            throw new Error('Address Network unsupported');
        }
        return new Address(addressTrimAndUpperCase, networkType);
    }
    /**
     * Create an Address from a given encoded address.
     * @param {string} encoded address. Expected format: 9085215E4620D383C2DF70235B9EF7607F6A28EF6D16FD7B9C.
     * @return {Address}
     */
    static createFromEncoded(encoded) {
        return Address.createFromRawAddress(format_1.RawAddress.addressToString(format_1.Convert.hexToUint8(encoded)));
    }
    /**
     * Get address in plain format ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3.
     * @returns {string}
     */
    plain() {
        return this.address;
    }
    /**
     * Get address in the encoded format ex: NAR3W7B4BCOZSZMFIZRYB3N5YGOUSWIYJCJ6HDFH.
     * @returns {string}
     */
    encoded() {
        return format_1.Convert.uint8ToHex(format_1.RawAddress.stringToAddress(this.address));
    }
    /**
     * Get address in pretty format ex: SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3.
     * @returns {string}
     */
    pretty() {
        return this.address.match(/.{1,6}/g).join('-');
    }
    /**
     * Compares addresses for equality
     * @param address - Address to compare
     * @returns {boolean}
     */
    equals(address) {
        return address && this.address == address.address && this.networkType === address.networkType;
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            address: this.address,
            networkType: this.networkType,
        };
    }
    /**
     * Create Builder object
     */
    toBuilder() {
        return new bitxor_catbuffer_typescript_1.AddressDto(format_1.Convert.hexToUint8(this.encoded()));
    }
    /**
     * Encoded address or namespace id. Note that namespace id get the hex reversed and
     * zero padded.
     * @returns {Uint8Array}
     */
    encodeUnresolvedAddress() {
        return format_1.Convert.hexToUint8(this.encoded());
    }
    /**
     * returns that this instance is a resolved, not an alias, address.
     */
    isNamespaceId() {
        return false;
    }
    /**
     * returns that the instance is an address
     */
    isAddress() {
        return true;
    }
    /**
     * returns that the instance is not a token id
     */
    isTokenId() {
        return false;
    }
}
exports.Address = Address;
/**
 * Determines the validity of an raw address string.
 * @param {string} rawAddress The raw address string. Expected format TATNE7Q5BITMUTRRN6IB4I7FLSDRDWZA37JGO5Q
 * @returns {boolean} true if the raw address string is valid, false otherwise.
 */
Address.isValidRawAddress = (rawAddress) => {
    if (!['A', 'I', 'Q', 'Y'].includes(rawAddress.slice(-1).toUpperCase())) {
        return false;
    }
    try {
        return format_1.RawAddress.isValidAddress(format_1.RawAddress.stringToAddress(rawAddress));
    }
    catch (err) {
        return false;
    }
};
/**
 * Determines the validity of an encoded address string.
 * @param {string} encoded The encoded address string. Expected format: 6823BB7C3C089D996585466380EDBDC19D4959184893E38C
 * @returns {boolean} true if the encoded address string is valid, false otherwise.
 */
Address.isValidEncodedAddress = (encoded) => {
    try {
        return format_1.RawAddress.isValidAddress(format_1.Convert.hexToUint8(encoded));
    }
    catch (err) {
        return false;
    }
};
//# sourceMappingURL=Address.js.map