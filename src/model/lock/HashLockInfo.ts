/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { AddressDto, AmountDto, Hash256Dto, HashLockInfoBuilder, HeightDto, TokenBuilder } from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { LockStatus } from './LockStatus';

/**
 * Hash lock information
 */
export class HashLockInfo {
    constructor(
        /**
         * Version
         */
        public readonly version: number,
        /**
         * The stored database id.
         */
        public readonly recordId: string,
        /**
         * Owner's address.
         */
        public readonly ownerAddress: Address,
        /**
         * Locked moasic id.
         */
        public readonly tokenId: TokenId,
        /**
         * Locked fund amount.
         */
        public readonly amount: UInt64,
        /**
         * Block height of the lock expires.
         */
        public readonly endHeight: UInt64,
        /**
         * Current lock status.
         */
        public readonly status: LockStatus,
        /**
         * Lock hash.
         */
        public readonly hash: string,
    ) {}

    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        const ownerAddress: AddressDto = this.ownerAddress.toBuilder();
        const token: TokenBuilder = new TokenBuilder(this.tokenId.toBuilder(), new AmountDto(this.amount.toDTO()));
        const endHeight: HeightDto = new HeightDto(this.endHeight.toDTO());
        const hash: Hash256Dto = new Hash256Dto(Convert.hexToUint8(this.hash));
        return new HashLockInfoBuilder(this.version, ownerAddress, token, endHeight, this.status.valueOf(), hash).serialize();
    }
}
