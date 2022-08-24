import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NetworkType } from '../network/NetworkType';
import { AddressRestrictionFlag } from '../restriction/AddressRestrictionFlag';
import { OperationRestrictionFlag } from '../restriction/OperationRestrictionFlag';
import { TokenRestrictionFlag } from '../restriction/TokenRestrictionFlag';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { AccountAddressRestrictionTransaction } from './AccountAddressRestrictionTransaction';
import { AccountOperationRestrictionTransaction } from './AccountOperationRestrictionTransaction';
import { AccountTokenRestrictionTransaction } from './AccountTokenRestrictionTransaction';
import { Deadline } from './Deadline';
import { TransactionType } from './TransactionType';
export declare class AccountRestrictionTransaction {
    /**
     * Create an account address restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountAddressRestrictionTransaction}
     */
    static createAddressRestrictionModificationTransaction(deadline: Deadline, restrictionFlags: AddressRestrictionFlag, restrictionAdditions: UnresolvedAddress[], restrictionDeletions: UnresolvedAddress[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AccountAddressRestrictionTransaction;
    /**
     * Create an account token restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountTokenRestrictionTransaction}
     */
    static createTokenRestrictionModificationTransaction(deadline: Deadline, restrictionFlags: TokenRestrictionFlag, restrictionAdditions: UnresolvedTokenId[], restrictionDeletions: UnresolvedTokenId[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AccountTokenRestrictionTransaction;
    /**
     * Create an account operation restriction transaction object
     * @param deadline - The deadline to include the transaction.
     * @param restrictionFlags - Type of account restriction transaction
     * @param restrictionAdditions - Account restriction additions.
     * @param restrictionDeletions - Account restriction deletions.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AccountOperationRestrictionTransaction}
     */
    static createOperationRestrictionModificationTransaction(deadline: Deadline, restrictionFlags: OperationRestrictionFlag, restrictionAdditions: TransactionType[], restrictionDeletions: TransactionType[], networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AccountOperationRestrictionTransaction;
}
