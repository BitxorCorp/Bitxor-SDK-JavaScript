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
    AmountDto,
    BlockDurationDto,
    GeneratorUtils,
    HeightDto,
    TokenDefinitionBuilder,
    TokenEntryBuilder,
    TokenFlagsDto,
    TokenIdDto,
    TokenPropertiesBuilder,
} from 'bitxor-catbuffer-typescript';
import { Address } from '../account';
import { UInt64 } from '../UInt64';
import { TokenFlags } from './TokenFlags';
import { TokenId } from './TokenId';

/**
 * The token info structure describes a token.
 */
export class TokenInfo {
    /**
     * @param version
     * @param recordId
     * @param id
     * @param supply
     * @param startHeight
     * @param ownerAddress
     * @param revision
     * @param flags
     * @param divisibility
     * @param duration
     */
    constructor(
        /**
         * Version
         */
        public readonly version: number,
        /**
         * The database record id.
         */
        public readonly recordId: string,
        /**
         * The token id.
         */
        public readonly id: TokenId,
        /**
         * The token supply.
         */
        public readonly supply: UInt64,
        /**
         * The block height were token was created.
         */
        public readonly startHeight: UInt64,
        /**
         * The token owner address.
         */
        public readonly ownerAddress: Address,
        /**
         * The token revision
         */
        public readonly revision: number,
        /**
         * The token flags.
         */
        public readonly flags: TokenFlags,
        /**
         * Token divisibility
         */
        public readonly divisibility: number,
        /**
         * Token duration
         */
        public readonly duration: UInt64,
    ) {}

    /**
     * Is token supply mutable
     * @returns {boolean}
     */
    public isSupplyMutable(): boolean {
        return this.flags.supplyMutable;
    }

    /**
     * Is token transferable
     * @returns {boolean}
     */
    public isTransferable(): boolean {
        return this.flags.transferable;
    }

    /**
     * Is token restrictable
     * @returns {boolean}
     */
    public isRestrictable(): boolean {
        return this.flags.restrictable;
    }

    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        const tokenId: TokenIdDto = this.id.toBuilder();
        const supply: AmountDto = new AmountDto(this.supply.toDTO());
        const startHeight = new HeightDto(this.startHeight.toDTO());
        const ownerAddress = this.ownerAddress.toBuilder();
        const revision = this.revision;
        const duration = new BlockDurationDto(this.duration.toDTO());
        const flags = GeneratorUtils.toFlags(TokenFlagsDto, this.flags.getValue());
        const properties = new TokenPropertiesBuilder(flags, this.divisibility, duration);
        const definition = new TokenDefinitionBuilder(startHeight, ownerAddress, revision, properties);
        return new TokenEntryBuilder(this.version, tokenId, supply, definition).serialize();
    }
}
