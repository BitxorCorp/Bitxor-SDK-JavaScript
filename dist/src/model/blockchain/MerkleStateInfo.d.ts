import { MerkleTree } from '../state/MerkleTree';
/**
 *  The merkle path information clients can use to proof the state of the given entity.
 */
export declare class MerkleStateInfo {
    readonly raw: string;
    readonly tree: MerkleTree;
    /**
     * Constructor
     *
     * @param raw The hex information of the complete merkle tree as returned by server api. More information can be found in chapter 4.3 of the bitxorcore whitepaper.
     * @param tree The merkle tree object parsed from raw
     */
    constructor(raw: string, tree: MerkleTree);
}
