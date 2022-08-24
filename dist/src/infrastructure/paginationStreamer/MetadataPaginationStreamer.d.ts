import { Metadata } from '../../model/metadata/Metadata';
import { MetadataSearchCriteria } from '../searchCriteria/MetadataSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link Metadata} using the search.
 */
export declare class MetadataPaginationStreamer extends PaginationStreamer<Metadata, MetadataSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the metadata repository that will perform the searches
     */
    constructor(searcher: Searcher<Metadata, MetadataSearchCriteria>);
}
