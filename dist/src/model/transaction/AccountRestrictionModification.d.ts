import { Address } from '../account/Address';
import { AccountRestrictionModificationAction } from '../restriction/AccountRestrictionModificationAction';
import { TokenId } from '../token/TokenId';
import { TransactionType } from './TransactionType';
export declare class AccountRestrictionModification<T> {
    /**
     * Modification type.
     */
    readonly modificationAction: AccountRestrictionModificationAction;
    /**
     * Modification value (Address, Token or Transaction Type).
     */
    readonly value: T;
    /**
     * Constructor
     * @param modificationAction
     * @param value
     */
    constructor(
    /**
     * Modification type.
     */
    modificationAction: AccountRestrictionModificationAction, 
    /**
     * Modification value (Address, Token or Transaction Type).
     */
    value: T);
    /**
     * Create an address filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Address)
     * @returns {AccountRestrictionModification}
     */
    static createForAddress(modificationAction: AccountRestrictionModificationAction, value: Address): AccountRestrictionModification<string>;
    /**
     * Create an token filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param value - modification value (Token)
     * @returns {AccountRestrictionModification}
     */
    static createForToken(modificationAction: AccountRestrictionModificationAction, value: TokenId): AccountRestrictionModification<number[]>;
    /**
     * Create an operation filter for account restriction modification
     * @param modificationAction - modification type. 0: Add, 1: Remove
     * @param operation - modification value (Transaction Type)
     * @returns {AccountRestrictionModification}
     */
    static createForOperation(modificationAction: AccountRestrictionModificationAction, value: number): AccountRestrictionModification<TransactionType>;
}
