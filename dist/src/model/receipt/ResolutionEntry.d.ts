import { Address } from '../account/Address';
import { TokenId } from '../token/TokenId';
import { ReceiptSource } from './ReceiptSource';
/**
 * The receipt source object.
 */
export declare class ResolutionEntry<R extends Address | TokenId> {
    /**
     * A resolved address or resolved tokenId (alias).
     */
    readonly resolved: R;
    /**
     * The receipt source.
     */
    readonly source: ReceiptSource;
    /**
     * @constructor
     * @param resolved - A resolved address or resolved tokenId (alias).
     * @param source - The receipt source.
     */
    constructor(
    /**
     * A resolved address or resolved tokenId (alias).
     */
    resolved: R, 
    /**
     * The receipt source.
     */
    source: ReceiptSource);
}
