import { UInt64 } from '../../model/UInt64';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search resolution statement receipts. With this criteria, you can sort and filter
 * receipt queries using rest.
 */
export interface ResolutionStatementSearchCriteria extends SearchCriteria {
    /**
     * Block height. (optional)
     */
    height?: UInt64;
}
