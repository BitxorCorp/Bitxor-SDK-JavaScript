import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { TokenSupplyChangeAction } from '../token/TokenSupplyChangeAction';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * In case a token has the flag 'supplyMutable' set to true, the creator of the token can change the supply,
 * i.e. increase or decrease the supply.
 */
export declare class TokenSupplyChangeTransaction extends Transaction {
    /**
     * The unresolved token id.
     */
    readonly tokenId: UnresolvedTokenId;
    /**
     * The supply type.
     */
    readonly action: TokenSupplyChangeAction;
    /**
     * The supply change in units for the token.
     */
    readonly delta: UInt64;
    /**
     * Create a token supply change transaction object
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The unresolved token id.
     * @param action - The supply change action (increase | decrease).
     * @param delta - The supply change in units for the token.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenSupplyChangeTransaction}
     */
    static create(deadline: Deadline, tokenId: UnresolvedTokenId, action: TokenSupplyChangeAction, delta: UInt64, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenSupplyChangeTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param tokenId
     * @param action
     * @param delta
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The unresolved token id.
     */
    tokenId: UnresolvedTokenId, 
    /**
     * The supply type.
     */
    action: TokenSupplyChangeAction, 
    /**
     * The supply change in units for the token.
     */
    delta: UInt64, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
