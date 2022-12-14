"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalBlockInfo = void 0;
/**
 * The normal block info structure describes basic information of a block.
 */
class NormalBlockInfo {
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
    recordId, 
    /**
     * Entity size in bytes.
     */
    size, 
    /**
     * The block hash.
     */
    hash, 
    /**
     * The generation hash
     */
    generationHash, 
    /**
     * The sum of all transaction fees included in the block.
     */
    totalFee, 
    /**
     * State hash sub cache merkle roots
     */
    stateHashSubCacheMerkleRoots, 
    /**
     * The total number of transactions confirmed (including embedded transaction) included.
     */
    totalTransactionsCount, 
    /**
     * The block signature.
     * The signature was generated by the signer and can be used to validate that the blockchain
     * data was not modified by a node.
     */
    signature, 
    /**
     * The public account of block harvester.
     */
    signer, 
    /**
     * The network type.
     */
    networkType, 
    /**
     * The transaction version.
     */
    version, 
    /**
     * The block type.
     */
    type, 
    /**
     * The height of which the block was confirmed.
     * Each block has a unique height. Subsequent blocks differ in height by 1.
     */
    height, 
    /**
     * The number of milliseconds elapsed since the creation of the genesis blockchain.
     */
    timestamp, 
    /**
     * The POI difficulty to harvest a block.
     */
    difficulty, 
    /**
     * The feeMultiplier defined by the harvester.
     */
    feeMultiplier, 
    /**
     * The last block hash.
     */
    previousBlockHash, 
    /**
     * The block transaction hash.
     */
    blockTransactionsHash, 
    /**
     * The block receipt hash.
     */
    blockReceiptsHash, 
    /**
     * The state hash.
     */
    stateHash, 
    /**
     * The proof gamma.
     */
    proofGamma, 
    /**
     * The proof scalar.
     */
    proofScalar, 
    /**
     * The proof verification hash.
     */
    proofVerificationHash, 
    /**
     * The beneficiary address.
     */
    beneficiaryAddress, 
    /**
     * The number of statements confiemd (excluding embedded transaction) included.
     */
    transactionsCount, 
    /**
     * The number of statements included.
     */
    statementsCount) {
        this.recordId = recordId;
        this.size = size;
        this.hash = hash;
        this.generationHash = generationHash;
        this.totalFee = totalFee;
        this.stateHashSubCacheMerkleRoots = stateHashSubCacheMerkleRoots;
        this.totalTransactionsCount = totalTransactionsCount;
        this.signature = signature;
        this.signer = signer;
        this.networkType = networkType;
        this.version = version;
        this.type = type;
        this.height = height;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.feeMultiplier = feeMultiplier;
        this.previousBlockHash = previousBlockHash;
        this.blockTransactionsHash = blockTransactionsHash;
        this.blockReceiptsHash = blockReceiptsHash;
        this.stateHash = stateHash;
        this.proofGamma = proofGamma;
        this.proofScalar = proofScalar;
        this.proofVerificationHash = proofVerificationHash;
        this.beneficiaryAddress = beneficiaryAddress;
        this.transactionsCount = transactionsCount;
        this.statementsCount = statementsCount;
    }
}
exports.NormalBlockInfo = NormalBlockInfo;
//# sourceMappingURL=NomalBlockInfo.js.map