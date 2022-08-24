import { Observable } from 'rxjs';
import { RepositoryFactory } from '../infrastructure/RepositoryFactory';
import { UInt64 } from '../model/UInt64';
import { IBlockService } from './interfaces/IBlockService';
/**
 * Block Service
 */
export declare class BlockService implements IBlockService {
    readonly repositoryFactory: RepositoryFactory;
    private readonly blockRepository;
    private readonly transactionRepository;
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory: RepositoryFactory);
    /**
     * Validate transaction hash in block
     * @param leaf transaction hash
     * @param height block height
     */
    validateTransactionInBlock(leaf: string, height: UInt64): Observable<boolean>;
    /**
     * Validate statement hash in block
     * @param leaf statement hash
     * @param height block height
     */
    validateStatementInBlock(leaf: string, height: UInt64): Observable<boolean>;
    /**
     * Calculate transactions merkle root hash from a block
     * @param height block height
     * @returns root hash
     */
    calculateTransactionsMerkleRootHash(height: UInt64): Observable<string>;
}
