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
exports.NamespaceNetworkProperties = void 0;
class NamespaceNetworkProperties {
    /**
     * @param maxNameSize - Maximum namespace name size.
     * @param maxChildNamespaces - Maximum number of children for a root namespace.
     * @param maxNamespaceDepth - Maximum namespace depth.
     * @param minNamespaceDuration - Minimum namespace duration.
     * @param maxNamespaceDuration - Maximum namespace duration.
     * @param namespaceGracePeriodDuration - Grace period during which time only the previous owner can renew an expired namespace.
     * @param reservedRootNamespaceNames - Reserved root namespaces that cannot be claimed.
     * @param namespaceRentalFeeSinkAddress - Public key of the namespace rental fee sink address.
     * @param rootNamespaceRentalFeePerBlock - Root namespace rental fee per block.
     * @param childNamespaceRentalFee - Child namespace rental fee.
     */
    constructor(maxNameSize, maxChildNamespaces, maxNamespaceDepth, minNamespaceDuration, maxNamespaceDuration, namespaceGracePeriodDuration, reservedRootNamespaceNames, namespaceRentalFeeSinkAddress, rootNamespaceRentalFeePerBlock, childNamespaceRentalFee) {
        this.maxNameSize = maxNameSize;
        this.maxChildNamespaces = maxChildNamespaces;
        this.maxNamespaceDepth = maxNamespaceDepth;
        this.minNamespaceDuration = minNamespaceDuration;
        this.maxNamespaceDuration = maxNamespaceDuration;
        this.namespaceGracePeriodDuration = namespaceGracePeriodDuration;
        this.reservedRootNamespaceNames = reservedRootNamespaceNames;
        this.namespaceRentalFeeSinkAddress = namespaceRentalFeeSinkAddress;
        this.rootNamespaceRentalFeePerBlock = rootNamespaceRentalFeePerBlock;
        this.childNamespaceRentalFee = childNamespaceRentalFee;
    }
}
exports.NamespaceNetworkProperties = NamespaceNetworkProperties;
//# sourceMappingURL=NamespaceNetworkProperties.js.map