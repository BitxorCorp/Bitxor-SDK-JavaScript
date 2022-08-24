import { Observable } from 'rxjs';
import { StorageInfo } from '../model/blockchain';
import { NodeHealth, NodeInfo, NodeTime, RoleType, ServerInfo } from '../model/node';
import { Http } from './Http';
import { NodeRepository } from './NodeRepository';
/**
 * Node http repository.
 *
 * @since 1.0
 */
export declare class NodeHttp extends Http implements NodeRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Supplies additional information about the application running on a node.
     * @summary Get the node information
     */
    getNodeInfo(): Observable<NodeInfo>;
    /**
     * Gets the list of peers visible by the node,
     * @summary Gets the list of peers visible by the node
     */
    getNodePeers(): Observable<NodeInfo[]>;
    /**
     * Gets the node time at the moment the reply was sent and received.
     * @summary Get the node time
     */
    getNodeTime(): Observable<NodeTime>;
    /**
     * Gets blockchain storage info.
     * @returns Observable<BlockchainStorageInfo>
     */
    getStorageInfo(): Observable<StorageInfo>;
    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    getServerInfo(): Observable<ServerInfo>;
    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    getNodeHealth(): Observable<NodeHealth>;
    /**
     * Return unlocked harvesting account from node.
     * @returns Observable<string[]>
     */
    getUnlockedAccount(): Observable<string[]>;
    /**
     * It maps NodeInfoDTO to NodeInfo
     *
     * @param nodeInfo the dto object.
     * @returns the model object
     */
    private toNodeInfo;
    /**
     * Return user friendly role type list
     * @param roleType combined node role types
     */
    getNodeRoles(roleType: number): RoleType[];
}
