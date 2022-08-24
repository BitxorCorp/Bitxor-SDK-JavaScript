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
exports.NodeHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const model_1 = require("../model");
const blockchain_1 = require("../model/blockchain");
const node_1 = require("../model/node");
const Deployment_1 = require("../model/node/Deployment");
const Http_1 = require("./Http");
/**
 * Node http repository.
 *
 * @since 1.0
 */
class NodeHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.nodeRoutesApi = new bitxor_openapi_typescript_fetch_client_1.NodeRoutesApi(this.config());
    }
    /**
     * Supplies additional information about the application running on a node.
     * @summary Get the node information
     */
    getNodeInfo() {
        return this.call(this.nodeRoutesApi.getNodeInfo(), (body) => this.toNodeInfo(body));
    }
    /**
     * Gets the list of peers visible by the node,
     * @summary Gets the list of peers visible by the node
     */
    getNodePeers() {
        return this.call(this.nodeRoutesApi.getNodePeers(), (body) => body.map((nodeInfo) => this.toNodeInfo(nodeInfo)));
    }
    /**
     * Gets the node time at the moment the reply was sent and received.
     * @summary Get the node time
     */
    getNodeTime() {
        return this.call(this.nodeRoutesApi.getNodeTime(), (body) => {
            const nodeTimeDTO = body;
            if (nodeTimeDTO.communicationTimestamps.sendTimestamp && nodeTimeDTO.communicationTimestamps.receiveTimestamp) {
                return new node_1.NodeTime(model_1.UInt64.fromNumericString(nodeTimeDTO.communicationTimestamps.sendTimestamp), model_1.UInt64.fromNumericString(nodeTimeDTO.communicationTimestamps.receiveTimestamp));
            }
            throw Error('Node time not available');
        });
    }
    /**
     * Gets blockchain storage info.
     * @returns Observable<BlockchainStorageInfo>
     */
    getStorageInfo() {
        return this.call(this.nodeRoutesApi.getNodeStorage(), (body) => new blockchain_1.StorageInfo(body.numBlocks, body.numTransactions, body.numAccounts));
    }
    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    getServerInfo() {
        return this.call(this.nodeRoutesApi.getServerInfo(), (body) => {
            var _a;
            return new node_1.ServerInfo(body.serverInfo.restVersion, body.serverInfo.sdkVersion, ((_a = body.serverInfo) === null || _a === void 0 ? void 0 : _a.deployment)
                ? new Deployment_1.Deployment(body.serverInfo.deployment.deploymentTool, body.serverInfo.deployment.deploymentToolVersion, body.serverInfo.deployment.lastUpdatedDate)
                : undefined);
        });
    }
    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    getNodeHealth() {
        return this.call(this.nodeRoutesApi.getNodeHealth(), (body) => new node_1.NodeHealth(body.status.apiNode, body.status.db));
    }
    /**
     * Return unlocked harvesting account from node.
     * @returns Observable<string[]>
     */
    getUnlockedAccount() {
        return this.call(this.nodeRoutesApi.getUnlockedAccount(), (body) => {
            return body.unlockedAccount;
        });
    }
    /**
     * It maps NodeInfoDTO to NodeInfo
     *
     * @param nodeInfo the dto object.
     * @returns the model object
     */
    toNodeInfo(nodeInfo) {
        return new node_1.NodeInfo(nodeInfo.publicKey, nodeInfo.networkGenerationHashSeed, nodeInfo.port, nodeInfo.networkIdentifier, nodeInfo.version, this.getNodeRoles(nodeInfo.roles), nodeInfo.host, nodeInfo.friendlyName, nodeInfo.nodePublicKey);
    }
    /**
     * Return user friendly role type list
     * @param roleType combined node role types
     */
    getNodeRoles(roleType) {
        const roles = [];
        if ((node_1.RoleType.PeerNode.valueOf() & roleType) != 0) {
            roles.push(node_1.RoleType.PeerNode);
        }
        if ((node_1.RoleType.ApiNode.valueOf() & roleType) != 0) {
            roles.push(node_1.RoleType.ApiNode);
        }
        if ((node_1.RoleType.VotingNode.valueOf() & roleType) != 0) {
            roles.push(node_1.RoleType.VotingNode);
        }
        if ((node_1.RoleType.IPv4Node.valueOf() & roleType) != 0) {
            roles.push(node_1.RoleType.IPv4Node);
        }
        if ((node_1.RoleType.IPv6Node.valueOf() & roleType) != 0) {
            roles.push(node_1.RoleType.IPv6Node);
        }
        return roles;
    }
}
exports.NodeHttp = NodeHttp;
//# sourceMappingURL=NodeHttp.js.map