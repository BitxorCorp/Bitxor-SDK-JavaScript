import { Observable } from 'rxjs';
import { BlockInfo } from '../model/blockchain/BlockInfo';
import { MerkleProofInfo } from '../model/blockchain/MerkleProofInfo';
import { UInt64 } from '../model/UInt64';
import { BlockRepository } from './BlockRepository';
import { Http } from './Http';
import { Page } from './Page';
import { BlockPaginationStreamer } from './paginationStreamer';
import { BlockSearchCriteria } from './searchCriteria/BlockSearchCriteria';
/**
 * Blockchain http repository.
 *
 * @since 1.0
 */
export declare class BlockHttp extends Http implements BlockRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets a BlockInfo for a given block height
     * @param height - Block height
     * @returns Observable<BlockInfo>
     */
    getBlockByHeight(height: UInt64): Observable<BlockInfo>;
    /**
     * Gets an array of blocks.
     * @param criteria - Block search criteria
     * @returns Observable<BlockInfo[]>
     */
    search(criteria: BlockSearchCriteria): Observable<Page<BlockInfo>>;
    streamer(): BlockPaginationStreamer;
    /**
     * Get the merkle path for a given a transaction and block
     * Returns the merkle path for a [transaction](https://bitxorcorp.github.io/concepts/transaction.html)
     * included in a block. The path is the complementary data needed to calculate the merkle root.
     * A client can compare if the calculated root equals the one recorded in the block header,
     * verifying that the transaction was included in the block.
     * @param height The height of the block.
     * @param hash The hash of the transaction.
     * @return Observable<MerkleProofInfo>
     */
    getMerkleTransaction(height: UInt64, hash: string): Observable<MerkleProofInfo>;
    /**
     * Get the merkle path for a given a receipt statement hash and block
     * Returns the merkle path for a [receipt statement or resolution](https://bitxorcorp.github.io/concepts/receipt.html)
     * linked to a block. The path is the complementary data needed to calculate the merkle root.
     * A client can compare if the calculated root equals the one recorded in the block header,
     * verifying that the receipt was linked with the block.
     * @param height The height of the block.
     * @param hash The hash of the receipt statement or resolution.
     * @return Observable<MerkleProofInfo>
     */
    getMerkleReceipts(height: UInt64, hash: string): Observable<MerkleProofInfo>;
}
