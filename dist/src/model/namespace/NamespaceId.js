"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceId = void 0;
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
const NamespaceTokenIdGenerator_1 = require("../../infrastructure/transaction/NamespaceTokenIdGenerator");
const Id_1 = require("../Id");
/**
 * The namespace id structure describes namespace id
 *
 * @since 1.0
 */
class NamespaceId {
    /**
     * Create NamespaceId from namespace string name (ex: bxr or domain.subdom.subdome)
     * or id in form of array number (ex: [929036875, 2226345261])
     *
     * @param id
     */
    constructor(id) {
        if (id instanceof Array) {
            this.id = new Id_1.Id(id);
        }
        else if (typeof id === 'string') {
            this.fullName = id;
            this.id = new Id_1.Id(NamespaceTokenIdGenerator_1.NamespaceTokenIdGenerator.namespaceId(id));
        }
    }
    /**
     * Create a NamespaceId object from its encoded hexadecimal notation.
     * @param encoded
     * @returns {NamespaceId}
     */
    static createFromEncoded(encoded) {
        const uint = format_1.Convert.hexToUint8(encoded);
        const hex = format_1.Convert.uint8ToHex(uint);
        const namespace = new NamespaceId(Id_1.Id.fromHex(hex).toDTO());
        return namespace;
    }
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex() {
        return this.id.toHex();
    }
    /**
     * Compares namespaceIds for equality.
     *
     * @return boolean
     */
    equals(id) {
        return id && this.id.equals(id.id);
    }
    /**
     * Create DTO object
     */
    toDTO() {
        return {
            id: this.id.toHex(),
            fullName: this.fullName ? this.fullName : '',
        };
    }
    /**
     * Creates the builder object.
     */
    toBuilder() {
        return new bitxor_catbuffer_typescript_1.NamespaceIdDto(this.id.toDTO());
    }
    /**
     * Encoded unresolved address
     * @returns {Uint8Array}
     */
    encodeUnresolvedAddress(networkType) {
        return format_1.RawAddress.aliasToRecipient(format_1.Convert.hexToUint8(this.toHex()), networkType);
    }
    /**
     * Get string value of id
     * @returns {string}
     */
    plain() {
        return this.toHex();
    }
    /**
     * returns that this instance is an alias.
     */
    isNamespaceId() {
        return true;
    }
    /**
     * returns that the instance is not address
     */
    isAddress() {
        return false;
    }
    /**
     * returns that the instance is not a token id
     */
    isTokenId() {
        return false;
    }
}
exports.NamespaceId = NamespaceId;
//# sourceMappingURL=NamespaceId.js.map