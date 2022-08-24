import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { AliasAction } from '../namespace/AliasAction';
import { NamespaceId } from '../namespace/NamespaceId';
import { NetworkType } from '../network/NetworkType';
import { TokenId } from '../token/TokenId';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Transaction } from './Transaction';
export declare abstract class AliasTransaction extends Transaction {
    /**
     * Create an address alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param address - The address.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {AddressAliasTransaction}
     */
    static createForAddress(deadline: Deadline, aliasAction: AliasAction, namespaceId: NamespaceId, address: Address, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AliasTransaction;
    /**
     * Create a token alias transaction object
     * @param deadline - The deadline to include the transaction.
     * @param aliasAction - The namespace id.
     * @param namespaceId - The namespace id.
     * @param tokenId - The token id.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TokenAliasTransaction}
     */
    static createForToken(deadline: Deadline, aliasAction: AliasAction, namespaceId: NamespaceId, tokenId: TokenId, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): AliasTransaction;
}
