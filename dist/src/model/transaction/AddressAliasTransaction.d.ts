import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * In case a token has the flag 'supplyMutable' set to true, the creator of the token can change the supply,
 * i.e. increase or decrease the supply.
 */
export declare class AddressAliasTransaction extends Transaction {
    /**
     * The alias action type.
     */
    readonly aliasAction: AliasAction;
    /**
     * The namespace id that will be an alias.
     */
    readonly namespaceId: NamespaceId;
    /**
     * The address.
     */
    readonly address: Address;
    /**
     * Create a address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The alias action type.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AddressAliasTransaction}
     */
    static create(deadline: Deadline, aliasAction: AliasAction, namespaceId: NamespaceId, address: Address, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AddressAliasTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param aliasAction
     * @param namespaceId
     * @param address
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
     * The address.
     */
    address: Address, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
