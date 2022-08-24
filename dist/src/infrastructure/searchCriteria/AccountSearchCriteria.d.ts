import { TokenId } from '../../model/token/TokenId';
import { AccountOrderBy } from './AccountOrderBy';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search blocks. With this criteria, you can sort and filter
 * block queries using rest.
 */
export interface AccountSearchCriteria extends SearchCriteria {
    /**
     * Account order by enum. (optional)
     */
    orderBy?: AccountOrderBy;
    /**
     * Account token id. (optional)
     */
    tokenId?: TokenId;
}
