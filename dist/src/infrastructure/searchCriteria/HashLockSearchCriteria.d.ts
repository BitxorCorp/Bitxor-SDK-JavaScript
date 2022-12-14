import { Address } from '../../model/account/Address';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search hash lock. With this criteria, you can sort and filter
 */
export interface HashLockSearchCriteria extends SearchCriteria {
    /**
     * The owner address. (required)
     */
    address?: Address;
}
