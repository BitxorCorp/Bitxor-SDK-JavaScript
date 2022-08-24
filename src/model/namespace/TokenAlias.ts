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
import { TokenId } from '../token/TokenId';
import { Alias } from './Alias';
import { AliasType } from './AliasType';

/**
 * The TokenAlias structure describe token aliases
 *
 * @since 0.10.2
 */
export class TokenAlias extends Alias {
    /**
     * Create AddressAlias object
     * @param tokenId
     */
    constructor(
        /**
         * The alias address
         */
        public readonly tokenId: TokenId,
    ) {
        super(AliasType.Token, undefined, tokenId);
    }

    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    public equals(alias: any): boolean {
        return alias && alias.type === this.type && this.tokenId.equals(alias.tokenId);
    }

    /**
     * Get string value of tokenId
     * @returns {string}
     */
    public toHex(): string {
        return this.tokenId.toHex();
    }
}
