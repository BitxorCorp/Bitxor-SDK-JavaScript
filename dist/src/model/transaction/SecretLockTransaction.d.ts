import { PublicAccount } from '../account/PublicAccount';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { LockHashAlgorithm } from '../lock/LockHashAlgorithm';
import { NetworkType } from '../network/NetworkType';
import { Token } from '../token/Token';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class SecretLockTransaction extends Transaction {
    /**
     * The locked token.
     */
    readonly token: Token;
    /**
     * The duration for the funds to be released or returned.
     */
    readonly duration: UInt64;
    /**
     * The hash algorithm, secret is generated with.
     */
    readonly hashAlgorithm: LockHashAlgorithm;
    /**
     * The proof hashed.
     */
    readonly secret: string;
    /**
     * The unresolved recipientAddress of the funds.
     */
    readonly recipientAddress: UnresolvedAddress;
    /**
     * Create a secret lock transaction object.
     *
     * @param deadline - The deadline to include the transaction.
     * @param token - The locked token.
     * @param duration - The funds lock duration.
     * @param hashAlgorithm - The hash algorithm secret is generated with.
     * @param secret - The proof hashed.
     * @param recipientAddress - The unresolved recipient address of the funds.
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @return a SecretLockTransaction instance
     */
    static create(deadline: Deadline, token: Token, duration: UInt64, hashAlgorithm: LockHashAlgorithm, secret: string, recipientAddress: UnresolvedAddress, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): SecretLockTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param token
     * @param duration
     * @param hashAlgorithm
     * @param secret
     * @param recipientAddress
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, maxFee: UInt64, 
    /**
     * The locked token.
     */
    token: Token, 
    /**
     * The duration for the funds to be released or returned.
     */
    duration: UInt64, 
    /**
     * The hash algorithm, secret is generated with.
     */
    hashAlgorithm: LockHashAlgorithm, 
    /**
     * The proof hashed.
     */
    secret: string, 
    /**
     * The unresolved recipientAddress of the funds.
     */
    recipientAddress: UnresolvedAddress, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
    /**
     * Create a transaction object from payload
     * @param {string} payload Binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction}
     */
    static createFromPayload(payload: string, isEmbedded?: boolean): Transaction | InnerTransaction;
    /**
     * @description Get secret bytes
     * @returns {Uint8Array}
     * @memberof SecretLockTransaction
     */
    getSecretByte(): Uint8Array;
}
