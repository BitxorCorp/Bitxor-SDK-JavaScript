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
    EmbeddedTokenAliasTransactionBuilder,
    EmbeddedTransactionBuilder,
    TimestampDto,
    TokenAliasTransactionBuilder,
    TransactionBuilder,
} from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

export class TokenAliasTransaction extends Transaction {
    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The alias action type.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    public static create(
        deadline: Deadline,
        aliasAction: AliasAction,
        namespaceId: NamespaceId,
        tokenId: TokenId,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): TokenAliasTransaction {
        return new TokenAliasTransaction(
            networkType,
            TransactionVersion.TOKEN_ALIAS,
            deadline,
            maxFee,
            aliasAction,
            namespaceId,
            tokenId,
            signature,
            signer,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param aliasAction
     * @param namespaceId
     * @param tokenId
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(
        networkType: NetworkType,
        version: number,
        deadline: Deadline,
        maxFee: UInt64,
        /**
         * The alias action type.
         */
        public readonly aliasAction: AliasAction,
        /**
         * The namespace id that will be an alias.
         */
        public readonly namespaceId: NamespaceId,
        /**
         * The token id.
         */
        public readonly tokenId: TokenId,
        signature?: string,
        signer?: PublicAccount,
        transactionInfo?: TransactionInfo,
    ) {
        super(TransactionType.TOKEN_ALIAS, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        const builder = isEmbedded
            ? EmbeddedTokenAliasTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload))
            : TokenAliasTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload));
        const signerPublicKey = Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenAliasTransaction.create(
            isEmbedded ? Deadline.createEmtpy() : Deadline.createFromDTO((builder as TokenAliasTransactionBuilder).getDeadline().timestamp),
            builder.getAliasAction().valueOf(),
            new NamespaceId(builder.getNamespaceId().namespaceId),
            new TokenId(builder.getTokenId().tokenId),
            networkType,
            isEmbedded ? new UInt64([0, 0]) : new UInt64((builder as TokenAliasTransactionBuilder).fee.amount),
            signature,
            signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount.createFromPublicKey(signerPublicKey, networkType),
        );
        return isEmbedded ? transaction.toAggregate(PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }

    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    protected createBuilder(): TransactionBuilder {
        return new TokenAliasTransactionBuilder(
            this.getSignatureAsBuilder(),
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_ALIAS.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            this.namespaceId.toBuilder(),
            this.tokenId.toBuilder(),
            this.aliasAction.valueOf(),
        );
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedTokenAliasTransactionBuilder(
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_ALIAS.valueOf(),
            this.namespaceId.toBuilder(),
            this.tokenId.toBuilder(),
            this.aliasAction.valueOf(),
        );
    }

    /**
     * @internal
     * @returns {TokenAliasTransaction}
     */
    resolveAliases(): TokenAliasTransaction {
        return this;
    }

    /**
     * @internal
     * Check a given address should be notified in websocket channels
     * @param address address to be notified
     * @returns {boolean}
     */
    public shouldNotifyAccount(address: Address): boolean {
        return super.isSigned(address);
    }
}
