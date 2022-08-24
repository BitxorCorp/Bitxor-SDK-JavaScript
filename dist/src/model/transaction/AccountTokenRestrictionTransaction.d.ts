import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { TokenRestrictionFlag } from '../restriction/TokenRestrictionFlag';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class AccountTokenRestrictionTransaction extends Transaction {
    readonly restrictionFlags: TokenRestrictionFlag;
    readonly restrictionAdditions: UnresolvedTokenId[];
    readonly restrictionDeletions: UnresolvedTokenId[];
    /**
     * Create a modify account token restriction transaction object
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
    static create(deadline: Deadline, restrictionFlags: TokenRestrictionFlag, restrictionAdditions: UnresolvedTokenId[], restrictionDeletions: UnresolvedTokenId[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AccountTokenRestrictionTransaction;
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
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, restrictionFlags: TokenRestrictionFlag, restrictionAdditions: UnresolvedTokenId[], restrictionDeletions: UnresolvedTokenId[], signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
