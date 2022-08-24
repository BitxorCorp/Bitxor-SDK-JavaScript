import { Address } from '../account';
import { TokenId } from '../token';
import { TransactionType } from '../transaction';
import { AddressRestrictionFlag } from './AddressRestrictionFlag';
import { OperationRestrictionFlag } from './OperationRestrictionFlag';
import { TokenRestrictionFlag } from './TokenRestrictionFlag';
/**
 * Account restriction structure describes restriction information.
 */
export declare class AccountRestriction {
    /**
     * Account restriction flag
     */
    readonly restrictionFlags: AddressRestrictionFlag | TokenRestrictionFlag | OperationRestrictionFlag;
    /**
     * Restriction values.
     */
    readonly values: (Address | TokenId | TransactionType)[];
    /**
     * Constructor
     * @param restrictionFlags
     * @param values
     */
    constructor(
    /**
     * Account restriction flag
     */
    restrictionFlags: AddressRestrictionFlag | TokenRestrictionFlag | OperationRestrictionFlag, 
    /**
     * Restriction values.
     */
    values: (Address | TokenId | TransactionType)[]);
}
