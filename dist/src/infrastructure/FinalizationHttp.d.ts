import { Observable } from 'rxjs';
import { FinalizationProof } from '../model/finalization/FinalizationProof';
import { UInt64 } from '../model/UInt64';
import { FinalizationRepository } from './FinalizationRepository';
import { Http } from './Http';
/**
 * Chian http repository.
 *
 * @since 1.0
 */
export declare class FinalizationHttp extends Http implements FinalizationRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets finalization proof for the greatest height associated with the given epoch.
     * @param epoch Finalization epoch
     * @returns Observable<UInt64>
     */
    getFinalizationProofAtEpoch(epoch: number): Observable<FinalizationProof>;
    /**
     * Gets finalization proof at the given height.
     * @param height Block height
     * @returns Observable<BlockchainScore>
     */
    getFinalizationProofAtHeight(height: UInt64): Observable<FinalizationProof>;
}
