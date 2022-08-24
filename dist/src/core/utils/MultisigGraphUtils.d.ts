import { MultisigAccountGraphInfo } from '../../model/account/MultisigAccountGraphInfo';
import { MultisigAccountInfo } from '../../model/account/MultisigAccountInfo';
/**
 * MultisigGraph utilities
 */
export declare type MultisigChildrenTreeObject = {
    address: string;
    children: [];
};
export declare class MultisigGraphUtils {
    /**
     * creates a structred Tree object containing Current multisig account with children
     * @param {MultisigAccountInfo[][]} multisigEnteries
     * @returns {MultisigChildrenTreeObject[]} Array of multisigChildrentTree objects
     */
    static getMultisigChildren(multisigAccountGraphInfoMapped: MultisigAccountInfo[][]): MultisigChildrenTreeObject[];
    /**
     * sort entries based on tree hierarchy from top to bottom
     * @param {Map<number, MultisigAccountInfo[]>} multisigEnteries
     * @returns {MultisigAccountInfo[]}  sorted multisig graph
     */
    private static getMultisigGraphArraySorted;
    /**
     * returns sorted tree entries
     * @param {MultisigAccountGraphInfo} graphInfo
     * @returns {MultisigAccountInfo[][]}  array of sorted multisigInfo
     */
    static getMultisigInfoFromMultisigGraphInfo(graphInfo: MultisigAccountGraphInfo): MultisigAccountInfo[][];
}
