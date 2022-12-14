import { NetworkType } from '../network/NetworkType';
import { RoleType } from './RoleType';
/**
 * The node info structure describes basic information of a node.
 */
export declare class NodeInfo {
    /**
     * The public key used to identify the node.
     */
    readonly publicKey: string;
    /**
     * The network generation hash seed
     */
    readonly networkGenerationHashSeed: string;
    /**
     * The port used for the communication.
     */
    readonly port: number;
    /**
     * The network identifier.
     */
    readonly networkIdentifier: NetworkType;
    /**
     * The version of the application.
     */
    readonly version: number;
    /**
     * The roles of the application.
     */
    readonly roles: RoleType[];
    /**
     * The IP address of the endpoint.
     */
    readonly host: string;
    /**
     * The name of the node.
     */
    readonly friendlyName: string;
    /**
     * The node public key used for NodeKeyLink transaction.
     */
    readonly nodePublicKey?: string | undefined;
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
    publicKey: string, 
    /**
     * The network generation hash seed
     */
    networkGenerationHashSeed: string, 
    /**
     * The port used for the communication.
     */
    port: number, 
    /**
     * The network identifier.
     */
    networkIdentifier: NetworkType, 
    /**
     * The version of the application.
     */
    version: number, 
    /**
     * The roles of the application.
     */
    roles: RoleType[], 
    /**
     * The IP address of the endpoint.
     */
    host: string, 
    /**
     * The name of the node.
     */
    friendlyName: string, 
    /**
     * The node public key used for NodeKeyLink transaction.
     */
    nodePublicKey?: string | undefined);
}
