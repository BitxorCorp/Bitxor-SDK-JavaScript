import { Address } from '../../model/account/Address';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search account restrictions. With this criteria, you can sort and filter
 * account restriction queries using rest.
 */
export interface RestrictionAccountSearchCriteria extends SearchCriteria {
    /**
     * Token restriction address. (optional)
     */
    address?: Address;
}
