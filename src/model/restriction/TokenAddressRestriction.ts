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

import {
    AddressDto,
    AddressKeyValueBuilder,
    AddressKeyValueSetBuilder,
    TokenAddressRestrictionEntryBuilder,
    TokenIdDto,
    TokenRestrictionEntryBuilder,
    TokenRestrictionEntryTypeDto,
    TokenRestrictionKeyDto,
} from 'bitxor-catbuffer-typescript';
import { Address } from '../account';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { TokenAddressRestrictionItem } from './TokenAddressRestrictionItem';
import { TokenRestrictionEntryType } from './TokenRestrictionEntryType';

export class TokenAddressRestriction {
    /**
     * Constructor
     * @param version
     * @param compositeHash
     * @param entryType
     * @param tokenId
     * @param targetAddress
     * @param restrictions
     */
    constructor(
        /**
         * Version
         */
        public readonly version: number,
        /**
         * composite hash
         */
        public readonly compositeHash: string,
        /**
         * Token restriction entry type.
         */
        public readonly entryType: TokenRestrictionEntryType,
        /**
         * Token identifier.
         */
        public readonly tokenId: TokenId,
        /**
         * Target address
         */
        public readonly targetAddress: Address,
        /**
         * Token restriction items
         */
        public readonly restrictions: TokenAddressRestrictionItem[],
    ) {}

    /**
     * Returns the restriction for a given key.
     *
     * @param key the key.
     */
    public getRestriction(key: UInt64): TokenAddressRestrictionItem | undefined {
        return this.restrictions.find((item) => item.key.equals(key));
    }

    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        const tokenId: TokenIdDto = this.tokenId.toBuilder();
        const address: AddressDto = this.targetAddress.toBuilder();
        const keyPairs: AddressKeyValueSetBuilder = new AddressKeyValueSetBuilder(
            this.restrictions
                .sort((a, b) => a.key.compare(b.key))
                .map((item) => {
                    const key: TokenRestrictionKeyDto = new TokenRestrictionKeyDto(item.key.toDTO());
                    const value: number[] = item.restrictionValue.toDTO();
                    return new AddressKeyValueBuilder(key, value);
                }),
        );
        const addressRestrictionBuilder = new TokenAddressRestrictionEntryBuilder(tokenId, address, keyPairs);
        return new TokenRestrictionEntryBuilder(
            this.version,
            TokenRestrictionEntryTypeDto.ADDRESS,
            addressRestrictionBuilder,
            undefined,
        ).serialize();
    }
}
