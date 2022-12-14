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
exports.NetworkHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const operators_1 = require("rxjs/operators");
const AccountLinkNetworkProperties_1 = require("../model/network/AccountLinkNetworkProperties");
const AccountRestrictionNetworkProperties_1 = require("../model/network/AccountRestrictionNetworkProperties");
const AggregateNetworkProperties_1 = require("../model/network/AggregateNetworkProperties");
const ChainProperties_1 = require("../model/network/ChainProperties");
const HashLockNetworkProperties_1 = require("../model/network/HashLockNetworkProperties");
const MetadataNetworkProperties_1 = require("../model/network/MetadataNetworkProperties");
const MultisigNetworkProperties_1 = require("../model/network/MultisigNetworkProperties");
const NamespaceNetworkProperties_1 = require("../model/network/NamespaceNetworkProperties");
const NetworkConfiguration_1 = require("../model/network/NetworkConfiguration");
const NetworkName_1 = require("../model/network/NetworkName");
const NetworkProperties_1 = require("../model/network/NetworkProperties");
const PluginProperties_1 = require("../model/network/PluginProperties");
const RentalFees_1 = require("../model/network/RentalFees");
const SecretLockNetworkProperties_1 = require("../model/network/SecretLockNetworkProperties");
const TokenNetworkProperties_1 = require("../model/network/TokenNetworkProperties");
const TokenRestrictionNetworkProperties_1 = require("../model/network/TokenRestrictionNetworkProperties");
const TransactionFees_1 = require("../model/network/TransactionFees");
const TransferNetworkProperties_1 = require("../model/network/TransferNetworkProperties");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const NodeHttp_1 = require("./NodeHttp");
/**
 * Network http repository.
 *
 * @since 1.0
 */
class NetworkHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.nodeHttp = new NodeHttp_1.NodeHttp(url, fetchApi);
        this.networkRoutesApi = new bitxor_openapi_typescript_fetch_client_1.NetworkRoutesApi(this.config());
    }
    /**
     * Get current network identifier.
     *
     * @return network identifier.
     */
    getNetworkType() {
        return this.nodeHttp.getNodeInfo().pipe((0, operators_1.map)((nodeInfo) => nodeInfo.networkIdentifier));
    }
    /**
     * Get current network type name and description
     *
     * @return current network type name and description
     */
    getNetworkName() {
        return this.call(this.networkRoutesApi.getNetworkType(), (body) => new NetworkName_1.NetworkName(body.name, body.description));
    }
    /**
     * Returns the content from a bitxorcore-server network configuration file (resources/config-network.properties).
     * To enable this feature, the REST setting \"network.propertiesFilePath\" must define where the file is located.
     * This is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
     * @summary Get the network properties
     */
    getNetworkProperties() {
        return this.call(this.networkRoutesApi.getNetworkProperties(), (body) => this.mapNetworkConfigurationDto(body));
    }
    /**
     * Returns the estimated effective rental fees for namespaces and tokens. This endpoint is only available
     * if the REST instance has access to bitxorcore-server ``resources/config-network.properties`` file.
     * To activate this feature, add the setting \"network.propertiesFilePath\" in the configuration file (rest/resources/rest.json).
     * @summary Get rental fees information
     */
    getRentalFees() {
        return this.call(this.networkRoutesApi.getRentalFees(), (body) => new RentalFees_1.RentalFees(UInt64_1.UInt64.fromNumericString(body.effectiveRootNamespaceRentalFeePerBlock), UInt64_1.UInt64.fromNumericString(body.effectiveRootNamespaceEternalFee), UInt64_1.UInt64.fromNumericString(body.effectiveChildNamespaceRentalFee), UInt64_1.UInt64.fromNumericString(body.effectiveTokenRentalFee)));
    }
    /**
     * Returns information about the average, median, highest and lower fee multiplier over the last
     * \"numBlocksTransactionFeeStats\". The setting \"numBlocksTransactionFeeStats\" is adjustable
     * via a configuration file (rest/resources/rest.json) per REST instance.
     * @summary Get transaction fees information
     */
    getTransactionFees() {
        return this.call(this.networkRoutesApi.getTransactionFees(), (body) => new TransactionFees_1.TransactionFees(body.averageFeeMultiplier, body.medianFeeMultiplier, body.highestFeeMultiplier, body.lowestFeeMultiplier, body.minFeeMultiplier));
    }
    /**
     * Map dto to sdk models
     * @param dto dto object returned from rest
     */
    mapNetworkConfigurationDto(dto) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
        return new NetworkConfiguration_1.NetworkConfiguration(new NetworkProperties_1.NetworkProperties(dto.network.identifier, dto.network.nodeEqualityStrategy, dto.network.genesisSignerPublicKey, dto.network.generationHashSeed, dto.network.epochAdjustment), new ChainProperties_1.ChainProperties(dto.chain.enableVerifiableState, dto.chain.enableVerifiableReceipts, dto.chain.currencyTokenId, dto.chain.harvestingTokenId, dto.chain.blockGenerationTargetTime, dto.chain.blockTimeSmoothingFactor, dto.chain.blockFinalizationInterval, dto.chain.importanceGrouping, dto.chain.importanceActivityPercentage, dto.chain.maxRollbackBlocks, dto.chain.maxDifficultyBlocks, dto.chain.defaultDynamicFeeMultiplier, dto.chain.maxTransactionLifetime, dto.chain.maxBlockFutureTime, dto.chain.initialCurrencyAtomicUnits, dto.chain.maxTokenAtomicUnits, dto.chain.totalChainImportance, dto.chain.minHarvesterBalance, dto.chain.maxHarvesterBalance, dto.chain.minVoterBalance, dto.chain.maxVotingKeysPerAccount, dto.chain.minVotingKeyLifetime, dto.chain.maxVotingKeyLifetime, dto.chain.harvestBeneficiaryPercentage, dto.chain.harvestNetworkPercentage, dto.chain.harvestNetworkFeeSinkAddress, dto.chain.blockPruneInterval, dto.chain.maxTransactionsPerBlock), new PluginProperties_1.PluginProperties(new AccountLinkNetworkProperties_1.AccountLinkNetworkProperties((_a = dto.plugins.accountlink) === null || _a === void 0 ? void 0 : _a.dummy), new AggregateNetworkProperties_1.AggregateNetworkProperties((_b = dto.plugins.aggregate) === null || _b === void 0 ? void 0 : _b.maxTransactionsPerAggregate, (_c = dto.plugins.aggregate) === null || _c === void 0 ? void 0 : _c.maxCosignaturesPerAggregate, (_d = dto.plugins.aggregate) === null || _d === void 0 ? void 0 : _d.enableStrictCosignatureCheck, (_e = dto.plugins.aggregate) === null || _e === void 0 ? void 0 : _e.enableBondedAggregateSupport, (_f = dto.plugins.aggregate) === null || _f === void 0 ? void 0 : _f.maxBondedTransactionLifetime), new HashLockNetworkProperties_1.HashLockNetworkProperties((_g = dto.plugins.lockhash) === null || _g === void 0 ? void 0 : _g.lockedFundsPerAggregate, (_h = dto.plugins.lockhash) === null || _h === void 0 ? void 0 : _h.maxHashLockDuration), new SecretLockNetworkProperties_1.SecretLockNetworkProperties((_j = dto.plugins.locksecret) === null || _j === void 0 ? void 0 : _j.maxSecretLockDuration, (_k = dto.plugins.locksecret) === null || _k === void 0 ? void 0 : _k.minProofSize, (_l = dto.plugins.locksecret) === null || _l === void 0 ? void 0 : _l.maxProofSize), new MetadataNetworkProperties_1.MetadataNetworkProperties((_m = dto.plugins.metadata) === null || _m === void 0 ? void 0 : _m.maxValueSize), new TokenNetworkProperties_1.TokenNetworkProperties((_o = dto.plugins.token) === null || _o === void 0 ? void 0 : _o.maxTokensPerAccount, (_p = dto.plugins.token) === null || _p === void 0 ? void 0 : _p.maxTokenDuration, (_q = dto.plugins.token) === null || _q === void 0 ? void 0 : _q.maxTokenDivisibility, (_r = dto.plugins.token) === null || _r === void 0 ? void 0 : _r.tokenRentalFeeSinkAddress, (_s = dto.plugins.token) === null || _s === void 0 ? void 0 : _s.tokenRentalFee), new MultisigNetworkProperties_1.MultisigNetworkProperties((_t = dto.plugins.multisig) === null || _t === void 0 ? void 0 : _t.maxMultisigDepth, (_u = dto.plugins.multisig) === null || _u === void 0 ? void 0 : _u.maxCosignatoriesPerAccount, (_v = dto.plugins.multisig) === null || _v === void 0 ? void 0 : _v.maxCosignedAccountsPerAccount), new NamespaceNetworkProperties_1.NamespaceNetworkProperties((_w = dto.plugins.namespace) === null || _w === void 0 ? void 0 : _w.maxNameSize, (_x = dto.plugins.namespace) === null || _x === void 0 ? void 0 : _x.maxChildNamespaces, (_y = dto.plugins.namespace) === null || _y === void 0 ? void 0 : _y.maxNamespaceDepth, (_z = dto.plugins.namespace) === null || _z === void 0 ? void 0 : _z.minNamespaceDuration, (_0 = dto.plugins.namespace) === null || _0 === void 0 ? void 0 : _0.maxNamespaceDuration, (_1 = dto.plugins.namespace) === null || _1 === void 0 ? void 0 : _1.namespaceGracePeriodDuration, (_2 = dto.plugins.namespace) === null || _2 === void 0 ? void 0 : _2.reservedRootNamespaceNames, (_3 = dto.plugins.namespace) === null || _3 === void 0 ? void 0 : _3.namespaceRentalFeeSinkAddress, (_4 = dto.plugins.namespace) === null || _4 === void 0 ? void 0 : _4.rootNamespaceRentalFeePerBlock, (_5 = dto.plugins.namespace) === null || _5 === void 0 ? void 0 : _5.childNamespaceRentalFee), new AccountRestrictionNetworkProperties_1.AccountRestrictionNetworkProperties((_6 = dto.plugins.restrictionaccount) === null || _6 === void 0 ? void 0 : _6.maxAccountRestrictionValues), new TokenRestrictionNetworkProperties_1.TokenRestrictionNetworkProperties((_7 = dto.plugins.restrictiontoken) === null || _7 === void 0 ? void 0 : _7.maxTokenRestrictionValues), new TransferNetworkProperties_1.TransferNetworkProperties((_8 = dto.plugins.transfer) === null || _8 === void 0 ? void 0 : _8.maxMessageSize)));
    }
}
exports.NetworkHttp = NetworkHttp;
//# sourceMappingURL=NetworkHttp.js.map