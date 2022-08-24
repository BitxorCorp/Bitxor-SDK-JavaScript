import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { TokenFlags } from '../token/TokenFlags';
import { TokenId } from '../token/TokenId';
import { TokenNonce } from '../token/TokenNonce';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Before a token can be created or transferred, a corresponding definition of the token has to be created and published to the network.
 * This is done via a token definition transaction.
 */
export declare class TokenDefinitionTransaction extends Transaction {
    /**
     * The token nonce.
     */
    readonly nonce: TokenNonce;
    /**
     * The token id.
     */
    readonly tokenId: TokenId;
    /**
     * The token properties.
     */
    readonly flags: TokenFlags;
    /**
     * Token divisibility
     */
    readonly divisibility: number;
    /**
     * Token duration, 0 value for eternal token
     */
    readonly duration: UInt64;
    /**
     * Create a token creation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param nonce - The token nonce ex: TokenNonce.createRandom().
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param flags - The token flags.
     * @param divisibility - The token divicibility.
     * @param duration - The token duration.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenDefinitionTransaction}
     */
    static create(deadline: Deadline, nonce: TokenNonce, tokenId: TokenId, flags: TokenFlags, divisibility: number, duration: UInt64, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenDefinitionTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param nonce
     * @param tokenId
     * @param flags
     * @param divisibility
     * @param duration
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The token nonce.
     */
    nonce: TokenNonce, 
    /**
     * The token id.
     */
    tokenId: TokenId, 
    /**
     * The token properties.
     */
    flags: TokenFlags, 
    /**
     * Token divisibility
     */
    divisibility: number, 
    /**
     * Token duration, 0 value for eternal token
     */
    duration?: UInt64, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
    /**
     * @description Get token nonce int value
     * @returns {number}
     * @memberof TokenDefinitionTransaction
     */
    getTokenNonceIntValue(): number;
}
