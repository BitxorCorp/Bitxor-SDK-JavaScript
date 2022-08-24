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
import { TokenIdDto } from 'bitxor-catbuffer-typescript';
import { Convert as convert, RawUInt64 as uint64_t } from '../../core/format';
import { NamespaceTokenIdGenerator } from '../../infrastructure/transaction/NamespaceTokenIdGenerator';
import { Address } from '../account/Address';
import { Id } from '../Id';
import { TokenNonce } from '../token/TokenNonce';

/**
 * The token id structure describes token id
 *
 * @since 1.0
 */
export class TokenId {
    /**
     * Token id
     */
    public readonly id: Id;

    /**
     * Create a TokenId for given `nonce` TokenNonce and `owner` PublicAccount.
     *
     * @param   nonce   {TokenNonce}
     * @param   ownerAddress   {Address}
     * @return  {TokenId}
     */
    public static createFromNonce(nonce: TokenNonce, ownerAddress: Address): TokenId {
        const tokenId = NamespaceTokenIdGenerator.tokenId(nonce.toUint8Array(), convert.hexToUint8(ownerAddress.encoded()));
        return new TokenId(tokenId);
    }

    /**
     * Create TokenId from token id in form of array of number (ex: [3646934825, 3576016193])
     * or the hexadecimal notation thereof in form of a string.
     *
     * @param id
     */
    constructor(id: string | number[]) {
        if (id === undefined) {
            throw new Error('TokenId undefined');
        }
        if (id instanceof Array) {
            this.id = new Id(id);
        } else if (typeof id === 'string') {
            if (!/^[0-9A-Fa-f]{16}$/i.test(id)) {
                throw new Error('Invalid size for TokenId hexadecimal notation');
            }

            // hexadecimal formatted TokenId
            this.id = new Id(uint64_t.fromHex(id));
        }
    }

    /**
     * Get string value of id
     * @returns {string}
     */
    public toHex(): string {
        return this.id.toHex().toUpperCase();
    }

    /**
     * Compares tokenIds for equality.
     *
     * @return boolean
     */
    public equals(other: any): boolean {
        return other && this.id.equals(other.id);
    }

    /**
     * Create Builder object.
     */
    toBuilder(): TokenIdDto {
        return new TokenIdDto(this.id.toDTO());
    }

    /**
     * returns that this instance is an alias.
     */
    public isNamespaceId(): boolean {
        return false;
    }
    /**
     * returns that the instance is not address
     */
    public isAddress(): boolean {
        return false;
    }

    /**
     * returns that the instance is a token id
     */
    public isTokenId(): boolean {
        return true;
    }
}
