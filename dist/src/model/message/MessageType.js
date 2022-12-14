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
exports.MessageType = void 0;
/**
 * The Message type. Supported supply types are:
 * -1: RawMessage (no type appended)
 * 0: PlainMessage
 * 1: EncryptedMessage.
 * 254: Persistent harvesting delegation.
 */
var MessageType;
(function (MessageType) {
    MessageType[MessageType["RawMessage"] = -1] = "RawMessage";
    MessageType[MessageType["PlainMessage"] = 0] = "PlainMessage";
    MessageType[MessageType["EncryptedMessage"] = 1] = "EncryptedMessage";
    MessageType[MessageType["PersistentHarvestingDelegationMessage"] = 254] = "PersistentHarvestingDelegationMessage";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=MessageType.js.map