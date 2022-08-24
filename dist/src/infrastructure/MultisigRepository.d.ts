import { Observable } from 'rxjs';
import { Address } from '../model/account/Address';
import { MultisigAccountGraphInfo } from '../model/account/MultisigAccountGraphInfo';
import { MultisigAccountInfo } from '../model/account/MultisigAccountInfo';
import { MerkleStateInfo } from '../model/blockchain';
/**
 * Multisig interface repository.
 *
 * @since 1.0
 */
export interface MultisigRepository {
    /**
     * Gets a MultisigAccountInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountInfo>
     */
    getMultisigAccountInfo(address: Address): Observable<MultisigAccountInfo>;
    /**
     * Gets a MultisigAccountGraphInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountGraphInfo>
     */
    getMultisigAccountGraphInfo(address: Address): Observable<MultisigAccountGraphInfo>;
    /**
     * Gets a MultisigAccountInfo merkle for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MerkleStateInfo>
     */
    getMultisigAccountInfoMerkle(address: Address): Observable<MerkleStateInfo>;
}
