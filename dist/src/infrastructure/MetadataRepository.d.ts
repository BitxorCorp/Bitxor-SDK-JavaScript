import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { Metadata } from '../model/metadata';
import { SearcherRepository } from './paginationStreamer';
import { MetadataSearchCriteria } from './searchCriteria';
/**
 * Metadata interface repository.
 *
 * @since 1.0
 */
export interface MetadataRepository extends SearcherRepository<Metadata, MetadataSearchCriteria> {
    /**
     * Get metadata of the given id.
     * @param compositeHash Metadata composite hash id
     * @returns Observable<Metadata>
     */
    getMetadata(compositeHash: string): Observable<Metadata>;
    /**
     * Get metadata merkle of the given id.
     * @param compositeHash Metadata composite hash id
     * @returns Observable<MerkleStateInfo>
     */
    getMetadataMerkle(compositeHash: string): Observable<MerkleStateInfo>;
}
