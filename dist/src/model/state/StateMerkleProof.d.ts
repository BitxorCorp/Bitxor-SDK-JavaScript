import { MerkleTree } from './MerkleTree';
/**
 * StateMerkleProof
 */
export declare class StateMerkleProof {
    readonly stateHash: string;
    readonly merkleTree: MerkleTree;
    readonly rootHash: string;
    readonly leafValue: string | undefined;
    readonly valid: boolean;
    constructor(stateHash: string, merkleTree: MerkleTree, rootHash: string, leafValue: string | undefined, valid: boolean);
}
