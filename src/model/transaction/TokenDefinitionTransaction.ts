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
    EmbeddedTokenDefinitionTransactionBuilder,
    EmbeddedTransactionBuilder,
    GeneratorUtils,
    TimestampDto,
    TokenDefinitionTransactionBuilder,
    TokenFlagsDto,
    TokenNonceDto,
    TransactionBuilder,
} from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { TokenFlags } from '../token/TokenFlags';
import { TokenId } from '../token/TokenId';
import { TokenNonce } from '../token/TokenNonce';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Before a token can be created or transferred, a corresponding definition of the token has to be created and published to the network.
 * This is done via a token definition transaction.
 */
export class TokenDefinitionTransaction extends Transaction {
    /**
     * Create a token creation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param nonce - The token nonce ex: TokenNonce.createRandom().
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param flags - The token flags.
     * @param divisibility - The token divicibility.
     * @param duration - The token duration.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenDefinitionTransaction}
     */
    public static create(
        deadline: Deadline,
        nonce: TokenNonce,
        tokenId: TokenId,
        flags: TokenFlags,
        divisibility: number,
        duration: UInt64,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): TokenDefinitionTransaction {
        return new TokenDefinitionTransaction(
            networkType,
            TransactionVersion.TOKEN_DEFINITION,
            deadline,
            maxFee,
            nonce,
            tokenId,
            flags,
            divisibility,
            duration,
            signature,
            signer,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param nonce
     * @param tokenId
     * @param flags
     * @param divisibility
     * @param duration
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
         * The token nonce.
         */
        public readonly nonce: TokenNonce,
        /**
         * The token id.
         */
        public readonly tokenId: TokenId,
        /**
         * The token properties.
         */
        public readonly flags: TokenFlags,
        /**
         * Token divisibility
         */
        public readonly divisibility: number,
        /**
         * Token duration, 0 value for eternal token
         */
        public readonly duration: UInt64 = UInt64.fromUint(0),
        signature?: string,
        signer?: PublicAccount,
        transactionInfo?: TransactionInfo,
    ) {
        super(TransactionType.TOKEN_DEFINITION, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        const builder = isEmbedded
            ? EmbeddedTokenDefinitionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload))
            : TokenDefinitionTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload));
        const signerPublicKey = Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = TokenDefinitionTransaction.create(
            isEmbedded
                ? Deadline.createEmtpy()
                : Deadline.createFromDTO((builder as TokenDefinitionTransactionBuilder).getDeadline().timestamp),
            TokenNonce.createFromUint8Array(builder.getNonce().serialize()),
            new TokenId(builder.getId().tokenId),
            TokenFlags.create(
                builder.getFlags().indexOf(TokenFlagsDto.SUPPLY_MUTABLE) > -1,
                builder.getFlags().indexOf(TokenFlagsDto.TRANSFERABLE) > -1,
                builder.getFlags().indexOf(TokenFlagsDto.RESTRICTABLE) > -1,
            ),
            builder.getDivisibility(),
            new UInt64(builder.getDuration().blockDuration),
            networkType,
            isEmbedded ? new UInt64([0, 0]) : new UInt64((builder as TokenDefinitionTransactionBuilder).fee.amount),
            signature,
            signerPublicKey.match(`^[0]+$`) ? undefined : PublicAccount.createFromPublicKey(signerPublicKey, networkType),
        );
        return isEmbedded ? transaction.toAggregate(PublicAccount.createFromPublicKey(signerPublicKey, networkType)) : transaction;
    }

    /**
     * @description Get token nonce int value
     * @returns {number}
     * @memberof TokenDefinitionTransaction
     */
    public getTokenNonceIntValue(): number {
        return this.nonce.toDTO();
    }

    /**
     * @internal
     * @returns {TransactionBuilder}
     */
    protected createBuilder(): TransactionBuilder {
        return new TokenDefinitionTransactionBuilder(
            this.getSignatureAsBuilder(),
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_DEFINITION.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            this.tokenId.toBuilder(),
            new BlockDurationDto(this.duration.toDTO()),
            new TokenNonceDto(this.getTokenNonceIntValue()),
            GeneratorUtils.toFlags(TokenFlagsDto, this.flags.getValue()),
            this.divisibility,
        );
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedTokenDefinitionTransactionBuilder(
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.TOKEN_DEFINITION.valueOf(),
            this.tokenId.toBuilder(),
            new BlockDurationDto(this.duration.toDTO()),
            new TokenNonceDto(this.getTokenNonceIntValue()),
            GeneratorUtils.toFlags(TokenFlagsDto, this.flags.getValue()),
            this.divisibility,
        );
    }

    /**
     * @internal
     * @returns {TokenDefinitionTransaction}
     */
    resolveAliases(): TokenDefinitionTransaction {
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
