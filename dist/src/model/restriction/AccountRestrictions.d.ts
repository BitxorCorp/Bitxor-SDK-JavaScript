import { Address } from '../account';
import { AccountRestriction } from './AccountRestriction';
/**
 * Account restrictions structure describes restriction information for an account.
 */
export declare class AccountRestrictions {
    readonly version: number;
    readonly recordId: string;
    readonly address: Address;
    readonly restrictions: AccountRestriction[];
    /**
     * Constructor
     * @param version version
     * @param recordId the data base id.
     * @param address the target address
     * @param restrictions the restrictions
     */
    constructor(version: number, recordId: string, address: Address, restrictions: AccountRestriction[]);
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
}
