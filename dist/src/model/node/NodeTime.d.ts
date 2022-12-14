import { UInt64 } from '../UInt64';
/**
 * The node info structure describes basic information of a node.
 */
export declare class NodeTime {
    /**
     * The request send timestamp
     */
    readonly sendTimeStamp: UInt64;
    /**
     * The request received timestamp
     */
    readonly receiveTimeStamp: UInt64;
    /**
     * @param sendTimeStamp
     * @param receiveTimeStamp
     */
    constructor(
    /**
     * The request send timestamp
     */
    sendTimeStamp: UInt64, 
    /**
     * The request received timestamp
     */
    receiveTimeStamp: UInt64);
}
