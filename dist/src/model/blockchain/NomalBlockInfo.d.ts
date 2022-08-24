import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { UInt64 } from '../UInt64';
import { BlockType } from './BlockType';
/**
 * The normal block info structure describes basic information of a block.
 */
export declare class NormalBlockInfo {
    /**
     * The database record id.
     */
    readonly recordId: string;
    /**
     * Entity size in bytes.
     */
    readonly size: number;
    /**
     * The block hash.
     */
    readonly hash: string;
    /**
     * The generation hash
     */
    readonly generationHash: string;
    /**
     * The sum of all transaction fees included in the block.
     */
    readonly totalFee: UInt64;
    /**
     * State hash sub cache merkle roots
     */
    readonly stateHashSubCacheMerkleRoots: string[];
    /**
     * The total number of transactions confirmed (including embedded transaction) included.
     */
    readonly totalTransactionsCount: number;
    /**
     * The block signature.
     * The signature was generated by the signer and can be used to validate that the blockchain
     * data was not modified by a node.
     */
    readonly signature: string;
    /**
     * The public account of block harvester.
     */
    readonly signer: PublicAccount;
    /**
     * The network type.
     */
    readonly networkType: NetworkType;
    /**
     * The transaction version.
     */
    readonly version: number;
    /**
     * The block type.
     */
    readonly type: BlockType;
    /**
     * The height of which the block was confirmed.
     * Each block has a unique height. Subsequent blocks differ in height by 1.
     */
    readonly height: UInt64;
    /**
     * The number of milliseconds elapsed since the creation of the genesis blockchain.
     */
    readonly timestamp: UInt64;
    /**
     * The POI difficulty to harvest a block.
     */
    readonly difficulty: UInt64;
    /**
     * The feeMultiplier defined by the harvester.
     */
    readonly feeMultiplier: number;
    /**
     * The last block hash.
     */
    readonly previousBlockHash: string;
    /**
     * The block transaction hash.
     */
    readonly blockTransactionsHash: string;
    /**
     * The block receipt hash.
     */
    readonly blockReceiptsHash: string;
    /**
     * The state hash.
     */
    readonly stateHash: string;
    /**
     * The proof gamma.
     */
    readonly proofGamma: string;
    /**
     * The proof scalar.
     */
    readonly proofScalar: string;
    /**
     * The proof verification hash.
     */
    readonly proofVerificationHash: string;
    /**
     * The beneficiary address.
     */
    readonly beneficiaryAddress: Address;
    /**
     * The number of statements confiemd (excluding embedded transaction) included.
     */
    readonly transactionsCount: number;
    /**
     * The number of statements included.
     */
    readonly statementsCount: number;
    /**
     * @param recordId
     * @param size
     * @param hash
     * @param generationHash
     * @param totalFee
     * @param stateHashSubCacheMerkleRoots
     * @param totalTransactionsCount
     * @param signature
     * @param signer
     * @param networkType
     * @param version
     * @param type
     * @param height
     * @param timestamp
     * @param difficulty
     * @param proofGamma
     * @param proofScalar
     * @param proofVerificationHash
     * @param feeMultiplier
     * @param previousBlockHash
     * @param blockTransactionsHash
     * @param blockReceiptsHash
     * @param blockStateHash
     * @param beneficiaryAddress
     * @param transactionsCount
     * @param statementsCount
     */
    constructor(
    /**
     * The database record id.
     */
    recordId: string, 
    /**
     * Entity size in bytes.
     */
    size: number, 
    /**
     * The block hash.
     */
    hash: string, 
    /**
     * The generation hash
     */
    generationHash: string, 
    /**
     * The sum of all transaction fees included in the block.
     */
    totalFee: UInt64, 
    /**
     * State hash sub cache merkle roots
     */
    stateHashSubCacheMerkleRoots: string[], 
    /**
     * The total number of transactions confirmed (including embedded transaction) included.
     */
    totalTransactionsCount: number, 
    /**
     * The block signature.
     * The signature was generated by the signer and can be used to validate that the blockchain
     * data was not modified by a node.
     */
    signature: string, 
    /**
     * The public account of block harvester.
     */
    signer: PublicAccount, 
    /**
     * The network type.
     */
    networkType: NetworkType, 
    /**
     * The transaction version.
     */
    version: number, 
    /**
     * The block type.
     */
    type: BlockType, 
    /**
     * The height of which the block was confirmed.
     * Each block has a unique height. Subsequent blocks differ in height by 1.
     */
    height: UInt64, 
    /**
     * The number of milliseconds elapsed since the creation of the genesis blockchain.
     */
    timestamp: UInt64, 
    /**
     * The POI difficulty to harvest a block.
     */
    difficulty: UInt64, 
    /**
     * The feeMultiplier defined by the harvester.
     */
    feeMultiplier: number, 
    /**
     * The last block hash.
     */
    previousBlockHash: string, 
    /**
     * The block transaction hash.
     */
    blockTransactionsHash: string, 
    /**
     * The block receipt hash.
     */
    blockReceiptsHash: string, 
    /**
     * The state hash.
     */
    stateHash: string, 
    /**
     * The proof gamma.
     */
    proofGamma: string, 
    /**
     * The proof scalar.
     */
    proofScalar: string, 
    /**
     * The proof verification hash.
     */
    proofVerificationHash: string, 
    /**
     * The beneficiary address.
     */
    beneficiaryAddress: Address, 
    /**
     * The number of statements confiemd (excluding embedded transaction) included.
     */
    transactionsCount: number, 
    /**
     * The number of statements included.
     */
    statementsCount: number);
}