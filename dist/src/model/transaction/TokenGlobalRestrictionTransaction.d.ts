import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { TokenRestrictionType } from '../restriction/TokenRestrictionType';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class TokenGlobalRestrictionTransaction extends Transaction {
    /**
     * The token id.
     */
    readonly tokenId: UnresolvedTokenId;
    /**
     * The refrence token id.
     */
    readonly referenceTokenId: UnresolvedTokenId;
    /**
     * The restriction key.
     */
    readonly restrictionKey: UInt64;
    /**
     * The previous restriction value.
     */
    readonly previousRestrictionValue: UInt64;
    /**
     * The previous restriction type.
     */
    readonly previousRestrictionType: TokenRestrictionType;
    /**
     * The new restriction value.
     */
    readonly newRestrictionValue: UInt64;
    /**
     * The new restriction type.
     */
    readonly newRestrictionType: TokenRestrictionType;
    /**
     * Create a token address restriction transaction object
     *
     * The token global restrictions are the network-wide rules that will determine
     * whether an account will be able to transact a given token.
     *
     * Only accounts tagged with the key identifiers and values that meet the conditions
     * will be able to execute transactions involving the token.
     *
     * Additionally, the token creator can define restrictions that depend directly on
     * global restrictions set on another token - known as **reference token**.
     * The referenced token and the restricted token do not necessarily have to be created
     * by the same account, enabling the delegation of token permissions to a third party.
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The token id ex: new TokenId([481110499, 231112638]).
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param newRestrictionType - The new restriction tpye.
     * @param networkType - The network type.
     * @param referenceTokenId - (Optional) The unresolved token identifier providing the restriction key.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenGlobalRestrictionTransaction}
     */
    static create(deadline: Deadline, tokenId: UnresolvedTokenId, restrictionKey: UInt64, previousRestrictionValue: UInt64, previousRestrictionType: TokenRestrictionType, newRestrictionValue: UInt64, newRestrictionType: TokenRestrictionType, networkType: NetworkType, referenceTokenId?: UnresolvedTokenId, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenGlobalRestrictionTransaction;
    /**
     * @param networkType - The network type
     * @param version - The transaction version
     * @param deadline - The deadline to include the transaction.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param tokenId - The unresolved token identifier.
     * @param referenceTokenId - The token id providing the restriction key.
     * @param restrictionKey - The restriction key.
     * @param previousRestrictionValue - The previous restriction value.
     * @param previousRestrictionType - The previous restriction type.
     * @param newRestrictionValue - The new restriction value.
     * @param previousRestrictionType - The previous restriction tpye.
     * @param signature - The transaction signature
     * @param signer - The signer
     * @param transactionInfo - The transaction info
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The token id.
     */
    tokenId: UnresolvedTokenId, 
    /**
     * The refrence token id.
     */
    referenceTokenId: UnresolvedTokenId, 
    /**
     * The restriction key.
     */
    restrictionKey: UInt64, 
    /**
     * The previous restriction value.
     */
    previousRestrictionValue: UInt64, 
    /**
     * The previous restriction type.
     */
    previousRestrictionType: TokenRestrictionType, 
    /**
     * The new restriction value.
     */
    newRestrictionValue: UInt64, 
    /**
     * The new restriction type.
     */
    newRestrictionType: TokenRestrictionType, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
