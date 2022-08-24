import { Address } from '../../model/account/Address';
import { MetadataType } from '../../model/metadata/MetadataType';
import { NamespaceId } from '../../model/namespace/NamespaceId';
import { TokenId } from '../../model/token/TokenId';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search metadata. With this criteria, you can sort and filter
 * metadata queries using rest.
 */
export interface MetadataSearchCriteria extends SearchCriteria {
    /**
     * The source address. (optional)
     */
    sourceAddress?: Address;
    /**
     * The target address. (optional)
     */
    targetAddress?: Address;
    /**
     * The scoped metadata key. (optional)
     */
    scopedMetadataKey?: string;
    /**
     * The target Token or NamespaceId. (optional)
     */
    targetId?: TokenId | NamespaceId;
    /**
     * The metadata type. (optional)
     */
    metadataType?: MetadataType;
}
