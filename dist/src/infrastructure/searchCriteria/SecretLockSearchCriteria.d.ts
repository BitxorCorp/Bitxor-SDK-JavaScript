import { Address } from '../../model/account';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search secret lock. With this criteria, you can sort and filter
 */
export interface SecretLockSearchCriteria extends SearchCriteria {
    /**
     * The owner address. (required)
     */
    address?: Address;
    /**
     * Optional to search by secret.
     */
    secret?: string;
}
