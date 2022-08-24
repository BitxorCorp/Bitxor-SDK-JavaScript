import { Observable } from 'rxjs';
import { SearchCriteria } from '../searchCriteria/SearchCriteria';
import { Searcher } from './Searcher';
/**
 * Utility helper that stream pages of searches into an Observable.
 *
 * A streamer will help users to walk through searches without knowing the underlying pagination implementation.
 */
export declare class PaginationStreamer<E, C extends SearchCriteria> {
    /**
     * The search method, likely to be the search method of entity's repository
     */
    private readonly searcher;
    /**
     * Constructor
     *
     * @param searcher the searcher repository
     */
    constructor(
    /**
     * The search method, likely to be the search method of entity's repository
     */
    searcher: Searcher<E, C>);
    /**
     * Main method of the helper, it streams the results in observable only loading the pages when necessary.
     *
     * @param criteria the criteria
     * @return the observable of entities.
     */
    search(criteria: C): Observable<E>;
    private searchInternal;
}
/**
 * An object that knows how to create a stremer.
 */
export interface StreamerFactory<E, C extends SearchCriteria> {
    /**
     * It creates a streamer for this searcher.
     */
    streamer(): PaginationStreamer<E, C>;
}
/**
 * An object that knows how to create a stremer from it's own searcher.
 */
export interface SearcherRepository<E, C extends SearchCriteria> extends StreamerFactory<E, C>, Searcher<E, C> {
}
