import { MerkleTreeBranch } from './MerkleTreeBranch';
import { MerkleTreeBranchLink } from './MerkleTreeBranchLink';
import { MerkleTreeLeaf } from './MerkleTreeLeaf';
export default class MerkleTreeParser {
    /**
     * Decompose a bitmask to get number of bit's indices
     * @param {number} mask bitmask
     * @returns {string[]} array of the indices of bits
     */
    getBitsFromMask(mask: any): string[];
    /**
     * Calculate path length from given nibbles count
     * @param {number} nibbleCount Nibbles count
     * @returns {number} the length of the path
     */
    getPathLength(nibbleCount: any): number;
    /**
     * Is branch node
     * @param {number} marker node marker
     * @returns {boolean} if tree node is branch
     */
    isBranch(marker: any): boolean;
    /**
     * Is leaf node
     * @param {number} marker node marker
     * @returns {boolean} if tree node is leaf
     */
    isLeaf(marker: any): boolean;
    /**
     * Recursively parse raw tree
     * @param {Uint8Array} raw raw tree buffer
     * @returns {Array} merkle tree
     */
    parseMerkleTreeFromRaw(raw: Uint8Array): (MerkleTreeBranch | MerkleTreeLeaf)[];
    /**
     * Parse branch tree node
     * @param {Uint8Array} offsetRaw partial raw buffer
     * @param {Uint8Array} path merkle tree path
     * @param {number} nibbleCount number of nibbles
     * @returns {Uint8Array} unprocess raw buffer
     */
    parseBranch(offsetRaw: Uint8Array, path: Uint8Array, nibbleCount: number): [Uint8Array, MerkleTreeBranch];
    /**
     * Parse leaf tree node
     * @param {Uint8Array} offsetRaw partial raw buffer
     * @param {Uint8Array} path merkle tree path
     * @param {number} nibbleCount number of nibbles
     * @returns {Uint8Array} unprocess raw buffer
     */
    parseLeaf(offsetRaw: Uint8Array, path: Uint8Array, nibbleCount: number): [Uint8Array, MerkleTreeLeaf];
    /**
     * Encode path depends on node type and nibble count
     * @param {Uint8Array} path path buffer
     * @param {number} nibbleCount number of nibbles
     * @param {boolean} isLeaf is leaf node
     * @returns {Uint8Array} encoded path
     */
    encodePath(path: Uint8Array, nibbleCount: number, isLeaf: boolean): Uint8Array;
    /**
     * Get byte at given nibble index
     * @param {Uint8Array} path path buffer
     * @param {number} index nibble index
     * @returns {number} byte
     */
    nibbleAt(path: Uint8Array, index: number): number;
    /**
     * Calculate branch hash. Hash(encodedPath + 16 links)
     * @param {string} encodedPath encoded path of the branch in hexadecimal format
     * @param {Array} links branch links array
     * @returns {string} branch hash (Hash(encodedPath + links))
     */
    getBranchHash(encodedPath: string, links: MerkleTreeBranchLink[]): string;
    /**
     * Calculate leaf hash. Hash(encodedPath + leaf value)
     * @param {string} encodedPath encoded path of the leaf in hexadecimal format
     * @param {Array} leafValue leaf value
     * @returns {string} leaf hash (Hash(encodedPath + leaf value))
     */
    getLeafHash(encodedPath: string, leafValue: any): string;
}
