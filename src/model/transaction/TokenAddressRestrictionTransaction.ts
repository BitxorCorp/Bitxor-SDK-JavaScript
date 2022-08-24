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
    EmbeddedTokenAddressRestrictionTransactionBuilder,
    EmbeddedTransactionBuilder,
    TimestampDto,
    TokenAddressRestrictionTransactionBuilder,
    TransactionBuilder,
    UnresolvedAddressDto,
    UnresolvedTokenIdDto,
} from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { DtoMapping } from '../../core/utils/DtoMapping';
import { UnresolvedMapping } from '../../core/utils/UnresolvedMapping';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { Statement } from '../receipt/Statement';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

export class TokenAddressRestrictionTransaction extends Transaction {
    /**
     * Create a token address restriction transaction object
     *
     * Enabling accounts to transact with the token is similar to the process of
     * adding elevated permissions to a user in a company computer network.
     *
     * The token creator can modify the permissions of an account by sending a
     * token restriction transaction targeting the account address.
     *
     * **TokenAddressRestrictionTransaction can only be announced in with Aggregate Transaction
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The unresolved token identifier.
     * @param restrictionKey - The restriction key.
     * @param targetAddress - The affected unresolved address.
     * @param newRestrictionValue - The new restriction value.
     * @param networkType - The network type.
     * @param previousRestrictionValue - (Optional) The previous restriction value.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAddressRestrictionTransaction}
     */
    public static create(
        deadline: Deadline,
        tokenId: UnresolvedTokenId,
        restrictionKey: UInt64,
        targetAddress: UnresolvedAddress,
        newRestrictionValue: UInt64,
        networkType: NetworkType,
        previousRestrictionValue: UInt64 = UInt64.fromHex('FFFFFFFFFFFFFFFF'),
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): TokenAddressRestrictionTransaction {
        return new TokenAddressRestrictionTransaction(
            networkType,
            TransactionVersion.TOKEN_ADDRESS_RESTRICTION,
            deadline,
            maxFee,
            tokenId,
            restrictionKey,
            targetAddress,
            previousRestrictionValue,
            newRestrictionValue,
            signature,
            signer,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param tokenId
     * @param signature
     * @param restrictionKey
     * @param targetAddress
     * @param previousRestrictionValue
     * @param newRestrictionValue
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
         * The token id.
         */
        public readonly tokenId: UnresolvedTokenId,
        /**
         * The restriction key.
         */
        public readonly restrictionKey: UInt64,
        /**
         * The affected unresolved address.
         */
        public readonly targetAddress: UnresolvedAddress,
        /**
         * The previous restriction value.
         */
        public readonly previousRestrictionValue: UInt64,
        /**
         * The new restriction value.
         */
        public readonly newRestrictionValue: UInt64,
        signature?: string,
        signer?: PublicAccount,
        transactionInfo?: TransactionInfo,
    ) {
        super(TransactionType.TOKEN_ADDRESS_RESTRICTION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        const builder = isEmbedded
            ? EmbeddedTokenAddressRestrictionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload))
            : TokenAddressRestrictionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload));
        const signerPublicKey = Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenAddressRestrictionTransaction.create(
            isEmbedded
                ? Deadline.createEmtpy()
                : Deadline.createFromDTO((builder as TokenAddressRestrictionTransactionBuilder).getDeadline().timestamp),
            UnresolvedMapping.toUnresolvedToken(new UInt64(builder.getTokenId().unresolvedTokenId).toHex()),
            new UInt64(builder.getRestrictionKey()),
            UnresolvedMapping.toUnresolvedAddress(Convert.uint8ToHex(builder.getTargetAddress().unresolvedAddress)),
            new UInt64(builder.getNewRestrictionValue()),
            networkType,
            new UInt64(builder.getPreviousRestrictionValue()),
            isEmbedded ? new UInt64([0, 0]) : new UInt64((builder as TokenAddressRestrictionTransactionBuilder).fee.amount),
            signature,
            signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount.createFromPublicKey(signerPublicKey, networkType),
        );
        return isEmbedded ? transaction.toAggregate(PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }

    /**
     * Return the string notation for the set recipient
     * @internal
     * @returns {string}
     */
    public targetAddressToString(): string {
        if (this.targetAddress.isNamespaceId()) {
            // namespaceId recipient, return hexadecimal notation
            return (this.targetAddress as NamespaceId).toHex();
        }

        // address recipient
        return (this.targetAddress as Address).plain();
    }

    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    protected createBuilder(): TransactionBuilder {
        const transactionBuilder = new TokenAddressRestrictionTransactionBuilder(
            this.getSignatureAsBuilder(),
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_ADDRESS_RESTRICTION.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            new UnresolvedTokenIdDto(this.tokenId.id.toDTO()),
            this.restrictionKey.toDTO(),
            this.previousRestrictionValue.toDTO(),
            this.newRestrictionValue.toDTO(),
            new UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)),
        );
        return transactionBuilder;
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedTokenAddressRestrictionTransactionBuilder(
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_ADDRESS_RESTRICTION.valueOf(),
            new UnresolvedTokenIdDto(this.tokenId.id.toDTO()),
            this.restrictionKey.toDTO(),
            this.previousRestrictionValue.toDTO(),
            this.newRestrictionValue.toDTO(),
            new UnresolvedAddressDto(this.targetAddress.encodeUnresolvedAddress(this.networkType)),
        );
    }

    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {TokenAddressRestrictionTransaction}
     */
    resolveAliases(statement: Statement, aggregateTransactionIndex = 0): TokenAddressRestrictionTransaction {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping.assign(this, {
            tokenId: statement.resolveTokenId(
                this.tokenId,
                transactionInfo.height.toString(),
                transactionInfo.index,
                aggregateTransactionIndex,
            ),
            targetAddress: statement.resolveAddress(
                this.targetAddress,
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
    public shouldNotifyAccount(address: UnresolvedAddress): boolean {
        return super.isSigned(address) || this.targetAddress.equals(address);
    }
}
