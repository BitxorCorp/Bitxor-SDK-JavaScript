import { PublicAccount } from '../account';
import { NetworkType } from '../network';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { LinkAction } from './LinkAction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class VotingKeyLinkTransaction extends Transaction {
    readonly linkedPublicKey: string;
    readonly startEpoch: number;
    readonly endEpoch: number;
    readonly linkAction: LinkAction;
    /**
     * Create a voting key link transaction object
     * @param deadline - The deadline to include the transaction.
     * @param linkedPublicKey - The public key for voting (48 bytes).
     * @param startEpoch - The start finalization point.
     * @param endEpoch - The end finalization point.
     * @param linkAction - The account link action.
     * @param networkType - the network type.
     * @param version - The version of the transaction. Depending on the server distribution it could be 1 or 2.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {VotingKeyLinkTransaction}
     */
    static create(deadline: Deadline, linkedPublicKey: string, startEpoch: number, endEpoch: number, linkAction: LinkAction, networkType: NetworkType, version: number, maxFee?: UInt64, signature?: string, signer?: PublicAccount): VotingKeyLinkTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param linkedPublicKey The public key of the remote account.
     * @param startEpoch The start finalization point.
     * @param endEpoch The start finalization point.
     * @param linkAction The account link action.
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, linkedPublicKey: string, startEpoch: number, endEpoch: number, linkAction: LinkAction, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
