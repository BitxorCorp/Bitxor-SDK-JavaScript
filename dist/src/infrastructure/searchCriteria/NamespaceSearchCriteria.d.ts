import { Address } from '../../model/account/Address';
import { AliasType } from '../../model/namespace/AliasType';
import { NamespaceId } from '../../model/namespace/NamespaceId';
import { NamespaceRegistrationType } from '../../model/namespace/NamespaceRegistrationType';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search blocks. With this criteria, you can sort and filter
 * namespace queries using rest.
 */
export interface NamespaceSearchCriteria extends SearchCriteria {
    /**
     * Namespace owner's address. (optional)
     */
    ownerAddress?: Address;
    /**
     * Namespace registration type. (optional)
     */
    registrationType?: NamespaceRegistrationType;
    /**
     * Namespace root level id. (optional)
     */
    level0?: NamespaceId;
    /**
     * Namespace alais type. (optional)
     */
    aliasType?: AliasType;
}
