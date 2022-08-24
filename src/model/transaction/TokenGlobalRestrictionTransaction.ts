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
    EmbeddedTokenGlobalRestrictionTransactionBuilder,
    EmbeddedTransactionBuilder,
    TimestampDto,
    TokenGlobalRestrictionTransactionBuilder,
    TransactionBuilder,
    UnresolvedTokenIdDto,
} from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { DtoMapping } from '../../core/utils/DtoMapping';
import { UnresolvedMapping } from '../../core/utils/UnresolvedMapping';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { Statement } from '../receipt/Statement';
import { TokenRestrictionType } from '../restriction/TokenRestrictionType';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

export class TokenGlobalRestrictionTransaction extends Transaction {
    /**
     * Create a token address restriction transaction object
     *
     * The token global restrictions are the network-wide rules that will determine
     * whether an account will be able to transact a given token.
     *
     * Only accounts tagged with the key identifiers and values that meet the conditions
     * will be able to execute transactions involving the token.
     *
     * Additionally, the token creator can define restrictions that depend directly on
     * global restrictions set on another token - known as **reference token**.
     * The referenced token and the restricted token do not necessarily have to be created
     * by the same account, enabling the delegation of token permissions to a third party.
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param newRestrictionType - The new restriction tpye.
     * @param networkType - The network type.
     * @param referenceTokenId - (Optional) The unresolved token identifier providing the restriction key.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenGlobalRestrictionTransaction}
     */
    public static create(
        deadline: Deadline,
        tokenId: UnresolvedTokenId,
        restrictionKey: UInt64,
        previousRestrictionValue: UInt64,
        previousRestrictionType: TokenRestrictionType,
        newRestrictionValue: UInt64,
        newRestrictionType: TokenRestrictionType,
        networkType: NetworkType,
        referenceTokenId: UnresolvedTokenId = UnresolvedMapping.toUnresolvedToken(UInt64.fromUint(0).toHex()),
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): TokenGlobalRestrictionTransaction {
        return new TokenGlobalRestrictionTransaction(
            networkType,
            TransactionVersion.TOKEN_GLOBAL_RESTRICTION,
            deadline,
            maxFee,
            tokenId,
            referenceTokenId,
            restrictionKey,
            previousRestrictionValue,
            previousRestrictionType,
            newRestrictionValue,
            newRestrictionType,
            signature,
            signer,
        );
    }

    /**
     * @param networkType - The network type
     * @param version - The transaction version
     * @param deadline - The deadline to include the transaction.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param tokenId - The unresolved token identifier.
     * @param referenceTokenId - The token id providing the restriction key.
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param previousRestrictionType - The previous restriction tpye.
     * @param signature - The transaction signature
     * @param signer - The signer
     * @param transactionInfo - The transaction info
     */
    constructor(
        networkType: NetworkType,
        version: number,
        deadline: Deadline,
        maxFee: UInt64,
        /**
         * The token id.
         */
        public readonly tokenId: UnresolvedTokenId,
        /**
         * The refrence token id.
         */
        public readonly referenceTokenId: UnresolvedTokenId,
        /**
         * The restriction key.
         */
        public readonly restrictionKey: UInt64,
        /**
         * The previous restriction value.
         */
        public readonly previousRestrictionValue: UInt64,
        /**
         * The previous restriction type.
         */
        public readonly previousRestrictionType: TokenRestrictionType,
        /**
         * The new restriction value.
         */
        public readonly newRestrictionValue: UInt64,
        /**
         * The new restriction type.
         */
        public readonly newRestrictionType: TokenRestrictionType,
        signature?: string,
        signer?: PublicAccount,
        transactionInfo?: TransactionInfo,
    ) {
        super(TransactionType.TOKEN_GLOBAL_RESTRICTION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        const builder = isEmbedded
            ? EmbeddedTokenGlobalRestrictionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload))
            : TokenGlobalRestrictionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload));
        const signerPublicKey = Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenGlobalRestrictionTransaction.create(
            isEmbedded
                ? Deadline.createEmtpy()
                : Deadline.createFromDTO((builder as TokenGlobalRestrictionTransactionBuilder).getDeadline().timestamp),
            UnresolvedMapping.toUnresolvedToken(new UInt64(builder.getTokenId().unresolvedTokenId).toHex()),
            new UInt64(builder.getRestrictionKey()),
            new UInt64(builder.getPreviousRestrictionValue()),
            builder.getPreviousRestrictionType().valueOf(),
            new UInt64(builder.getNewRestrictionValue()),
            builder.getNewRestrictionType().valueOf(),
            networkType,
            UnresolvedMapping.toUnresolvedToken(new UInt64(builder.getReferenceTokenId().unresolvedTokenId).toHex()),
            isEmbedded ? new UInt64([0, 0]) : new UInt64((builder as TokenGlobalRestrictionTransactionBuilder).fee.amount),
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
        return new TokenGlobalRestrictionTransactionBuilder(
            this.getSignatureAsBuilder(),
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_GLOBAL_RESTRICTION.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            new UnresolvedTokenIdDto(this.tokenId.id.toDTO()),
            new UnresolvedTokenIdDto(this.referenceTokenId.id.toDTO()),
            this.restrictionKey.toDTO(),
            this.previousRestrictionValue.toDTO(),
            this.newRestrictionValue.toDTO(),
            this.previousRestrictionType.valueOf(),
            this.newRestrictionType.valueOf(),
        );
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedTokenGlobalRestrictionTransactionBuilder(
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_GLOBAL_RESTRICTION.valueOf(),
            new UnresolvedTokenIdDto(this.tokenId.id.toDTO()),
            new UnresolvedTokenIdDto(this.referenceTokenId.id.toDTO()),
            this.restrictionKey.toDTO(),
            this.previousRestrictionValue.toDTO(),
            this.newRestrictionValue.toDTO(),
            this.previousRestrictionType.valueOf(),
            this.newRestrictionType.valueOf(),
        );
    }

    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenGlobalRestrictionTransaction}
     */
    resolveAliases(statement: Statement, aggregateTransactionIndex = 0): TokenGlobalRestrictionTransaction {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping.assign(this, {
            tokenId: statement.resolveTokenId(
                this.tokenId,
                transactionInfo.height.toString(),
                transactionInfo.index,
                aggregateTransactionIndex,
            ),
            referenceTokenId: statement.resolveTokenId(
                this.referenceTokenId,
                transactionInfo.height.toString(),
                transactionInfo.index,
                aggregateTransactionIndex,
            ),
        });
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
