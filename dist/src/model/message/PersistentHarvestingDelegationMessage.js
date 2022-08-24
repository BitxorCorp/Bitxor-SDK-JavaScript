"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentHarvestingDelegationMessage = void 0;
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const account_1 = require("../account");
const Message_1 = require("./Message");
const MessageMarker_1 = require("./MessageMarker");
const MessageType_1 = require("./MessageType");
class PersistentHarvestingDelegationMessage extends Message_1.Message {
    constructor(payload) {
        super(MessageType_1.MessageType.PersistentHarvestingDelegationMessage, payload.toUpperCase());
        if (!format_1.Convert.isHexString(payload)) {
            throw Error('Payload format is not valid hexadecimal string');
        }
        if (payload.length != PersistentHarvestingDelegationMessage.HEX_PAYLOAD_SIZE) {
            throw Error(`Invalid persistent harvesting delegate payload size! Expected ${PersistentHarvestingDelegationMessage.HEX_PAYLOAD_SIZE} but got ${payload.length}`);
        }
        if (payload.toUpperCase().indexOf(MessageMarker_1.MessageMarker.PersistentDelegationUnlock) != 0) {
            throw Error(`Invalid persistent harvesting delegate payload! It does not start with ${MessageMarker_1.MessageMarker.PersistentDelegationUnlock}`);
        }
    }
    /**
     * @param remoteLinkedPrivateKey - Remote harvester signing private key linked to the main account
     * @param vrfPrivateKey - VRF private key linked to the main account
     * @param nodePublicKey - Node certificate public key
     * @param {NetworkType} networkType - Bitxorcore network type
     * @return {PersistentHarvestingDelegationMessage}
     */
    static create(remoteLinkedPrivateKey, vrfPrivateKey, nodePublicKey, networkType) {
        const ephemeralKeypair = account_1.Account.generateNewAccount(networkType);
        const encrypted = MessageMarker_1.MessageMarker.PersistentDelegationUnlock +
            ephemeralKeypair.publicKey +
            crypto_1.Crypto.encode(ephemeralKeypair.privateKey, nodePublicKey, remoteLinkedPrivateKey + vrfPrivateKey, true).toUpperCase();
        return new PersistentHarvestingDelegationMessage(encrypted);
    }
    /**
     * Create PersistentHarvestingDelegationMessage from DTO payload with marker.
     * @internal
     * @param payload
     *
     */
    static createFromPayload(payload) {
        return new PersistentHarvestingDelegationMessage(payload);
    }
    /**
     *
     * @param encryptMessage - Encrypted message to be decrypted
     * @param privateKey - Node certificate private key
     * @return {string}
     */
    static decrypt(encryptMessage, privateKey) {
        const markerLength = MessageMarker_1.MessageMarker.PersistentDelegationUnlock.length;
        const ephemeralPublicKey = encryptMessage.payload.substring(markerLength, markerLength + 64);
        const payload = encryptMessage.payload.substring(markerLength + ephemeralPublicKey.length);
        const decrypted = crypto_1.Crypto.decode(privateKey, ephemeralPublicKey, payload);
        return decrypted.toUpperCase();
    }
}
exports.PersistentHarvestingDelegationMessage = PersistentHarvestingDelegationMessage;
PersistentHarvestingDelegationMessage.HEX_PAYLOAD_SIZE = 264;
//# sourceMappingURL=PersistentHarvestingDelegationMessage.js.map