import { Observable } from 'rxjs';
import { NetworkType } from '../model/network/NetworkType';
import { NetworkCurrencies } from '../model/token';
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
import { RepositoryFactory } from './RepositoryFactory';
import { RepositoryFactoryConfig } from './RepositoryFactoryConfig';
import { RestrictionAccountRepository } from './RestrictionAccountRepository';
import { RestrictionTokenRepository } from './RestrictionTokenRepository';
import { SecretLockRepository } from './SecretLockRepository';
import { TokenRepository } from './TokenRepository';
import { TransactionRepository } from './TransactionRepository';
import { TransactionStatusRepository } from './TransactionStatusRepository';
/**
 * Receipt http repository.
 *
 */
export declare class RepositoryFactoryHttp implements RepositoryFactory {
    private readonly url;
    private readonly networkType;
    private readonly generationHash;
    private readonly websocketUrl;
    private readonly websocketInjected?;
    private readonly fetchApi?;
    private readonly epochAdjustment;
    private readonly networkProperties;
    private readonly networkCurrencies;
    private readonly nodePublicKey;
    /**
     * Constructor
     * @param url the server url.
     * @param configs optional repository factory configs
     */
    constructor(url: string, configs?: RepositoryFactoryConfig);
    cache<T>(delegate: () => Observable<T>): Observable<T>;
    createAccountRepository(): AccountRepository;
    createBlockRepository(): BlockRepository;
    createChainRepository(): ChainRepository;
    createMetadataRepository(): MetadataRepository;
    createTokenRepository(): TokenRepository;
    createMultisigRepository(): MultisigRepository;
    createNamespaceRepository(): NamespaceRepository;
    createNetworkRepository(): NetworkRepository;
    createNodeRepository(): NodeRepository;
    createReceiptRepository(): ReceiptRepository;
    createRestrictionAccountRepository(): RestrictionAccountRepository;
    createRestrictionTokenRepository(): RestrictionTokenRepository;
    createTransactionRepository(): TransactionRepository;
    createTransactionStatusRepository(): TransactionStatusRepository;
    createHashLockRepository(): HashLockRepository;
    createSecretLockRepository(): SecretLockRepository;
    createFinalizationRepository(): FinalizationRepository;
    getGenerationHash(): Observable<string>;
    getNetworkType(): Observable<NetworkType>;
    createListener(): IListener;
    getEpochAdjustment(): Observable<number>;
    getCurrencies(): Observable<NetworkCurrencies>;
    /**
     * @returns the node public key
     */
    getNodePublicKey(): Observable<string | undefined>;
}
