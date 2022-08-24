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
exports.EmptyMessage = exports.MessageFactory = void 0;
const format_1 = require("../../core/format");
const EncryptedMessage_1 = require("./EncryptedMessage");
const MessageMarker_1 = require("./MessageMarker");
const MessageType_1 = require("./MessageType");
const PersistentHarvestingDelegationMessage_1 = require("./PersistentHarvestingDelegationMessage");
const PlainMessage_1 = require("./PlainMessage");
const RawMessage_1 = require("./RawMessage");
/**
 * Objects that knows how to create messages from serialized payloads.
 *
 * Note: this could be in the Message class but the circular dependency breaks Typescript.
 */
class MessageFactory {
    /**
     * It creates a message from the byte array payload
     * @param payload the payload as byte array
     */
    static createMessageFromBuffer(payload) {
        return this.createMessageFromHex(payload ? format_1.Convert.uint8ToHex(payload) : undefined);
    }
    /**
     * It creates a message from the hex payload
     * @param payload the payload as hex
     */
    static createMessageFromHex(payload) {
        if (!payload || !payload.length) {
            return new RawMessage_1.RawMessage('');
        }
        const upperCasePayload = payload.toUpperCase();
        if (upperCasePayload.length == PersistentHarvestingDelegationMessage_1.PersistentHarvestingDelegationMessage.HEX_PAYLOAD_SIZE &&
            upperCasePayload.startsWith(MessageMarker_1.MessageMarker.PersistentDelegationUnlock)) {
            return PersistentHarvestingDelegationMessage_1.PersistentHarvestingDelegationMessage.createFromPayload(upperCasePayload);
        }
        const messageType = format_1.Convert.hexToUint8(upperCasePayload)[0];
        switch (messageType) {
            case MessageType_1.MessageType.PlainMessage:
                return PlainMessage_1.PlainMessage.createFromPayload(upperCasePayload.substring(2));
            case MessageType_1.MessageType.EncryptedMessage:
                return EncryptedMessage_1.EncryptedMessage.createFromPayload(upperCasePayload.substring(2));
        }
        return new RawMessage_1.RawMessage(upperCasePayload);
    }
}
exports.MessageFactory = MessageFactory;
/**
 * Raw message containing an empty string without any type or prefix.
 * @type {PlainMessage}
 */
exports.EmptyMessage = MessageFactory.createMessageFromBuffer();
//# sourceMappingURL=MessageFactory.js.map