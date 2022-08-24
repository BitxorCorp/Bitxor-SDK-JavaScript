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
exports.StateProofService = void 0;
const js_sha3_1 = require("js-sha3");
const operators_1 = require("rxjs/operators");
const format_1 = require("../core/format");
const model_1 = require("../model");
const state_1 = require("../model/state");
/**
 * State Proof Service Interface
 */
class StateProofService {
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.blockRepo = repositoryFactory.createBlockRepository();
    }
    /**
     * @param address Account address.
     * @returns {Observable<StateMerkleProof>}
     */
    accountById(address) {
        const accountRepo = this.repositoryFactory.createAccountRepository();
        return accountRepo.getAccountInfo(address).pipe((0, operators_1.mergeMap)((info) => this.account(info)));
    }
    account(info) {
        const accountRepo = this.repositoryFactory.createAccountRepository();
        return accountRepo.getAccountInfoMerkle(info.address).pipe((0, operators_1.map)((merkle) => this.toProof(info.serialize(), merkle)));
    }
    /**
     * Namespace proof can only be verified at root level
     * @param namespaceId Namepace Id.
     * @returns {Observable<StateMerkleProof>}
     */
    namespaceById(namespaceId) {
        const namespaceRepo = this.repositoryFactory.createNamespaceRepository();
        return namespaceRepo.getNamespace(namespaceId).pipe((0, operators_1.mergeMap)((namespace) => {
            if (namespace.registrationType !== model_1.NamespaceRegistrationType.RootNamespace) {
                throw new Error('Namespace proof can only be verified at root level.');
            }
            return this.namespaces(namespace);
        }));
    }
    namespaces(root) {
        if (root.registrationType !== model_1.NamespaceRegistrationType.RootNamespace) {
            throw new Error('Namespace proof can only be verified at root level.');
        }
        const namespaceRepo = this.repositoryFactory.createNamespaceRepository();
        return namespaceRepo
            .streamer()
            .search({ level0: root.id })
            .pipe((0, operators_1.toArray)())
            .pipe((0, operators_1.mergeMap)((fullPath) => {
            return namespaceRepo.getNamespaceMerkle(root.id).pipe((0, operators_1.map)((merkle) => {
                return this.toProof(root.serialize(fullPath), merkle);
            }));
        }));
    }
    /**
     * @param tokenId Token Id.
     * @returns {Observable<StateMerkleProof>}
     */
    tokenById(tokenId) {
        const tokenRepo = this.repositoryFactory.createTokenRepository();
        return tokenRepo.getToken(tokenId).pipe((0, operators_1.mergeMap)((info) => {
            return this.token(info);
        }));
    }
    token(info) {
        const tokenRepo = this.repositoryFactory.createTokenRepository();
        return tokenRepo.getTokenMerkle(info.id).pipe((0, operators_1.map)((merkle) => {
            return this.toProof(info.serialize(), merkle);
        }));
    }
    /**
     * @param address Multisig account address.
     * @returns {Observable<StateMerkleProof>}
     */
    multisigById(address) {
        const multisigRepo = this.repositoryFactory.createMultisigRepository();
        return multisigRepo.getMultisigAccountInfo(address).pipe((0, operators_1.mergeMap)((info) => {
            return this.multisig(info);
        }));
    }
    multisig(info) {
        const multisigRepo = this.repositoryFactory.createMultisigRepository();
        return multisigRepo.getMultisigAccountInfoMerkle(info.accountAddress).pipe((0, operators_1.map)((merkle) => {
            return this.toProof(info.serialize(), merkle);
        }));
    }
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    secretLockById(compositeHash) {
        const secretLockRepo = this.repositoryFactory.createSecretLockRepository();
        return secretLockRepo.getSecretLock(compositeHash).pipe((0, operators_1.mergeMap)((info) => {
            return this.secretLock(info);
        }));
    }
    secretLock(info) {
        const secretLockRepo = this.repositoryFactory.createSecretLockRepository();
        return secretLockRepo.getSecretLockMerkle(info.compositeHash).pipe((0, operators_1.map)((merkle) => {
            return this.toProof(info.serialize(), merkle);
        }));
    }
    /**
     * @param hash hashs.
     * @returns {Observable<StateMerkleProof>}
     */
    hashLockById(hash) {
        const hashLockRepo = this.repositoryFactory.createHashLockRepository();
        return hashLockRepo.getHashLock(hash).pipe((0, operators_1.mergeMap)((info) => this.hashLock(info)));
    }
    hashLock(info) {
        const hashLockRepo = this.repositoryFactory.createHashLockRepository();
        return hashLockRepo.getHashLockMerkle(info.hash).pipe((0, operators_1.map)((merkle) => {
            return this.toProof(info.serialize(), merkle);
        }));
    }
    /**
     * @param address Address.
     * @returns {Observable<StateMerkleProof>}
     */
    accountRestrictionById(address) {
        const restrictionRepo = this.repositoryFactory.createRestrictionAccountRepository();
        return restrictionRepo.getAccountRestrictions(address).pipe((0, operators_1.mergeMap)((info) => {
            return restrictionRepo.getAccountRestrictionsMerkle(address).pipe((0, operators_1.map)((merkle) => {
                return this.toProof(info.serialize(), merkle);
            }));
        }));
    }
    accountRestriction(info) {
        const restrictionRepo = this.repositoryFactory.createRestrictionAccountRepository();
        return restrictionRepo.getAccountRestrictionsMerkle(info.address).pipe((0, operators_1.map)((merkle) => {
            return this.toProof(info.serialize(), merkle);
        }));
    }
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    tokenRestrictionById(compositeHash) {
        const restrictionRepo = this.repositoryFactory.createRestrictionTokenRepository();
        return restrictionRepo.getTokenRestrictions(compositeHash).pipe((0, operators_1.mergeMap)((info) => this.tokenRestriction(info)));
    }
    tokenRestriction(info) {
        const restrictionRepo = this.repositoryFactory.createRestrictionTokenRepository();
        return restrictionRepo.getTokenRestrictionsMerkle(info.compositeHash).pipe((0, operators_1.map)((merkle) => this.toProof(info.serialize(), merkle)));
    }
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    metadataById(compositeHash) {
        const metaDataRepo = this.repositoryFactory.createMetadataRepository();
        return metaDataRepo.getMetadata(compositeHash).pipe((0, operators_1.mergeMap)((info) => this.metadata(info)));
    }
    metadata(info) {
        const metaDataRepo = this.repositoryFactory.createMetadataRepository();
        return metaDataRepo
            .getMetadataMerkle(info.metadataEntry.compositeHash)
            .pipe((0, operators_1.map)((merkle) => this.toProof(info.metadataEntry.serialize(), merkle)));
    }
    toProof(serialized, merkle) {
        var _a, _b;
        const hash = format_1.Convert.uint8ToHex(serialized);
        const stateHash = js_sha3_1.sha3_256.create().update(format_1.Convert.hexToUint8(hash)).hex().toUpperCase();
        const valid = stateHash === ((_a = merkle.tree.leaf) === null || _a === void 0 ? void 0 : _a.value);
        return new state_1.StateMerkleProof(stateHash, merkle.tree, this.getRootHash(merkle.tree), (_b = merkle.tree.leaf) === null || _b === void 0 ? void 0 : _b.value, valid);
    }
    getRootHash(tree) {
        return tree.branches.length ? tree.branches[0].branchHash : tree === null || tree === void 0 ? void 0 : tree.leaf.leafHash;
    }
}
exports.StateProofService = StateProofService;
//# sourceMappingURL=StateProofService.js.map