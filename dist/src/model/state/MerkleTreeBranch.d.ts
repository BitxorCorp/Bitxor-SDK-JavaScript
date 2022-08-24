import { MerkleTreeBranchLink } from './MerkleTreeBranchLink';
import { MerkleTreeNodeType } from './MerkleTreeNodeType';
/**
 * Merkle tree branch node.
 */
export declare class MerkleTreeBranch {
    /**
     * Merkle tree node type
     */
    readonly type: MerkleTreeNodeType;
    /**
     * Branch node path
     */
    readonly path: string;
    /**
     * Branch node path encoded
     */
    readonly encodedPath: string;
    /**
     * Leaf nibble count
     */
    readonly nibbleCount: number;
    /**
     * Branch node link bitmask
     */
    readonly linkMask: string;
    /**
     * Branch node links
     */
    readonly links: MerkleTreeBranchLink[];
    /**
     * Branch node hash
     */
    readonly branchHash: string;
    /**
     * @param type
     * @param path
     * @param encodedPath
     * @param nibbleCount
     * @param linkMask
     * @param links
     * @param branchHash
     */
    constructor(
    /**
     * Merkle tree node type
     */
    type: MerkleTreeNodeType, 
    /**
     * Branch node path
     */
    path: string, 
    /**
     * Branch node path encoded
     */
    encodedPath: string, 
    /**
     * Leaf nibble count
     */
    nibbleCount: number, 
    /**
     * Branch node link bitmask
     */
    linkMask: string, 
    /**
     * Branch node links
     */
    links: MerkleTreeBranchLink[], 
    /**
     * Branch node hash
     */
    branchHash: string);
}
