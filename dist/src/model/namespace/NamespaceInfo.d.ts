import { Address } from '../account/Address';
import { UInt64 } from '../UInt64';
import { Alias } from './Alias';
import { NamespaceId } from './NamespaceId';
/**
 * Object containing information of a namespace.
 */
export declare class NamespaceInfo {
    /**
     * Version
     */
    readonly version: number;
    /**
     * Namespace is active.
     */
    readonly active: boolean;
    /**
     * The namespace index.
     */
    readonly index: number;
    /**
     * The meta data id.
     */
    readonly recordId: string;
    /**
     * The namespace registration type, namespace and sub namespace.
     */
    readonly registrationType: number;
    /**
     * The level of namespace.
     */
    readonly depth: number;
    /**
     * The namespace id levels.
     */
    readonly levels: NamespaceId[];
    /**
     * The namespace parent id.
     */
    readonly parentId: NamespaceId;
    /**
     * The namespace owner's address.
     */
    readonly ownerAddress: Address;
    /**
     * The height at which the ownership begins.
     */
    readonly startHeight: UInt64;
    /**
     * The height at which the ownership ends.
     */
    readonly endHeight: UInt64;
    /**
     * The alias linked to a namespace.
     */
    readonly alias: Alias;
    /**
     * @param version
     * @param active
     * @param index
     * @param recordId
     * @param registrationType
     * @param depth
     * @param levels
     * @param parentId
     * @param ownerAddress
     * @param startHeight
     * @param endHeight
     * @param alias
     */
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * Namespace is active.
     */
    active: boolean, 
    /**
     * The namespace index.
     */
    index: number, 
    /**
     * The meta data id.
     */
    recordId: string, 
    /**
     * The namespace registration type, namespace and sub namespace.
     */
    registrationType: number, 
    /**
     * The level of namespace.
     */
    depth: number, 
    /**
     * The namespace id levels.
     */
    levels: NamespaceId[], 
    /**
     * The namespace parent id.
     */
    parentId: NamespaceId, 
    /**
     * The namespace owner's address.
     */
    ownerAddress: Address, 
    /**
     * The height at which the ownership begins.
     */
    startHeight: UInt64, 
    /**
     * The height at which the ownership ends.
     */
    endHeight: UInt64, 
    /**
     * The alias linked to a namespace.
     */
    alias: Alias);
    /**
     * Namespace id
     * @returns {Id}
     */
    get id(): NamespaceId;
    /**
     * Is root namespace
     * @returns {boolean}
     */
    isRoot(): boolean;
    /**
     * Is sub namepsace
     * @returns {boolean}
     */
    isSubnamespace(): boolean;
    /**
     * Has alias
     * @returns {boolean}
     */
    hasAlias(): boolean;
    /**
     * Get parent id
     * @returns {Id}
     */
    parentNamespaceId(): NamespaceId;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(fullPath: NamespaceInfo[]): Uint8Array;
    /**
     * Generate the namespace full path builder
     * @param namespaces Full path of namespaces
     * @param rootId Root namespace id
     * @returns {NamespacePathBuilder[]}
     */
    private getNamespacePath;
    /**
     * Generate namespace alias builder
     * @param namespaceInfo namespace info
     * @requires {NamespaceAliasBuilder}
     */
    private getAliasBuilder;
    /**
     * Sort namespace info by namespace id
     * @param info array of namespace info
     * @returns {NamespaceInfo[]}
     */
    private sortNamespaceInfo;
}
