import { PublicAccount } from '../account/PublicAccount';
import { CosignatoryModificationAction } from './CosignatoryModificationAction';
/**
 * Multisig cosignatory modifications are part of the Bitxor's multisig account system.
 * With a multisig cosignatory modification a cosignatory is added to or deleted from a multisig account.
 * Multisig cosignatory modifications are part of a modify multisig account transactions.
 *
 */
export declare class MultisigCosignatoryModification {
    /**
     * Multi-signature modification type.
     */
    readonly modificationAction: CosignatoryModificationAction;
    /**
     * Cosignatory public account.
     */
    readonly cosignatoryPublicAccount: PublicAccount;
    /**
     * Constructor
     * @param modificationAction
     * @param cosignatoryPublicAccount
     */
    constructor(
    /**
     * Multi-signature modification type.
     */
    modificationAction: CosignatoryModificationAction, 
    /**
     * Cosignatory public account.
     */
    cosignatoryPublicAccount: PublicAccount);
}
