import { UInt64 } from '../UInt64';
import { UnresolvedTokenId } from './UnresolvedTokenId';
/**
 * A token describes an instance of a token definition.
 * Tokens can be transferred by means of a transfer transaction.
 */
export declare class Token {
    /**
     * The token id
     */
    readonly id: UnresolvedTokenId;
    /**
     * The token amount. The quantity is always given in smallest units for the token
     * i.e. if it has a divisibility of 3 the quantity is given in millis.
     */
    readonly amount: UInt64;
    /**
     * Constructor
     * @param id
     * @param amount
     */
    constructor(
    /**
     * The token id
     */
    id: UnresolvedTokenId, 
    /**
     * The token amount. The quantity is always given in smallest units for the token
     * i.e. if it has a divisibility of 3 the quantity is given in millis.
     */
    amount: UInt64);
}
