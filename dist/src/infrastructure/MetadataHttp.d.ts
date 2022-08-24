import { Observable } from 'rxjs';
import { MerkleStateInfo } from '../model/blockchain';
import { Metadata } from '../model/metadata/Metadata';
import { Http } from './Http';
import { MetadataRepository } from './MetadataRepository';
import { Page } from './Page';
import { MetadataPaginationStreamer } from './paginationStreamer';
import { MetadataSearchCriteria } from './searchCriteria/MetadataSearchCriteria';
/**
 * Metadata http repository.
 *
 * @since 1.0
 */
export declare class MetadataHttp extends Http implements MetadataRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets an array of metadata.
     * @param criteria - Metadata search criteria
     * @returns Observable<Page<Metadata>>
     */
    search(criteria: MetadataSearchCriteria): Observable<Page<Metadata>>;
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
    streamer(): MetadataPaginationStreamer;
    /**
     * It maps MetadataDTO into a Metadata
     * @param metadata - the dto
     * @returns the model Metadata.
     */
    private toMetadata;
}
