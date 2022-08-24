import { NamespaceId } from '../namespace';
import { Address } from './Address';
/**
 * Custom type for unresolved address
 */
export declare type UnresolvedAddress = (Address | NamespaceId) & {
    /**
     * returns if the object is instance of NamespaceId.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isNamespaceId(): boolean;
    /**
     * returns if the object is instance of Address.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isAddress(): boolean;
};
