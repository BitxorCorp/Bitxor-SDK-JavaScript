"use strict";
/*
import { Convert } from '../../core/format/Convert';
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
exports.Message = void 0;
const format_1 = require("../../core/format");
const MessageType_1 = require("./MessageType");
/**
 * An abstract message class that serves as the base class of all message types.
 */
class Message {
    /**
     * @internal
     * @param type
     * @param payload
     */
    constructor(
    /**
     * Message type
     */
    type, 
    /**
     * Message payload, it could be the message hex, encryped text or plain text depending on the message type.
     */
    payload) {
        this.type = type;
        this.payload = payload;
    }
    /**
     * @internal
     * @param hex
     * @returns {string}
     */
    static decodeHex(hex) {
        return Buffer.from(hex, 'hex').toString();
    }
    /**
     * Create DTO object
     */
    toDTO() {
        if (!this.payload) {
            return '';
        }
        if (this.type === MessageType_1.MessageType.PersistentHarvestingDelegationMessage) {
            return this.payload;
        }
        if (this.type === MessageType_1.MessageType.RawMessage) {
            return this.payload;
        }
        return this.type.toString(16).padStart(2, '0').toUpperCase() + format_1.Convert.utf8ToHex(this.payload);
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map