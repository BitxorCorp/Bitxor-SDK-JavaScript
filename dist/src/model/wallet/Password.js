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
exports.Password = void 0;
/**
 * Password model
 */
class Password {
    /**
     * Create a password with at least 8 characters
     * @param password
     */
    constructor(password) {
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        this.value = password;
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map