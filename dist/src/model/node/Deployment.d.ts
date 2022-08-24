/**
 * The deployment information that helps tracking how the node was created.
 */
export declare class Deployment {
    /**
     * deploymentTool The tool used to create, maintain and deploy the node. Examples: bitxor-bootstrap, manual.
     */
    readonly deploymentTool: string;
    /**
     * deploymentToolVersion The version of the tool used to create, maintain and deploy the node.
     */
    readonly deploymentToolVersion: string;
    /**
     * lastUpdatedDate When was the node last upgraded.
     */
    readonly lastUpdatedDate: string;
    /**
     * @param deploymentTool The tool used to create, maintain and deploy the node. Examples: bitxor-bootstrap, manual.
     * @param deploymentToolVersion The version of the tool used to create, maintain and deploy the node.
     * @param lastUpdatedDate When was the node upgraded.
     */
    constructor(
    /**
     * deploymentTool The tool used to create, maintain and deploy the node. Examples: bitxor-bootstrap, manual.
     */
    deploymentTool: string, 
    /**
     * deploymentToolVersion The version of the tool used to create, maintain and deploy the node.
     */
    deploymentToolVersion: string, 
    /**
     * lastUpdatedDate When was the node last upgraded.
     */
    lastUpdatedDate: string);
}
