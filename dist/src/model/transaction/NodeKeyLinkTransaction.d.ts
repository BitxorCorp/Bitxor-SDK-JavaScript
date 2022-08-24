import { PublicAccount } from '../account';
import { NetworkType } from '../network';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { LinkAction } from './LinkAction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class NodeKeyLinkTransaction extends Transaction {
    /**
     * The public key of the remote account.
     */
    readonly linkedPublicKey: string;
    /**
     * The account link action.
     */
    readonly linkAction: LinkAction;
    /**
     * Create a node key link transaction object
     * @param deadline - The deadline to include the transaction.
     * @param linkedPublicKey - The linked public key.
     * @param linkAction - The account link action.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {NodeKeyLinkTransaction}
     */
    static create(deadline: Deadline, linkedPublicKey: string, linkAction: LinkAction, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): NodeKeyLinkTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param linkedPublicKey
     * @param linkAction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The public key of the remote account.
     */
    linkedPublicKey: string, 
    /**
     * The account link action.
     */
    linkAction: LinkAction, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
