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
    GlobalKeyValueBuilder,
    GlobalKeyValueSetBuilder,
    RestrictionRuleBuilder,
    TokenGlobalRestrictionEntryBuilder,
    TokenIdDto,
    TokenRestrictionEntryBuilder,
    TokenRestrictionEntryTypeDto,
    TokenRestrictionKeyDto,
} from 'bitxor-catbuffer-typescript';
import { TokenId } from '../token';
import { UInt64 } from '../UInt64';
import { TokenGlobalRestrictionItem } from './TokenGlobalRestrictionItem';
import { TokenRestrictionEntryType } from './TokenRestrictionEntryType';

/**
 * Token global restriction structure describes restriction information for an token.
 */
export class TokenGlobalRestriction {
    /**
     * Constructor
     * @param version
     * @param compositeHash
     * @param entryType
     * @param tokenId
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
         * Token restriction items
         */
        public readonly restrictions: TokenGlobalRestrictionItem[],
    ) {}

    /**
     * Returns the restriction for a given key.
     *
     * @param key the key.
     */
    public getRestriction(key: UInt64): TokenGlobalRestrictionItem | undefined {
        return this.restrictions.find((item) => item.key.equals(key));
    }

    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        const tokenId: TokenIdDto = this.tokenId.toBuilder();
        const keyPairs: GlobalKeyValueSetBuilder = new GlobalKeyValueSetBuilder(
            this.restrictions
                .sort((a, b) => a.key.compare(b.key))
                .map((item) => {
                    const key: TokenRestrictionKeyDto = new TokenRestrictionKeyDto(item.key.toDTO());
                    const value: number[] = item.restrictionValue.toDTO();
                    const restrictionRule = new RestrictionRuleBuilder(
                        item.referenceTokenId.toBuilder(),
                        value,
                        item.restrictionType as number,
                    );
                    return new GlobalKeyValueBuilder(key, restrictionRule);
                }),
        );
        const globalRestrictionBuilder = new TokenGlobalRestrictionEntryBuilder(tokenId, keyPairs);
        return new TokenRestrictionEntryBuilder(
            this.version,
            TokenRestrictionEntryTypeDto.GLOBAL,
            undefined,
            globalRestrictionBuilder,
        ).serialize();
    }
}
