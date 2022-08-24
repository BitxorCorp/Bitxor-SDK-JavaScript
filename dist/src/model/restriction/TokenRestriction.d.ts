import { TokenAddressRestriction } from './TokenAddressRestriction';
import { TokenGlobalRestriction } from './TokenGlobalRestriction';
/**
 * A token restriction could be global or targeted to an address.
 */
export declare type TokenRestriction = TokenAddressRestriction | TokenGlobalRestriction;
