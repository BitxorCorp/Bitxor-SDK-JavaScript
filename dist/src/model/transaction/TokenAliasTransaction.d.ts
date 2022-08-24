import { PublicAccount } from '../account/PublicAccount';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class TokenAliasTransaction extends Transaction {
    /**
     * The alias action type.
     */
    readonly aliasAction: AliasAction;
    /**
     * The namespace id that will be an alias.
     */
    readonly namespaceId: NamespaceId;
    /**
     * The token id.
     */
    readonly tokenId: TokenId;
    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The alias action type.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    static create(deadline: Deadline, aliasAction: AliasAction, namespaceId: NamespaceId, tokenId: TokenId, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): TokenAliasTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param aliasAction
     * @param namespaceId
     * @param tokenId
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The alias action type.
     */
    aliasAction: AliasAction, 
    /**
     * The namespace id that will be an alias.
     */
    namespaceId: NamespaceId, 
    /**
     * The token id.
     */
    tokenId: TokenId, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
