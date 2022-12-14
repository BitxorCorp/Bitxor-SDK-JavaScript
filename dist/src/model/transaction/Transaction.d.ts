import { PublicAccount } from '../account';
import { NetworkType } from '../network';
import { UInt64 } from '../UInt64';
import { AggregateTransactionInfo } from './AggregateTransactionInfo';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * An abstract transaction class that serves as the base class of all Bitxor transactions.
 */
export declare abstract class Transaction {
    /**
     * The transaction type.
     */
    readonly type: number;
    /**
     * The network type.
     */
    readonly networkType: NetworkType;
    /**
     * The transaction version number.
     */
    readonly version: number;
    /**
     * The deadline to include the transaction.
     */
    readonly deadline: Deadline;
    /**
     * A sender of a transaction must specify during the transaction definition a max_fee,
     * meaning the maximum fee the account allows to spend for this transaction.
     */
    readonly maxFee: UInt64;
    /**
     * The transaction signature (missing if part of an aggregate transaction).
     */
    readonly signature?: string | undefined;
    /**
     * The account of the transaction creator.
     */
    readonly signer?: PublicAccount | undefined;
    /**
     * Transactions meta data object contains additional information about the transaction.
     */
    readonly transactionInfo?: TransactionInfo | AggregateTransactionInfo | undefined;
    /**
     * Transaction payload size
     */
    private payloadSize?;
    /**
     * Transaction header size
     *
     * Included fields are `size`, `verifiableEntityHeader_Reserved1`,
     * `signature`, `signerPublicKey` and `entityBody_Reserved1`.
     *
     * @var {number}
     */
    static readonly Header_Size: number;
    /**
     * Index of the transaction *type*
     *
     * Included fields are the transaction header, `version`
     * and `network`
     *
     * @var {number}
     */
    static readonly Type_Index: number;
    /**
     * Index of the transaction *body*
     *
     * Included fields are the transaction header, `version`,
     * `network`, `type`, `maxFee` and `deadline`
     *
     * @var {number}
     */
    static readonly Body_Index: number;
    /**
     * @constructor
     * @param type
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(
    /**
     * The transaction type.
     */
    type: number, 
    /**
     * The network type.
     */
    networkType: NetworkType, 
    /**
     * The transaction version number.
     */
    version: number, 
    /**
     * The deadline to include the transaction.
     */
    deadline: Deadline, 
    /**
     * A sender of a transaction must specify during the transaction definition a max_fee,
     * meaning the maximum fee the account allows to spend for this transaction.
     */
    maxFee: UInt64, 
    /**
     * The transaction signature (missing if part of an aggregate transaction).
     */
    signature?: string | undefined, 
    /**
     * The account of the transaction creator.
     */
    signer?: PublicAccount | undefined, 
    /**
     * Transactions meta data object contains additional information about the transaction.
     */
    transactionInfo?: TransactionInfo | AggregateTransactionInfo | undefined);
    /**
     * Generate transaction hash hex
     *
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/EntityHasher.cpp#L32
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/EntityHasher.cpp#L35
     * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/sdk/src/extensions/TransactionExtensions.cpp#L46
     * @param {string} transactionPayload HexString Payload
     * @param {Array<number>} generationHashBuffer Network generation hash byte
     * @returns {string} Returns Transaction Payload hash
     */
    static createTransactionHash(transactionPayload: string, generationHashBuffer: number[]): string;
    /**
     * Set transaction maxFee using fee multiplier for **ONLY NONE AGGREGATE TRANSACTIONS**
     * @param feeMultiplier The fee multiplier
     * @returns {TransferTransaction}
     */
    setMaxFee(feeMultiplier: number): Transaction;
    /**
     * Signs raw transaction with the given private key
     * @param {string} privateKey - Private key of the signer account
     * @param {Uint8Array} rawTransactionSigningBytes - Raw transaction siging bytes
     * @returns {Uint8Array} Signature byte array
     */
    static signRawTransaction(privateKey: string, rawTransactionSigningBytes: Uint8Array): Uint8Array;
    /**
     * Prepares and return signed payload
     * @param {Uint8Array} serializedTransaction Serialized transaction
     * @param {Uint8Array} signature Signature of the transaction
     * @param {string} publicKey Public key of the signing account
     * @returns {string} Payload (ready to be announced)
     */
    static preparePayload(serializedTransaction: Uint8Array, signature: Uint8Array, publicKey: string): string;
    /**
     * Generate signing bytes
     * @param payloadBytes Payload buffer
     * @param generationHashBytes GenerationHash buffer
     * @return {number[]}
     */
    getSigningBytes(payloadBytes: number[], generationHashBytes: number[]): number[];
    /**
     * Converts the transaction into AggregateTransaction compatible
     * @returns {Array.<*>} AggregateTransaction bytes
     */
    aggregateTransaction(): number[];
    /**
     * Convert an aggregate transaction to an inner transaction including transaction signer.
     * Signer is optional for `AggregateComplete` transaction `ONLY`.
     * If no signer provided, aggregate transaction signer will be delegated on signing
     * @param signer - Innre transaction signer.
     * @returns InnerTransaction
     */
    toAggregate(signer: PublicAccount): InnerTransaction;
    /**
     * Transaction pending to be included in a block
     * @returns {boolean}
     */
    isUnconfirmed(): boolean;
    /**
     * Transaction included in a block
     * @returns {boolean}
     */
    isConfirmed(): boolean;
    /**
     * Returns if a transaction has missing signatures.
     * @returns {boolean}
     */
    hasMissingSignatures(): boolean;
    /**
     * Transaction is not known by the network
     * @return {boolean}
     */
    isUnannounced(): boolean;
    /**
     * @description reapply a given value to the transaction in an immutable way
     * @param {Deadline} deadline
     * @returns {Transaction}
     * @memberof Transaction
     */
    reapplyGiven(deadline: Deadline): Transaction;
    /**
     * @override Transaction.size()
     * @description get the byte size of a transaction using the builder
     * @returns {number}
     * @memberof TransferTransaction
     */
    get size(): number;
    /**
     * @description Serialize a transaction object
     * @returns {string}
     * @memberof Transaction
     */
    serialize(): string;
    /**
     * @description Create JSON object
     * @returns {Object}
     * @memberof Transaction
     */
    toJSON(): any;
}
