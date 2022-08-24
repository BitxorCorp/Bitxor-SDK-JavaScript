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
exports.BlockService = void 0;
const js_sha3_1 = require("js-sha3");
const merkletreejs_1 = require("merkletreejs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const TransactionPaginationStreamer_1 = require("../infrastructure/paginationStreamer/TransactionPaginationStreamer");
const TransactionGroup_1 = require("../infrastructure/TransactionGroup");
const MerklePosition_1 = require("../model/blockchain/MerklePosition");
/**
 * Block Service
 */
class BlockService {
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.blockRepository = repositoryFactory.createBlockRepository();
        this.transactionRepository = repositoryFactory.createTransactionRepository();
    }
    /**
     * Validate transaction hash in block
     * @param leaf transaction hash
     * @param height block height
     */
    validateTransactionInBlock(leaf, height) {
        const rootHashObservable = this.blockRepository.getBlockByHeight(height);
        const merklePathItemObservable = this.blockRepository.getMerkleTransaction(height, leaf);
        return (0, rxjs_1.combineLatest)([rootHashObservable, merklePathItemObservable])
            .pipe((0, operators_1.map)((combined) => this.validateInBlock(leaf, combined[1].merklePath, combined[0].blockTransactionsHash)))
            .pipe((0, operators_1.catchError)(() => (0, rxjs_1.of)(false)));
    }
    /**
     * Validate statement hash in block
     * @param leaf statement hash
     * @param height block height
     */
    validateStatementInBlock(leaf, height) {
        const rootHashObservable = this.blockRepository.getBlockByHeight(height);
        const merklePathItemObservable = this.blockRepository.getMerkleReceipts(height, leaf);
        return (0, rxjs_1.combineLatest)([rootHashObservable, merklePathItemObservable])
            .pipe((0, operators_1.map)((combined) => this.validateInBlock(leaf, combined[1].merklePath, combined[0].blockReceiptsHash)))
            .pipe((0, operators_1.catchError)(() => (0, rxjs_1.of)(false)));
    }
    /**
     * Calculate transactions merkle root hash from a block
     * @param height block height
     * @returns root hash
     */
    calculateTransactionsMerkleRootHash(height) {
        const streamer = new TransactionPaginationStreamer_1.TransactionPaginationStreamer(this.transactionRepository);
        return streamer
            .search({ group: TransactionGroup_1.TransactionGroup.Confirmed, height: height })
            .pipe((0, operators_1.map)((t) => ({ index: t.transactionInfo.index, hash: t.transactionInfo.hash })))
            .pipe((0, operators_1.toArray)())
            .pipe((0, operators_1.map)((transactions) => this.getTransacactionMerkleRoot(transactions).toUpperCase()));
    }
    /**
     * @internal
     * Validate leaf against merkle tree in block
     * @param leaf Leaf hash in merkle tree
     * @param merklePathItem Merkle path item array
     * @param rootHash Block root hash
     */
    validateInBlock(leaf, merklePathItem = [], rootHash) {
        if (merklePathItem.length === 0) {
            return leaf.toUpperCase() === rootHash.toUpperCase();
        }
        const rootToCompare = merklePathItem.reduce((proofHash, pathItem) => {
            const hasher = js_sha3_1.sha3_256.create();
            // Left
            if (pathItem.position !== undefined && pathItem.position === MerklePosition_1.MerklePosition.Left) {
                return hasher.update(Buffer.from(pathItem.hash + proofHash, 'hex')).hex();
            }
            else {
                // Right
                return hasher.update(Buffer.from(proofHash + pathItem.hash, 'hex')).hex();
            }
        }, leaf);
        return rootToCompare.toUpperCase() === rootHash.toUpperCase();
    }
    /**
     * @internal
     * Create merkle root hash for block transactions
     * @param transactions Block transactions
     * @returns calculated root hash
     */
    getTransacactionMerkleRoot(transactions) {
        const leaves = transactions.sort((n1, n2) => n1.index - n2.index).map((transaction) => transaction.hash);
        const tree = new merkletreejs_1.default(leaves, js_sha3_1.sha3_256, {
            duplicateOdd: true,
            hashLeaves: false,
            sort: false,
            sortLeaves: false,
            sortPairs: false,
            isBitcoinTree: false,
        });
        return tree.getRoot().toString('hex');
    }
}
exports.BlockService = BlockService;
//# sourceMappingURL=BlockService.js.map