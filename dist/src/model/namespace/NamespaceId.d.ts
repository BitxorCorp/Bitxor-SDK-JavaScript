import { NamespaceIdDto } from 'bitxor-catbuffer-typescript';
import { Id } from '../Id';
import { NetworkType } from '../network/NetworkType';
/**
 * The namespace id structure describes namespace id
 *
 * @since 1.0
 */
export declare class NamespaceId {
    /**
     * Namespace id
     */
    readonly id: Id;
    /**
     * Namespace full name
     */
    readonly fullName?: string;
    /**
     * Create NamespaceId from namespace string name (ex: bxr or domain.subdom.subdome)
     * or id in form of array number (ex: [929036875, 2226345261])
     *
     * @param id
     */
    constructor(id: string | number[]);
    /**
     * Create a NamespaceId object from its encoded hexadecimal notation.
     * @param encoded
     * @returns {NamespaceId}
     */
    static createFromEncoded(encoded: string): NamespaceId;
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex(): string;
    /**
     * Compares namespaceIds for equality.
     *
     * @return boolean
     */
    equals(id: any): boolean;
    /**
     * Create DTO object
     */
    toDTO(): any;
    /**
     * Creates the builder object.
     */
    toBuilder(): NamespaceIdDto;
    /**
     * Encoded unresolved address
     * @returns {Uint8Array}
     */
    encodeUnresolvedAddress(networkType: NetworkType): Uint8Array;
    /**
     * Get string value of id
     * @returns {string}
     */
    plain(): string;
    /**
     * returns that this instance is an alias.
     */
    isNamespaceId(): boolean;
    /**
     * returns that the instance is not address
     */
    isAddress(): boolean;
    /**
     * returns that the instance is not a token id
     */
    isTokenId(): boolean;
}
