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
exports.NetworkProperties = void 0;
/**
 * Network related configuration properties.
 */
class NetworkProperties {
    /**
     * @param identifier - Network identifier.
     * @param nodeEqualityStrategy - Node equality strategy. Defines if the identifier for the node must be its public key or host.
     * @param genesisSignerPublicKey - Genesis public key.
     * @param generationHashSeed - Seed for generate genesis generation hash.
     * @param epochAdjustment - Genesis epoch time adjustment.
     */
    constructor(identifier, nodeEqualityStrategy, genesisSignerPublicKey, generationHashSeed, epochAdjustment) {
        this.identifier = identifier;
        this.nodeEqualityStrategy = nodeEqualityStrategy;
        this.genesisSignerPublicKey = genesisSignerPublicKey;
        this.generationHashSeed = generationHashSeed;
        this.epochAdjustment = epochAdjustment;
    }
}
exports.NetworkProperties = NetworkProperties;
//# sourceMappingURL=NetworkProperties.js.map