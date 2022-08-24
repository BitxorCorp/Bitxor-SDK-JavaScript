import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Announce an namespace metadata transaction to associate a key-value state to an account.
 */
export declare class NamespaceMetadataTransaction extends Transaction {
    /**
     * target account address.
     */
    readonly targetAddress: UnresolvedAddress;
    /**
     * Metadata key scoped to source, target and type.
     */
    readonly scopedMetadataKey: UInt64;
    /**
     * Target namespace identifier.
     */
    readonly targetNamespaceId: NamespaceId;
    /**
     * Change in value size in bytes.
     */
    readonly valueSizeDelta: number;
    /**
     * xor of previous and the new value
     * Difference between the previous value and new value.
     */
    readonly value: Uint8Array;
    /**
     * Create a token meta data transaction object
     * @param deadline - transaction deadline
     * @param targetAddress - target account address.
     * @param scopedMetadataKey - Metadata key scoped to source, target and type.
     * @param targetNamespaceId - Target namespace identifier.
     * @param valueSizeDelta - Change in value size in bytes.
     * @param value - Difference between the previous value and new value.
     *                You can calculate value as xor(previous-value, new-value).
     *                If there is no previous value, use directly the new value.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {NamespaceMetadataTransaction}
     */
    static create(deadline: Deadline, targetAddress: UnresolvedAddress, scopedMetadataKey: UInt64, targetNamespaceId: NamespaceId, valueSizeDelta: number, value: Uint8Array, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): NamespaceMetadataTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param targetAddress
     * @param scopedMetadataKey
     * @param targetNamespaceId
     * @param valueSizeDelta
     * @param value
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * target account address.
     */
    targetAddress: UnresolvedAddress, 
    /**
     * Metadata key scoped to source, target and type.
     */
    scopedMetadataKey: UInt64, 
    /**
     * Target namespace identifier.
     */
    targetNamespaceId: NamespaceId, 
    /**
     * Change in value size in bytes.
     */
    valueSizeDelta: number, 
    /**
     * xor of previous and the new value
     * Difference between the previous value and new value.
     */
    value: Uint8Array, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
}
