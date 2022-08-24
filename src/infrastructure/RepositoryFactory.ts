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

import { Observable } from 'rxjs';
import { NetworkType } from '../model/network/NetworkType';
import { NetworkCurrencies } from '../model/token/NetworkCurrencies';
import { AccountRepository } from './AccountRepository';
import { BlockRepository } from './BlockRepository';
import { ChainRepository } from './ChainRepository';
import { FinalizationRepository } from './FinalizationRepository';
import { HashLockRepository } from './HashLockRepository';
import { IListener } from './IListener';
import { MetadataRepository } from './MetadataRepository';
import { MultisigRepository } from './MultisigRepository';
import { NamespaceRepository } from './NamespaceRepository';
import { NetworkRepository } from './NetworkRepository';
import { NodeRepository } from './NodeRepository';
import { ReceiptRepository } from './ReceiptRepository';
import { RestrictionAccountRepository } from './RestrictionAccountRepository';
import { RestrictionTokenRepository } from './RestrictionTokenRepository';
import { SecretLockRepository } from './SecretLockRepository';
import { TokenRepository } from './TokenRepository';
import { TransactionRepository } from './TransactionRepository';
import { TransactionStatusRepository } from './TransactionStatusRepository';

/**
 * A repository factory allows clients to create repositories to access Bitxor Server without knowing
 * the underline implementation.
 *
 */
export interface RepositoryFactory {
    /**
     * @returns the network type of the network. This method is cached, the server is only called the
     * first time.
     */
    getNetworkType(): Observable<NetworkType>;

    /**
     * @returns the generation hash used to sign transactions. Value retrieved from the blocks/1
     * endpoint. This method is cached, the server is only called the first time.
     */
    getGenerationHash(): Observable<string>;

    /**
     * @returns a newly created {@link AccountRepository}
     */
    createAccountRepository(): AccountRepository;

    /**
     * @returns a newly created {@link MultisigRepository}
     */
    createMultisigRepository(): MultisigRepository;

    /**
     * @returns a newly created {@link BlockRepository}
     */
    createBlockRepository(): BlockRepository;

    /**
     * @returns a newly created {@link ReceiptRepository}
     */
    createReceiptRepository(): ReceiptRepository;

    /**
     * @returns a newly created {@link ChainRepository}
     */
    createChainRepository(): ChainRepository;

    /**
     * @returns a newly created {@link TokenRepository}
     */
    createTokenRepository(): TokenRepository;

    /**
     * @returns a newly created {@link NamespaceRepository}
     */
    createNamespaceRepository(): NamespaceRepository;

    /**
     * @returns a newly created {@link NetworkRepository}
     */
    createNetworkRepository(): NetworkRepository;

    /**
     * @returns a newly created {@link NodeRepository}
     */
    createNodeRepository(): NodeRepository;

    /**
     * @returns a newly created {@link TransactionRepository}
     */
    createTransactionRepository(): TransactionRepository;

    /**
     * @returns a newly created {@link TransactionStatusRepository}
     */
    createTransactionStatusRepository(): TransactionStatusRepository;

    /**
     * @returns a newly created {@link MetadataRepository}
     */
    createMetadataRepository(): MetadataRepository;

    /**
     * @returns a newly created {@link RestrictionAccountRepository}
     */
    createRestrictionAccountRepository(): RestrictionAccountRepository;

    /**
     * @returns a newly created {@link RestrictionTokenRepository}
     */
    createRestrictionTokenRepository(): RestrictionTokenRepository;

    /**
     * @returns a newly created {@link HashLockRepository}
     */
    createHashLockRepository(): HashLockRepository;

    /**
     * @returns a newly created {@link SecretLockRepository}
     */
    createSecretLockRepository(): SecretLockRepository;

    /**
     * @returns a newly created {@link FinalizationRepository}
     */
    createFinalizationRepository(): FinalizationRepository;

    /**
     * @returns a newly created {@link IListener}
     */
    createListener(): IListener;

    /**
     * @returns genesis block epoch adjustment in seconds
     */
    getEpochAdjustment(): Observable<number>;

    /**
     * @returns the network currencies.
     */
    getCurrencies(): Observable<NetworkCurrencies>;

    /**
     * @returns the node public key
     */
    getNodePublicKey(): Observable<string | undefined>;
}
