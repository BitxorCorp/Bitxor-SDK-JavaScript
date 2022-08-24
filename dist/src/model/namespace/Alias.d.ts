import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
/**
 * Abtract class for Aliases
 *
 * @since 0.10.2
 */
export declare abstract class Alias {
    /**
     * The alias type
     *
     * - 0 : No alias
     * - 1 : Token id alias
     * - 2 : Address alias
     */
    readonly type: number;
    /**
     * The alias address
     */
    readonly address?: Address | undefined;
    /**
     * The alias tokenId
     */
    readonly tokenId?: TokenId | undefined;
}
