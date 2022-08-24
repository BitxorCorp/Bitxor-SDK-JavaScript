"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedMapping = void 0;
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
const Address_1 = require("../../model/account/Address");
const NamespaceId_1 = require("../../model/namespace/NamespaceId");
const TokenId_1 = require("../../model/token/TokenId");
const Convert_1 = require("../format/Convert");
const RawAddress_1 = require("../format/RawAddress");
const DtoMapping_1 = require("./DtoMapping");
/**
 * @internal
 */
class UnresolvedMapping {
    /**
     * @internal
     * Map unresolved token string to TokenId or NamespaceId
     * @param {string} tokenId The unresolvedToken id in hex.
     * @returns {UnresolvedTokenId}
     */
    static toUnresolvedToken(tokenId) {
        if (!Convert_1.Convert.isHexString(tokenId)) {
            throw new Error('Input string is not in valid hexadecimal notation.');
        }
        const bytes = Convert_1.Convert.hexToUint8(tokenId);
        const byte0 = bytes[0];
        // if most significant bit of byte 0 is set, then we have a namespaceId
        if ((byte0 & 128) === 128) {
            return NamespaceId_1.NamespaceId.createFromEncoded(tokenId);
        }
        // most significant bit of byte 0 is not set => tokenId
        return new TokenId_1.TokenId(tokenId);
    }
    /**
     * Map unresolved address string to Address or NamespaceId.
     *
     * Input examples:
     *  - 6826D27E1D0A26CA4E316F901E23E55C8711DB20DF45C536 Hex address (old rest)
     *  - NATNE7Q5BITMUTRRN6IB4I7FLSDRDWZA35C4KNQ Base32 address (new reset)
     *  - 99C2860B73398FD8D3000000000000000000000000000000 Hex namespace id (old rest)
     *  - THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA Base32 namespace id (new rest)
     *
     * @param {string} unresolvedAddressString The unresolved address in hex (old rest) or base32 address (new rest)
     * @returns {UnresolvedAddress}
     */
    static toUnresolvedAddress(unresolvedAddressString) {
        const fromHexToUnresolvedAddress = (unresolvedAddressStringHex) => {
            // If bit 0 of byte 0 is not set (like in 0x90), then it is a regular address.
            // Else (e.g. 0x91) it represents a namespace id which starts at byte 1.
            const bit0 = Convert_1.Convert.hexToUint8(unresolvedAddressStringHex.substr(3, 2))[0];
            if ((bit0 & 16) === 16) {
                // namespaceId encoded hexadecimal notation provided
                // only 8 bytes are relevant to resolve the NamespaceId
                const relevantPart = unresolvedAddressStringHex.substr(2, 16);
                return NamespaceId_1.NamespaceId.createFromEncoded(Convert_1.Convert.uint8ToHex(Convert_1.Convert.hexToUint8Reverse(relevantPart)));
            }
            // read address from encoded hexadecimal notation
            return Address_1.Address.createFromEncoded(unresolvedAddressStringHex);
        };
        if (Convert_1.Convert.isHexString(unresolvedAddressString, 48)) {
            // Old Rest
            return fromHexToUnresolvedAddress(unresolvedAddressString);
        }
        else {
            // New rest
            return fromHexToUnresolvedAddress(DtoMapping_1.DtoMapping.toAddress(unresolvedAddressString).encoded());
        }
    }
    /**
     * Return unresolved address bytes of the unresolved address
     * @internal
     * @param {UnresolvedAddress} unresolvedAddress The unresolved address
     * @param {networkType} networkType the network type serialized in the output.
     * @return {Uint8Array}
     */
    static toUnresolvedAddressBytes(unresolvedAddress, networkType) {
        if (unresolvedAddress.isNamespaceId()) {
            // received hexadecimal notation of namespaceId (alias)
            return RawAddress_1.RawAddress.aliasToRecipient(Convert_1.Convert.hexToUint8(unresolvedAddress.toHex()), networkType);
        }
        else {
            // received recipient address
            return RawAddress_1.RawAddress.stringToAddress(unresolvedAddress.plain());
        }
    }
}
exports.UnresolvedMapping = UnresolvedMapping;
//# sourceMappingURL=UnresolvedMapping.js.map