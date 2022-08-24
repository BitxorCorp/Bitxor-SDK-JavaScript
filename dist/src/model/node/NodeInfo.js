"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeInfo = void 0;
/**
 * The node info structure describes basic information of a node.
 */
class NodeInfo {
    /**
     * @param publicKey
     * @param networkGenerationHashSeed
     * @param port
     * @param networkIdentifier
     * @param version
     * @param roles
     * @param host
     * @param friendlyName
     * @param nodePublicKey
     */
    constructor(
    /**
     * The public key used to identify the node.
     */
    publicKey, 
    /**
     * The network generation hash seed
     */
    networkGenerationHashSeed, 
    /**
     * The port used for the communication.
     */
    port, 
    /**
     * The network identifier.
     */
    networkIdentifier, 
    /**
     * The version of the application.
     */
    version, 
    /**
     * The roles of the application.
     */
    roles, 
    /**
     * The IP address of the endpoint.
     */
    host, 
    /**
     * The name of the node.
     */
    friendlyName, 
    /**
     * The node public key used for NodeKeyLink transaction.
     */
    nodePublicKey) {
        this.publicKey = publicKey;
        this.networkGenerationHashSeed = networkGenerationHashSeed;
        this.port = port;
        this.networkIdentifier = networkIdentifier;
        this.version = version;
        this.roles = roles;
        this.host = host;
        this.friendlyName = friendlyName;
        this.nodePublicKey = nodePublicKey;
    }
}
exports.NodeInfo = NodeInfo;
//# sourceMappingURL=NodeInfo.js.map