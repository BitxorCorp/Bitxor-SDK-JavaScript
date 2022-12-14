import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NetworkType } from '../network/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Modify multisig account transactions are part of the Bitxor's multisig account system.
 * A modify multisig account transaction holds an array of multisig cosignatory modifications,
 * min number of signatures to approve a transaction and a min number of signatures to remove a cosignatory.
 * @since 1.0
 */
export declare class MultisigAccountModificationTransaction extends Transaction {
    /**
     * The number of signatures needed to approve a transaction.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    readonly minApprovalDelta: number;
    /**
     * The number of signatures needed to remove a cosignatory.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    readonly minRemovalDelta: number;
    /**
     * The Cosignatory address additions.
     */
    readonly addressAdditions: UnresolvedAddress[];
    /**
     * The Cosignatory address deletion.
     */
    readonly addressDeletions: UnresolvedAddress[];
    /**
     * Create a modify multisig account transaction object
     * @param deadline - The deadline to include the transaction.
     * @param minApprovalDelta - The min approval relative change.
     * @param minRemovalDelta - The min removal relative change.
     * @param addressAdditions - Cosignatory address additions.
     * @param addressDeletions - Cosignatory address deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {MultisigAccountModificationTransaction}
     */
    static create(deadline: Deadline, minApprovalDelta: number, minRemovalDelta: number, addressAdditions: UnresolvedAddress[], addressDeletions: UnresolvedAddress[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): MultisigAccountModificationTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param minApprovalDelta
     * @param minRemovalDelta
     * @param addressAdditions
     * @param addressDeletions
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The number of signatures needed to approve a transaction.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    minApprovalDelta: number, 
    /**
     * The number of signatures needed to remove a cosignatory.
     * If we are modifying and existing multi-signature account this indicates the relative change of the minimum cosignatories.
     */
    minRemovalDelta: number, 
    /**
     * The Cosignatory address additions.
     */
    addressAdditions: UnresolvedAddress[], 
    /**
     * The Cosignatory address deletion.
     */
    addressDeletions: UnresolvedAddress[], signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
