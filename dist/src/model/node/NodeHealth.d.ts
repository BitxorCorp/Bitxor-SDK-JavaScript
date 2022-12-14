import { NodeStatusEnum } from 'bitxor-openapi-typescript-fetch-client';
/**
 * The node info structure describes basic information of a node health.
 */
export declare class NodeHealth {
    /**
     * The api node status
     */
    readonly apiNode: NodeStatusEnum;
    /**
     * The database status
     */
    readonly db: NodeStatusEnum;
    /**
     * @param apiNode
     * @param db
     */
    constructor(
    /**
     * The api node status
     */
    apiNode: NodeStatusEnum, 
    /**
     * The database status
     */
    db: NodeStatusEnum);
}
