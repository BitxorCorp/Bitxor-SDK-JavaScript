import { Address } from '../../model/account/Address';
import { TokenRestrictionEntryType } from '../../model/restriction/TokenRestrictionEntryType';
import { TokenId } from '../../model/token/TokenId';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search token restrictions. With this criteria, you can sort and filter
 * token restriction queries using rest.
 */
export interface RestrictionTokenSearchCriteria extends SearchCriteria {
    /**
     * Restrictiontoken id. (optional)
     */
    tokenId?: TokenId;
    /**
     * Token restriction entity type. (optional)
     */
    entryType?: TokenRestrictionEntryType;
    /**
     * Token restriction target address. (optional)
     */
    targetAddress?: Address;
}
