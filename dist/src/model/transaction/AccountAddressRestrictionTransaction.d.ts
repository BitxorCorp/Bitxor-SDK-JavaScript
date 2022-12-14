import { PublicAccount, UnresolvedAddress } from '../account';
import { NetworkType } from '../network';
import { AddressRestrictionFlag } from '../restriction';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class AccountAddressRestrictionTransaction extends Transaction {
    readonly restrictionFlags: AddressRestrictionFlag;
    readonly restrictionAdditions: UnresolvedAddress[];
    readonly restrictionDeletions: UnresolvedAddress[];
    /**
     * Create a modify account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - The account restriction flags.
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountAddressRestrictionTransaction}
     */
    static create(deadline: Deadline, restrictionFlags: AddressRestrictionFlag, restrictionAdditions: UnresolvedAddress[], restrictionDeletions: UnresolvedAddress[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AccountAddressRestrictionTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param restrictionFlags
     * @param restrictionAdditions
     * @param restrictionDeletions
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, restrictionFlags: AddressRestrictionFlag, restrictionAdditions: UnresolvedAddress[], restrictionDeletions: UnresolvedAddress[], signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
