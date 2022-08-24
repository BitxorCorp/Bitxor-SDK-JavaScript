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

import { AmountDto, BalanceChangeReceiptBuilder, TokenBuilder } from 'bitxor-catbuffer-typescript';
import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Receipt } from './Receipt';
import { ReceiptType } from './ReceiptType';
import { ReceiptVersion } from './ReceiptVersion';

/**
 * Balance Change: A token credit or debit was triggered.
 */
export class BalanceChangeReceipt extends Receipt {
    /**
     * Balance change expiry receipt
     * @param targetAddress - The target account address.
     * @param tokenId - The token id.
     * @param amount - The amount of token.
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(
        /**
         * The target account address.
         */
        public readonly targetAddress: Address,
        /**
         * The token id.
         */
        public readonly tokenId: TokenId,
        /**
         * The amount of token.
         */
        public readonly amount: UInt64,
        version: ReceiptVersion,
        type: ReceiptType,
        size?: number,
    ) {
        super(version, type, size);
    }

    /**
     * @internal
     * Generate buffer
     * @return {Uint8Array}
     */
    public serialize(): Uint8Array {
        return new BalanceChangeReceiptBuilder(
            ReceiptVersion.BALANCE_CHANGE,
            this.type.valueOf(),
            new TokenBuilder(this.tokenId.toBuilder(), new AmountDto(this.amount.toDTO())),
            this.targetAddress.toBuilder(),
        ).serialize();
    }
}
