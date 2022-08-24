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
import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';

/**
 * Abtract class for Aliases
 *
 * @since 0.10.2
 */
export abstract class Alias {
    /**
     * @internal
     * @param type - Alias type
     * @param address - Address for AddressAlias
     * @param tokenId - TokenId for TokenAlias
     */
    constructor(
        /**
         * The alias type
         *
         * - 0 : No alias
         * - 1 : Token id alias
         * - 2 : Address alias
         */
        public readonly type: number,

        /**
         * The alias address
         */
        public readonly address?: Address,

        /**
         * The alias tokenId
         */
        public readonly tokenId?: TokenId,
    ) {}

    /**
     * @internal
     * Compares alias for equality.
     * @param alias - TokenAlias
     * @return {boolean}
     */
    protected abstract equals(alias: any): boolean;
}
