import { Address } from './Address';
/**
 * The multisig account graph info structure describes the information of all the mutlisig levels an account is involved in.
 */
export declare class MultisigAccountInfo {
    /**
     * Version
     */
    readonly version: number;
    /**
     * The account multisig address.
     */
    readonly accountAddress: Address;
    /**
     * The number of signatures needed to approve a transaction.
     */
    readonly minApproval: number;
    /**
     * The number of signatures needed to remove a cosignatory.
     */
    readonly minRemoval: number;
    /**
     * The multisig account cosignatories.
     */
    readonly cosignatoryAddresses: Address[];
    /**
     * The multisig accounts this account is cosigner of.
     */
    readonly multisigAddresses: Address[];
    /**
     * @param version
     * @param accountAddress
     * @param minApproval
     * @param minRemoval
     * @param cosignatoryAddresses
     * @param multisigAddresses
     */
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * The account multisig address.
     */
    accountAddress: Address, 
    /**
     * The number of signatures needed to approve a transaction.
     */
    minApproval: number, 
    /**
     * The number of signatures needed to remove a cosignatory.
     */
    minRemoval: number, 
    /**
     * The multisig account cosignatories.
     */
    cosignatoryAddresses: Address[], 
    /**
     * The multisig accounts this account is cosigner of.
     */
    multisigAddresses: Address[]);
    /**
     * Checks if the account is a multisig account.
     * @returns {boolean}
     */
    isMultisig(): boolean;
    /**
     * Checks if an account is cosignatory of the multisig account.
     * @param address
     * @returns {boolean}
     */
    hasCosigner(address: Address): boolean;
    /**
     * Checks if the multisig account is cosignatory of an account.
     * @param address
     * @returns {boolean}
     */
    isCosignerOfMultisigAccount(address: Address): boolean;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
