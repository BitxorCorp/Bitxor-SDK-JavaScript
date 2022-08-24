import { UInt64 } from '../UInt64';
/**
 * Token address restriction structure describes restriction information for an token.
 */
export declare class TokenAddressRestrictionItem {
    readonly key: UInt64;
    readonly restrictionValue: UInt64;
    constructor(key: UInt64, restrictionValue: UInt64);
}
