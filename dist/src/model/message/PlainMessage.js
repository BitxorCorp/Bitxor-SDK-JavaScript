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
exports.PlainMessage = void 0;
const Message_1 = require("./Message");
const MessageType_1 = require("./MessageType");
/**
 * The plain message model defines a plain string. When sending it to the network we transform the payload to hex-string.
 */
class PlainMessage extends Message_1.Message {
    /**
     * Create plain message object.
     * @returns PlainMessage
     */
    static create(message) {
        return new PlainMessage(message);
    }
    /**
     *
     * It creates the Plain message from a payload hex without the 00 prefix.
     *
     * The 00 prefix will be attached to the final payload.
     *
     * @internal
     */
    static createFromPayload(payload) {
        return new PlainMessage(this.decodeHex(payload));
    }
    /**
     * @internal
     * @param payload
     */
    constructor(payload) {
        super(MessageType_1.MessageType.PlainMessage, payload);
    }
}
exports.PlainMessage = PlainMessage;
//# sourceMappingURL=PlainMessage.js.map