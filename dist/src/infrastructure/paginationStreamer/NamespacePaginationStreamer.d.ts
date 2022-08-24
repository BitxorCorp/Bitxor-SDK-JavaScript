import { NamespaceInfo } from '../../model/namespace/NamespaceInfo';
import { NamespaceSearchCriteria } from '../searchCriteria/NamespaceSearchCriteria';
import { PaginationStreamer } from './PaginationStreamer';
import { Searcher } from './Searcher';
/**
 * A helper object that streams {@link NamespaceInfo} using the search.
 */
export declare class NamespacePaginationStreamer extends PaginationStreamer<NamespaceInfo, NamespaceSearchCriteria> {
    /**
     * Constructor
     *
     * @param searcher the namespace repository that will perform the searches
     */
    constructor(searcher: Searcher<NamespaceInfo, NamespaceSearchCriteria>);
}
