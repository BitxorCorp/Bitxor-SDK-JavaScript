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

import { GeneratorUtils } from 'bitxor-catbuffer-typescript';
import { RawAddress } from '../../core/format/RawAddress';
import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { ReceiptSource } from './ReceiptSource';

/**
 * The receipt source object.
 */
export class ResolutionEntry<R extends Address | TokenId> {
    /**
     * @constructor
     * @param resolved - A resolved address or resolved tokenId (alias).
     * @param source - The receipt source.
     */
    constructor(
        /**
         * A resolved address or resolved tokenId (alias).
         */
        public readonly resolved: R,
        /**
         * The receipt source.
         */
        public readonly source: ReceiptSource,
    ) {}

    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        let resolvedBytes: Uint8Array;
        if (this.resolved.isAddress()) {
            resolvedBytes = RawAddress.stringToAddress((this.resolved as Address).plain());
        } else {
            resolvedBytes = GeneratorUtils.uint64ToBuffer(UInt64.fromHex((this.resolved as TokenId).toHex()).toDTO());
        }
        const sourceBytes = this.source.serialize();
        return GeneratorUtils.concatTypedArrays(resolvedBytes, sourceBytes);
    }
}
