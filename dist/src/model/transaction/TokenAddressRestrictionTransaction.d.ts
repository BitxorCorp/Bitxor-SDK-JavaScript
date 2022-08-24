import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NetworkType } from '../network/NetworkType';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class TokenAddressRestrictionTransaction extends Transaction {
    /**
     * The token id.
     */
    readonly tokenId: UnresolvedTokenId;
    /**
     * The restriction key.
     */
    readonly restrictionKey: UInt64;
    /**
     * The affected unresolved address.
     */
    readonly targetAddress: UnresolvedAddress;
    /**
     * The previous restriction value.
     */
    readonly previousRestrictionValue: UInt64;
    /**
     * The new restriction value.
     */
    readonly newRestrictionValue: UInt64;
    /**
     * Create a token address restriction transaction object
     *
     * Enabling accounts to transact with the token is similar to the process of
     * adding elevated permissions to a user in a company computer network.
     *
     * The token creator can modify the permissions of an account by sending a
     * token restriction transaction targeting the account address.
     *
     * **TokenAddressRestrictionTransaction can only be announced in with Aggregate Transaction
     *
     * @param deadline - The deadline to include the transaction.
     * @param tokenId - The unresolved token identifier.
     * @param restrictionKey - The restriction key.
     * @param targetAddress - The affected unresolved address.
     * @param newRestrictionValue - The new restriction value.
     * @param networkType - The network type.
     * @param previousRestrictionValue - (Optional) The previous restriction value.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAddressRestrictionTransaction}
     */
    static create(deadline: Deadline, tokenId: UnresolvedTokenId, restrictionKey: UInt64, targetAddress: UnresolvedAddress, newRestrictionValue: UInt64, networkType: NetworkType, previousRestrictionValue?: UInt64, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenAddressRestrictionTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param tokenId
     * @param signature
     * @param restrictionKey
     * @param targetAddress
     * @param previousRestrictionValue
     * @param newRestrictionValue
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The token id.
     */
    tokenId: UnresolvedTokenId, 
    /**
     * The restriction key.
     */
    restrictionKey: UInt64, 
    /**
     * The affected unresolved address.
     */
    targetAddress: UnresolvedAddress, 
    /**
     * The previous restriction value.
     */
    previousRestrictionValue: UInt64, 
    /**
     * The new restriction value.
     */
    newRestrictionValue: UInt64, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
