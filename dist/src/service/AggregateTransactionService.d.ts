import { Observable } from 'rxjs';
import { RepositoryFactory } from '../infrastructure/RepositoryFactory';
import { Address } from '../model/account/Address';
import { SignedTransaction } from '../model/transaction/SignedTransaction';
/**
 * Aggregated Transaction service
 */
export declare class AggregateTransactionService {
    private readonly multisigRepository;
    private readonly networkRepository;
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory: RepositoryFactory);
    /**
     * Check if an aggregate complete transaction has all cosignatories attached
     * @param signedTransaction - The signed aggregate transaction (complete) to be verified
     * @returns {Observable<boolean>}
     */
    isComplete(signedTransaction: SignedTransaction): Observable<boolean>;
    /**
     * Get total multisig account cosigner count
     * @param address multisig account address
     * @returns {Observable<number>}
     */
    getMaxCosignatures(address: Address): Observable<number>;
    /**
     * Get max cosignatures allowed per aggregate from network properties
     * @returns {Observable<number>}
     */
    getNetworkMaxCosignaturesPerAggregate(): Observable<number>;
    /**
     * Validate cosignatories against multisig Account(s)
     * @param graphInfo - multisig account graph info
     * @param cosignatories - array of cosignatories extracted from aggregated transaction
     * @param innerTransaction - the inner transaction of the aggregated transaction
     * @returns {boolean}
     */
    private validateCosignatories;
    /**
     * Compare two string arrays
     * @param array1 - base array
     * @param array2 - array to be matched
     * @returns {string[]} - array of matched elements
     */
    private compareArrays;
}
