import { MerkleTreeBranch } from './MerkleTreeBranch';
import { MerkleTreeLeaf } from './MerkleTreeLeaf';
/**
 * Merkle tree.
 */
export declare class MerkleTree {
    readonly branches: MerkleTreeBranch[];
    readonly leaf?: MerkleTreeLeaf | undefined;
    /**
     * @param branches the branches
     * @param the leaf the leaf.
     */
    constructor(branches: MerkleTreeBranch[], leaf?: MerkleTreeLeaf | undefined);
    /***
     *
     * @param raw
     */
    static fromRaw(raw: string): MerkleTree;
}
