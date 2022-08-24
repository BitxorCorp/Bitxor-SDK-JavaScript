import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NetworkType } from '../network/NetworkType';
import { Token } from '../token';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Creators of a revokable token will be able to recall any and all balances from any holders. Holders of these tokens implicitly place trust in the issuer.
 * The token issuer can revoke and recall balances using this transaction.
 */
export declare class TokenSupplyRevocationTransaction extends Transaction {
    /**
     * Address from which tokens should be revoked.
     */
    readonly sourceAddress: UnresolvedAddress;
    /**
     * Revoked token and amount.
     */
    readonly token: Token;
    /**
     * Create a token supply revocation transaction object
     * @param deadline - The deadline to include the transaction.
     * @param sourceAddress - Address from which tokens should be revoked.
     * @param token - Revoked token and amount.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenSupplyRevocationTransaction}
     */
    static create(deadline: Deadline, sourceAddress: UnresolvedAddress, token: Token, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenSupplyRevocationTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param sourceAddress
     * @param token
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * Address from which tokens should be revoked.
     */
    sourceAddress: UnresolvedAddress, 
    /**
     * Revoked token and amount.
     */
    token: Token, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
