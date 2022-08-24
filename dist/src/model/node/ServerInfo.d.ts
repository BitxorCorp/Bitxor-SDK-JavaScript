import { Deployment } from './Deployment';
/**
 * The server information.
 */
export declare class ServerInfo {
    /**
     * restVersion The bitxorcore-rest component version
     */
    readonly restVersion: string;
    /**
     * sdkVersion the bitxorcore-sdk component version
     */
    readonly sdkVersion: string;
    /**
     * deployment The deployment information that helps tracking how the node was created.
     */
    readonly deployment: Deployment | undefined;
    /**
     * @param restVersion - The bitxorcore-rest component version
     * @param sdkVersion - the bitxorcore-sdk component version
     * @param deployment - the deployment information.
     */
    constructor(
    /**
     * restVersion The bitxorcore-rest component version
     */
    restVersion: string, 
    /**
     * sdkVersion the bitxorcore-sdk component version
     */
    sdkVersion: string, 
    /**
     * deployment The deployment information that helps tracking how the node was created.
     */
    deployment: Deployment | undefined);
}
