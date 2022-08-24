import { Observable } from 'rxjs';
import { FinalizationProof } from '../model/finalization/FinalizationProof';
import { UInt64 } from '../model/UInt64';
/**
 * Finalization interface repository.
 *
 * @since 1.0
 */
export interface FinalizationRepository {
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
