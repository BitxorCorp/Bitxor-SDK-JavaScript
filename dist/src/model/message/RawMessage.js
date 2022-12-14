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
exports.RawMessage = void 0;
const format_1 = require("../../core/format");
const Message_1 = require("./Message");
const MessageType_1 = require("./MessageType");
/**
 * The a raw message that doesn't assume any prefix.
 */
class RawMessage extends Message_1.Message {
    /**
     * Create plain message object.
     * @returns PlainMessage
     */
    static create(payload) {
        return new RawMessage(format_1.Convert.uint8ToHex(payload));
    }
    /**
     * @internal
     * @param payload
     */
    constructor(payload) {
        super(MessageType_1.MessageType.RawMessage, payload);
    }
}
exports.RawMessage = RawMessage;
//# sourceMappingURL=RawMessage.js.map