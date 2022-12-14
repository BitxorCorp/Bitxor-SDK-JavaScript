import { Observable } from 'rxjs';
import { Page } from '../Page';
import { SearchCriteria } from '../searchCriteria/SearchCriteria';
/**
 *  Objects of this interface know how to search bitxor objects based on a criteria returning a page of these objects.
 * @param <E> The entity model type
 * @param <C> The type of the criteria with the search filter
 */
export interface Searcher<E, C extends SearchCriteria> {
    /**
     * It searches entities of a type based on a criteria.
     *
     * @param criteria the criteria
     * @return a page of entities.
     */
    search(criteria: C): Observable<Page<E>>;
}
