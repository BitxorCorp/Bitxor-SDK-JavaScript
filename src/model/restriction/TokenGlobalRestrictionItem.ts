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
import { UInt64 } from '../UInt64';
import { TokenRestrictionType } from './TokenRestrictionType';

/**
 * Token global restriction item structure .
 */
export class TokenGlobalRestrictionItem {
    /**
     * Constructor
     * @param key string,
     * @param referenceTokenId
     * @param restrictionValue
     * @param restrictionType
     */
    constructor(
        public readonly key: UInt64,
        /**
         * Reference token identifier
         */
        public readonly referenceTokenId: TokenId,
        /**
         * Token restriction value.
         */
        public readonly restrictionValue: UInt64,
        /**
         * Token restriction type.
         */
        public readonly restrictionType: TokenRestrictionType,
    ) {}
}
