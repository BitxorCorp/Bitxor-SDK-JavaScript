import { MerkleTreeNodeType } from './MerkleTreeNodeType';
/**
 * Merkle tree leaf node.
 */
export declare class MerkleTreeLeaf {
    /**
     * Merkle tree node type
     */
    readonly type: MerkleTreeNodeType;
    /**
     * Leaf node path
     */
    readonly path: string;
    /**
     * Leaf node path encoded
     */
    readonly encodedPath: string;
    /**
     * Leaf nibble count
     */
    readonly nibbleCount: number;
    /**
     * Leaf node value hash
     */
    readonly value: string;
    /**
     * Leaf node hash
     */
    readonly leafHash: string;
    /**
     * @param type
     * @param path
     * @param encodedPath
     * @param nibbleCount
     * @param value
     * @param leafHash
     */
    constructor(
    /**
     * Merkle tree node type
     */
    type: MerkleTreeNodeType, 
    /**
     * Leaf node path
     */
    path: string, 
    /**
     * Leaf node path encoded
     */
    encodedPath: string, 
    /**
     * Leaf nibble count
     */
    nibbleCount: number, 
    /**
     * Leaf node value hash
     */
    value: string, 
    /**
     * Leaf node hash
     */
    leafHash: string);
}
