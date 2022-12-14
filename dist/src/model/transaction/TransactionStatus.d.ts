import { TransactionGroupEnum, TransactionStatusEnum } from 'bitxor-openapi-typescript-fetch-client';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
/**
 * Transaction status contains basic of a transaction announced to the blockchain.
 */
export declare class TransactionStatus {
    /**
     * The transaction status group "failed", "unconfirmed", "confirmed", etc...
     */
    readonly group: TransactionGroupEnum;
    /**
     * The transaction hash.
     */
    readonly hash: string;
    /**
     * The transaction deadline.
     */
    readonly deadline: Deadline;
    /**
     * The transaction status code being the error name in case of failure and success otherwise.
     */
    readonly code?: TransactionStatusEnum | undefined;
    /**
     * The height of the block at which it was confirmed or rejected.
     */
    readonly height?: UInt64 | undefined;
    /**
     * @param group
     * @param code
     * @param hash
     * @param deadline
     * @param height
     */
    constructor(
    /**
     * The transaction status group "failed", "unconfirmed", "confirmed", etc...
     */
    group: TransactionGroupEnum, 
    /**
     * The transaction hash.
     */
    hash: string, 
    /**
     * The transaction deadline.
     */
    deadline: Deadline, 
    /**
     * The transaction status code being the error name in case of failure and success otherwise.
     */
    code?: TransactionStatusEnum | undefined, 
    /**
     * The height of the block at which it was confirmed or rejected.
     */
    height?: UInt64 | undefined);
}
