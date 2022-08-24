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
exports.RepositoryFactoryHttp = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const CurrencyService_1 = require("../service/CurrencyService");
const AccountHttp_1 = require("./AccountHttp");
const BlockHttp_1 = require("./BlockHttp");
const ChainHttp_1 = require("./ChainHttp");
const FinalizationHttp_1 = require("./FinalizationHttp");
const HashLockHttp_1 = require("./HashLockHttp");
const Listener_1 = require("./Listener");
const MetadataHttp_1 = require("./MetadataHttp");
const MultisigHttp_1 = require("./MultisigHttp");
const NamespaceHttp_1 = require("./NamespaceHttp");
const NetworkHttp_1 = require("./NetworkHttp");
const NodeHttp_1 = require("./NodeHttp");
const ReceiptHttp_1 = require("./ReceiptHttp");
const RestrictionAccountHttp_1 = require("./RestrictionAccountHttp");
const RestrictionTokenHttp_1 = require("./RestrictionTokenHttp");
const SecretLockHttp_1 = require("./SecretLockHttp");
const TokenHttp_1 = require("./TokenHttp");
const TransactionHttp_1 = require("./TransactionHttp");
const TransactionStatusHttp_1 = require("./TransactionStatusHttp");
/**
 * Receipt http repository.
 *
 */
class RepositoryFactoryHttp {
    /**
     * Constructor
     * @param url the server url.
     * @param configs optional repository factory configs
     */
    constructor(url, configs) {
        this.url = url;
        this.fetchApi = configs === null || configs === void 0 ? void 0 : configs.fetchApi;
        const networkRepository = this.createNetworkRepository();
        this.networkType = (configs === null || configs === void 0 ? void 0 : configs.networkType) ? (0, rxjs_1.of)(configs.networkType) : this.cache(() => networkRepository.getNetworkType());
        this.networkProperties = this.cache(() => networkRepository.getNetworkProperties());
        this.epochAdjustment = (configs === null || configs === void 0 ? void 0 : configs.epochAdjustment)
            ? (0, rxjs_1.of)(configs.epochAdjustment)
            : this.cache(() => this.networkProperties.pipe((0, operators_1.map)((property) => {
                var _a;
                return DtoMapping_1.DtoMapping.parseServerDuration((_a = property.network.epochAdjustment) !== null && _a !== void 0 ? _a : '-').seconds();
            })));
        if ((configs === null || configs === void 0 ? void 0 : configs.generationHash) && (configs === null || configs === void 0 ? void 0 : configs.nodePublicKey)) {
            this.generationHash = (0, rxjs_1.of)(configs.generationHash);
            this.nodePublicKey = (0, rxjs_1.of)(configs.nodePublicKey);
        }
        else {
            const nodeInfoObservable = this.cache(() => this.createNodeRepository().getNodeInfo());
            this.generationHash = (0, rxjs_1.defer)(() => nodeInfoObservable.pipe((0, operators_1.map)((b) => b.networkGenerationHashSeed)));
            this.nodePublicKey = (0, rxjs_1.defer)(() => nodeInfoObservable.pipe((0, operators_1.map)((b) => b.nodePublicKey)));
        }
        this.websocketUrl = (configs === null || configs === void 0 ? void 0 : configs.websocketUrl) ? configs === null || configs === void 0 ? void 0 : configs.websocketUrl : `${url.replace(/\/$/, '')}/ws`;
        this.websocketInjected = configs === null || configs === void 0 ? void 0 : configs.websocketInjected;
        this.networkCurrencies = (configs === null || configs === void 0 ? void 0 : configs.networkCurrencies)
            ? (0, rxjs_1.of)(configs.networkCurrencies)
            : this.cache(() => new CurrencyService_1.CurrencyService(this).getNetworkCurrencies());
    }
    cache(delegate) {
        return (0, rxjs_1.defer)(delegate).pipe((0, operators_1.shareReplay)(1));
    }
    createAccountRepository() {
        return new AccountHttp_1.AccountHttp(this.url, this.fetchApi);
    }
    createBlockRepository() {
        return new BlockHttp_1.BlockHttp(this.url, this.fetchApi);
    }
    createChainRepository() {
        return new ChainHttp_1.ChainHttp(this.url, this.fetchApi);
    }
    createMetadataRepository() {
        return new MetadataHttp_1.MetadataHttp(this.url, this.fetchApi);
    }
    createTokenRepository() {
        return new TokenHttp_1.TokenHttp(this.url, this.networkType, this.fetchApi);
    }
    createMultisigRepository() {
        return new MultisigHttp_1.MultisigHttp(this.url, this.fetchApi);
    }
    createNamespaceRepository() {
        return new NamespaceHttp_1.NamespaceHttp(this.url, this.networkType, this.fetchApi);
    }
    createNetworkRepository() {
        return new NetworkHttp_1.NetworkHttp(this.url, this.fetchApi);
    }
    createNodeRepository() {
        return new NodeHttp_1.NodeHttp(this.url, this.fetchApi);
    }
    createReceiptRepository() {
        return new ReceiptHttp_1.ReceiptHttp(this.url, this.fetchApi);
    }
    createRestrictionAccountRepository() {
        return new RestrictionAccountHttp_1.RestrictionAccountHttp(this.url, this.fetchApi);
    }
    createRestrictionTokenRepository() {
        return new RestrictionTokenHttp_1.RestrictionTokenHttp(this.url, this.fetchApi);
    }
    createTransactionRepository() {
        return new TransactionHttp_1.TransactionHttp(this.url, this.fetchApi);
    }
    createTransactionStatusRepository() {
        return new TransactionStatusHttp_1.TransactionStatusHttp(this.url, this.fetchApi);
    }
    createHashLockRepository() {
        return new HashLockHttp_1.HashLockHttp(this.url, this.fetchApi);
    }
    createSecretLockRepository() {
        return new SecretLockHttp_1.SecretLockHttp(this.url, this.fetchApi);
    }
    createFinalizationRepository() {
        return new FinalizationHttp_1.FinalizationHttp(this.url, this.fetchApi);
    }
    getGenerationHash() {
        return this.generationHash;
    }
    getNetworkType() {
        return this.networkType;
    }
    createListener() {
        return new Listener_1.Listener(this.websocketUrl, this.createNamespaceRepository(), this.websocketInjected, this.createMultisigRepository());
    }
    getEpochAdjustment() {
        return this.epochAdjustment;
    }
    getCurrencies() {
        return this.networkCurrencies;
    }
    /**
     * @returns the node public key
     */
    getNodePublicKey() {
        return this.nodePublicKey;
    }
}
exports.RepositoryFactoryHttp = RepositoryFactoryHttp;
//# sourceMappingURL=RepositoryFactoryHttp.js.map