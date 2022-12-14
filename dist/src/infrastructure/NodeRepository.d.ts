import { Observable } from 'rxjs';
import { StorageInfo } from '../model/blockchain/StorageInfo';
import { NodeHealth } from '../model/node/NodeHealth';
import { NodeInfo } from '../model/node/NodeInfo';
import { NodeTime } from '../model/node/NodeTime';
import { ServerInfo } from '../model/node/ServerInfo';
/**
 * Node interface repository.
 *
 * @since 1.0
 */
export interface NodeRepository {
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
     * Get node health information
     *
     * @return {@link NodeHealth} of NodeHealth
     */
    getNodeHealth(): Observable<NodeHealth>;
    /**
     * Gets blockchain storage info.
     * @param hostName Peer node host name.
     * @returns Observable<StorageInfo>
     */
    getStorageInfo(): Observable<StorageInfo>;
    /**
     * Gets blockchain server info.
     * @returns Observable<Server>
     */
    getServerInfo(): Observable<ServerInfo>;
    /**
     * Return unlocked harvesting account from node.
     * @returns Observable<string[]>
     */
    getUnlockedAccount(): Observable<string[]>;
}
