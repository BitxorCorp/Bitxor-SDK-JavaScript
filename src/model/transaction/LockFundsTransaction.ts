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
    EmbeddedHashLockTransactionBuilder,
    EmbeddedTransactionBuilder,
    Hash256Dto,
    HashLockTransactionBuilder,
    TimestampDto,
    TransactionBuilder,
    UnresolvedTokenBuilder,
    UnresolvedTokenIdDto,
} from 'bitxor-catbuffer-typescript';
import { Convert } from '../../core/format';
import { DtoMapping } from '../../core/utils';
import { Address, PublicAccount } from '../account';
import { NetworkType } from '../network';
import { Statement } from '../receipt';
import { Token, TokenId } from '../token';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { SignedTransaction } from './SignedTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Lock funds transaction is used before sending an Aggregate bonded transaction, as a deposit to announce the transaction.
 * When aggregate bonded transaction is confirmed funds are returned to LockFundsTransaction signer.
 *
 * @since 1.0
 */
export class LockFundsTransaction extends Transaction {
    /**
     * Aggregate bonded hash.
     */
    public readonly hash: string;

    /**
     * Create a Lock funds transaction object
     * @param deadline - The deadline to include the transaction.
     * @param token - The locked token.
     * @param duration - The funds lock duration.
     * @param signedTransaction - The signed transaction for which funds are locked.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {LockFundsTransaction}
     */
    public static create(
        deadline: Deadline,
        token: Token,
        duration: UInt64,
        signedTransaction: SignedTransaction,
        networkType: NetworkType,
        maxFee: UInt64 = new UInt64([0, 0]),
        signature?: string,
        signer?: PublicAccount,
    ): LockFundsTransaction {
        return new LockFundsTransaction(
            networkType,
            TransactionVersion.HASH_LOCK,
            deadline,
            maxFee,
            token,
            duration,
            signedTransaction,
            signature,
            signer,
        );
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param token The locked token.
     * @param duration The funds lock duration.
     * @param signedTransaction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(
        networkType: NetworkType,
        version: number,
        deadline: Deadline,
        maxFee: UInt64,
        public readonly token: Token,
        public readonly duration: UInt64,
        signedTransaction: SignedTransaction,
        signature?: string,
        signer?: PublicAccount,
        transactionInfo?: TransactionInfo,
    ) {
        super(TransactionType.HASH_LOCK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
        this.hash = signedTransaction.hash;
        if (signedTransaction.type !== TransactionType.AGGREGATE_BONDED) {
            throw new Error('Signed transaction must be Aggregate Bonded Transaction');
        }
    }

    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        const builder = isEmbedded
            ? EmbeddedHashLockTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload))
            : HashLockTransactionBuilder.loadFromBinary(Convert.hexToUint8(payload));
        const signerPublicKey = Convert.uint8ToHex(builder.getSignerPublicKey().publicKey);
        const networkType = builder.getNetwork().valueOf();
        const signature = Transaction.getSignatureFromPayload(payload, isEmbedded);
        const transaction = LockFundsTransaction.create(
            isEmbedded ? Deadline.createEmtpy() : Deadline.createFromDTO((builder as HashLockTransactionBuilder).getDeadline().timestamp),
            new Token(new TokenId(builder.getToken().tokenId.unresolvedTokenId), new UInt64(builder.getToken().amount.amount)),
            new UInt64(builder.getDuration().blockDuration),
            new SignedTransaction('', Convert.uint8ToHex(builder.getHash().hash256), '', TransactionType.AGGREGATE_BONDED, networkType),
            networkType,
            isEmbedded ? new UInt64([0, 0]) : new UInt64((builder as HashLockTransactionBuilder).fee.amount),
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
        return new HashLockTransactionBuilder(
            this.getSignatureAsBuilder(),
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.HASH_LOCK.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            new UnresolvedTokenBuilder(new UnresolvedTokenIdDto(this.token.id.id.toDTO()), new AmountDto(this.token.amount.toDTO())),
            new BlockDurationDto(this.duration.toDTO()),
            new Hash256Dto(Convert.hexToUint8(this.hash)),
        );
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedHashLockTransactionBuilder(
            this.getSignerAsBuilder(),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.HASH_LOCK.valueOf(),
            new UnresolvedTokenBuilder(new UnresolvedTokenIdDto(this.token.id.id.toDTO()), new AmountDto(this.token.amount.toDTO())),
            new BlockDurationDto(this.duration.toDTO()),
            new Hash256Dto(Convert.hexToUint8(this.hash)),
        );
    }

    /**
     * @internal
     * @param statement Block receipt statement
     * @param aggregateTransactionIndex Transaction index for aggregated transaction
     * @returns {LockFundsTransaction}
     */
    resolveAliases(statement: Statement, aggregateTransactionIndex = 0): LockFundsTransaction {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping.assign(this, {
            token: statement.resolveToken(this.token, transactionInfo.height.toString(), transactionInfo.index, aggregateTransactionIndex),
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
