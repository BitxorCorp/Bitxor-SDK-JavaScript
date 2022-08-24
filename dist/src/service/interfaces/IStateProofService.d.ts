import { Observable } from 'rxjs';
import { Address } from '../../model/account/Address';
import { NamespaceId } from '../../model/namespace/NamespaceId';
import { StateMerkleProof } from '../../model/state/StateMerkleProof';
import { TokenId } from '../../model/token/TokenId';
/**
 * State Proof Service Interface
 */
export interface IStateProofService {
    /**
     * @param address Account address.
     * @returns {Observable<StateMerkleProof | undefined>}
     */
    accountProof(address: Address): Observable<StateMerkleProof | undefined>;
    /**
     * @param namespaceId Namepace Id.
     * @returns {Observable<StateMerkleProof | undefined>}
     */
    namespaceProof(namespaceId: NamespaceId): Observable<StateMerkleProof | undefined>;
    /**
     * @param tokenId Token Id.
     * @returns {Observable<StateMerkleProof | undefined>}
     */
    tokenProof(tokenId: TokenId): Observable<StateMerkleProof | undefined>;
    /**
     * @param hash Hash.
     * @returns {Observable<StateMerkleProof | undefined>}
     */
    hashLockProof(hash: string): Observable<StateMerkleProof | undefined>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof | undefined>}
     */
    secretLockProof(compositeHash: string): Observable<StateMerkleProof | undefined>;
    /**
     * @param address Address.
     * @returns {Observable<StateMerkleProof>}
     */
    accountRestrictionProof(address: Address): Observable<StateMerkleProof | undefined>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    tokenRestrictionProof(compositeHash: string): Observable<StateMerkleProof | undefined>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    metadataProof(compositeHash: string): Observable<StateMerkleProof | undefined>;
}
