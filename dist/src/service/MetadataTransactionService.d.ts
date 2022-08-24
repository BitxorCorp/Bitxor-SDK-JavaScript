import { Observable } from 'rxjs';
import { MetadataRepository } from '../infrastructure/MetadataRepository';
import { Address } from '../model/account/Address';
import { NamespaceId } from '../model/namespace/NamespaceId';
import { NetworkType } from '../model/network/NetworkType';
import { TokenId } from '../model/token/TokenId';
import { AccountMetadataTransaction } from '../model/transaction/AccountMetadataTransaction';
import { Deadline } from '../model/transaction/Deadline';
import { NamespaceMetadataTransaction } from '../model/transaction/NamespaceMetadataTransaction';
import { TokenMetadataTransaction } from '../model/transaction/TokenMetadataTransaction';
import { UInt64 } from '../model/UInt64';
/**
 * MetadataTransaction service
 */
export declare class MetadataTransactionService {
    private readonly metadataRepository;
    /**
     * Constructor
     * @param metadataRepository
     */
    constructor(metadataRepository: MetadataRepository);
    /**
     * Create an Account Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target address
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<AccountMetadataTransaction>}
     */
    createAccountMetadataTransaction(deadline: Deadline, networkType: NetworkType, targetAddress: Address, key: UInt64, value: string, sourceAddress: Address, maxFee: UInt64): Observable<AccountMetadataTransaction>;
    /**
     * Create a Token Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target Address
     * @param tokenId - Token Id
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<TokenMetadataTransaction>}
     */
    createTokenMetadataTransaction(deadline: Deadline, networkType: NetworkType, targetAddress: Address, tokenId: TokenId, key: UInt64, value: string, sourceAddress: Address, maxFee: UInt64): Observable<TokenMetadataTransaction>;
    /**
     * Create a Namespace Metadata Transaction object without knowing previous metadata value
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param targetAddress - Target address
     * @param namespaceId - Namespace Id
     * @param key - Metadata key
     * @param value - New metadata value
     * @param sourceAddress - sender (signer) address
     * @param maxFee - max fee
     * @returns {Observable<NamespaceMetadataTransaction>}
     */
    createNamespaceMetadataTransaction(deadline: Deadline, networkType: NetworkType, targetAddress: Address, namespaceId: NamespaceId, key: UInt64, value: string, sourceAddress: Address, maxFee: UInt64): Observable<NamespaceMetadataTransaction>;
}
