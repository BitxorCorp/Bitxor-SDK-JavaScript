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
import { PublicAccount } from '../account/PublicAccount';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { AddressAliasTransaction } from './AddressAliasTransaction';
import { Deadline } from './Deadline';
import { TokenAliasTransaction } from './TokenAliasTransaction';
import { Transaction } from './Transaction';

export abstract class AliasTransaction extends Transaction {
    /**
     * Create an address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AddressAliasTransaction}
     */
    public static createForAddress(
        deadline: Deadline,
        aliasAction: AliasAction,
        namespaceId: NamespaceId,
        address: Address,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): AliasTransaction {
        return AddressAliasTransaction.create(deadline, aliasAction, namespaceId, address, networkType, maxFee, signature, signer);
    }

    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    public static createForToken(
        deadline: Deadline,
        aliasAction: AliasAction,
        namespaceId: NamespaceId,
        tokenId: TokenId,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): AliasTransaction {
        return TokenAliasTransaction.create(deadline, aliasAction, namespaceId, tokenId, networkType, maxFee, signature, signer);
    }
}
