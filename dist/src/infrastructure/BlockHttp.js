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
exports.BlockHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const PublicAccount_1 = require("../model/account/PublicAccount");
const BlockType_1 = require("../model/blockchain/BlockType");
const MerklePathItem_1 = require("../model/blockchain/MerklePathItem");
const MerkleProofInfo_1 = require("../model/blockchain/MerkleProofInfo");
const NomalBlockInfo_1 = require("../model/blockchain/NomalBlockInfo");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Blockchain http repository.
 *
 * @since 1.0
 */
class BlockHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.blockRoutesApi = new bitxor_openapi_typescript_fetch_client_1.BlockRoutesApi(this.config());
    }
    /**
     * Gets a BlockInfo for a given block height
     * @param height - Block height
     * @returns Observable<BlockInfo>
     */
    getBlockByHeight(height) {
        return this.call(this.blockRoutesApi.getBlockByHeight(height.toString()), (body) => this.toBlockInfo(body));
    }
    /**
     * Gets an array of blocks.
     * @param criteria - Block search criteria
     * @returns Observable<BlockInfo[]>
     */
    search(criteria) {
        return this.call(this.blockRoutesApi.searchBlocks(criteria.signerPublicKey, criteria.beneficiaryAddress, criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order), DtoMapping_1.DtoMapping.mapEnum(criteria.orderBy)), (body) => super.toPage(body.pagination, body.data, this.toBlockInfo));
    }
    streamer() {
        return new paginationStreamer_1.BlockPaginationStreamer(this);
    }
    /**
     * This method maps a BlockInfoDTO from rest to the SDK's BlockInfo model object.
     *
     * @internal
     * @param {BlockInfoDTO} dto the dto object from rest.
     * @returns {BlockInfo} a BlockInfo model
     */
    toBlockInfo(dto) {
        var _a;
        const networkType = dto.block.network.valueOf();
        const blockType = dto.block.type;
        const normalBlock = new NomalBlockInfo_1.NormalBlockInfo((_a = dto.id) !== null && _a !== void 0 ? _a : '', dto.block.size, dto.meta.hash, dto.meta.generationHash, UInt64_1.UInt64.fromNumericString(dto.meta.totalFee), dto.meta.stateHashSubCacheMerkleRoots, dto.meta.totalTransactionsCount, dto.block.signature, PublicAccount_1.PublicAccount.createFromPublicKey(dto.block.signerPublicKey, networkType), networkType, dto.block.version, dto.block.type, UInt64_1.UInt64.fromNumericString(dto.block.height), UInt64_1.UInt64.fromNumericString(dto.block.timestamp), UInt64_1.UInt64.fromNumericString(dto.block.difficulty), dto.block.feeMultiplier, dto.block.previousBlockHash, dto.block.transactionsHash, dto.block.receiptsHash, dto.block.stateHash, dto.block.proofGamma, dto.block.proofScalar, dto.block.proofVerificationHash, DtoMapping_1.DtoMapping.toAddress(dto.block.beneficiaryAddress), dto.meta.transactionsCount, dto.meta.statementsCount);
        if (blockType === BlockType_1.BlockType.NormalBlock.valueOf()) {
            return normalBlock;
        }
        else if ([BlockType_1.BlockType.ImportanceBlock.valueOf(), BlockType_1.BlockType.GenesisBlock.valueOf()].includes(blockType)) {
            const importanceBlockInfoDto = dto.block;
            return DtoMapping_1.DtoMapping.assign(normalBlock, {
                votingEligibleAccountsCount: importanceBlockInfoDto.votingEligibleAccountsCount,
                harvestingEligibleAccountsCount: importanceBlockInfoDto.harvestingEligibleAccountsCount
                    ? UInt64_1.UInt64.fromNumericString(importanceBlockInfoDto.harvestingEligibleAccountsCount)
                    : undefined,
                totalVotingBalance: importanceBlockInfoDto.totalVotingBalance
                    ? UInt64_1.UInt64.fromNumericString(importanceBlockInfoDto.totalVotingBalance)
                    : undefined,
                previousImportanceBlockHash: importanceBlockInfoDto.previousImportanceBlockHash,
            });
        }
        else {
            throw new Error(`Block type: ${blockType} invalid.`);
        }
    }
    /**
     * Get the merkle path for a given a transaction and block
     * Returns the merkle path for a [transaction](https://bitxorcorp.github.io/concepts/transaction.html)
     * included in a block. The path is the complementary data needed to calculate the merkle root.
     * A client can compare if the calculated root equals the one recorded in the block header,
     * verifying that the transaction was included in the block.
     * @param height The height of the block.
     * @param hash The hash of the transaction.
     * @return Observable<MerkleProofInfo>
     */
    getMerkleTransaction(height, hash) {
        return this.call(this.blockRoutesApi.getMerkleTransaction(height.toString(), hash), (body) => new MerkleProofInfo_1.MerkleProofInfo(body.merklePath.map((payload) => new MerklePathItem_1.MerklePathItem(DtoMapping_1.DtoMapping.mapEnum(payload.position), payload.hash))));
    }
    /**
     * Get the merkle path for a given a receipt statement hash and block
     * Returns the merkle path for a [receipt statement or resolution](https://bitxorcorp.github.io/concepts/receipt.html)
     * linked to a block. The path is the complementary data needed to calculate the merkle root.
     * A client can compare if the calculated root equals the one recorded in the block header,
     * verifying that the receipt was linked with the block.
     * @param height The height of the block.
     * @param hash The hash of the receipt statement or resolution.
     * @return Observable<MerkleProofInfo>
     */
    getMerkleReceipts(height, hash) {
        return this.call(this.blockRoutesApi.getMerkleReceipts(height.toString(), hash), (body) => new MerkleProofInfo_1.MerkleProofInfo(body.merklePath.map((payload) => new MerklePathItem_1.MerklePathItem(DtoMapping_1.DtoMapping.mapEnum(payload.position), payload.hash))));
    }
}
exports.BlockHttp = BlockHttp;
//# sourceMappingURL=BlockHttp.js.map