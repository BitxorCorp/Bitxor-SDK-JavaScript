import { Address } from '../../model/account/Address';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search tokens. With this criteria, you can sort and filter
 * token queries using rest.
 */
export interface TokenSearchCriteria extends SearchCriteria {
    /**
     * Filter by owner address
     */
    ownerAddress?: Address;
}
