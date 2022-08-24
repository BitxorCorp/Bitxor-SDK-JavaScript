import { Address } from '../../model/account/Address';
import { NamespaceId } from '../../model/namespace/NamespaceId';
import { ReceiptType } from '../../model/receipt/ReceiptType';
import { TokenId } from '../../model/token/TokenId';
import { UInt64 } from '../../model/UInt64';
import { SearchCriteria } from './SearchCriteria';
/**
 * Defines the params used to search transaction statement receipts. With this criteria, you can sort and filter
 * receipt queries using rest.
 */
export interface TransactionStatementSearchCriteria extends SearchCriteria {
    /**
     * Block height. (optional)
     */
    height?: UInt64;
    /**
     * From block height. (optional)
     */
    fromHeight?: UInt64;
    /**
     * To block height. (optional)
     */
    toHeight?: UInt64;
    /**
     * receipt types. (optional, TransactionStatement only)
     */
    receiptTypes?: ReceiptType[];
    /**
     * Recipient address. (optional, TransactionStatement only)
     */
    recipientAddress?: Address;
    /**
     * Sender address. (optional, TransactionStatement only)
     */
    senderAddress?: Address;
    /**
     * Target address. (optional, TransactionStatement only)
     */
    targetAddress?: Address;
    /**
     * Artifact id. (optional, TransactionStatement only)
     */
    artifactId?: TokenId | NamespaceId;
}
