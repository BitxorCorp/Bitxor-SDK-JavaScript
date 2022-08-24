import { Observable } from 'rxjs';
import { RepositoryFactory } from '../infrastructure';
import { AccountInfo, AccountRestrictions, HashLockInfo, Metadata, MultisigAccountInfo, NamespaceId, NamespaceInfo, SecretLockInfo, TokenInfo } from '../model';
import { Address } from '../model/account';
import { TokenRestriction } from '../model/restriction';
import { StateMerkleProof } from '../model/state';
import { TokenId } from '../model/token';
/**
 * State Proof Service Interface
 */
export declare class StateProofService {
    private readonly repositoryFactory;
    private blockRepo;
    /**
     * Constructor
     * @param repositoryFactory
     */
    constructor(repositoryFactory: RepositoryFactory);
    /**
     * @param address Account address.
     * @returns {Observable<StateMerkleProof>}
     */
    accountById(address: Address): Observable<StateMerkleProof>;
    account(info: AccountInfo): Observable<StateMerkleProof>;
    /**
     * Namespace proof can only be verified at root level
     * @param namespaceId Namepace Id.
     * @returns {Observable<StateMerkleProof>}
     */
    namespaceById(namespaceId: NamespaceId): Observable<StateMerkleProof>;
    namespaces(root: NamespaceInfo): Observable<StateMerkleProof>;
    /**
     * @param tokenId Token Id.
     * @returns {Observable<StateMerkleProof>}
     */
    tokenById(tokenId: TokenId): Observable<StateMerkleProof>;
    token(info: TokenInfo): Observable<StateMerkleProof>;
    /**
     * @param address Multisig account address.
     * @returns {Observable<StateMerkleProof>}
     */
    multisigById(address: Address): Observable<StateMerkleProof>;
    multisig(info: MultisigAccountInfo): Observable<StateMerkleProof>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    secretLockById(compositeHash: string): Observable<StateMerkleProof>;
    secretLock(info: SecretLockInfo): Observable<StateMerkleProof>;
    /**
     * @param hash hashs.
     * @returns {Observable<StateMerkleProof>}
     */
    hashLockById(hash: string): Observable<StateMerkleProof>;
    hashLock(info: HashLockInfo): Observable<StateMerkleProof>;
    /**
     * @param address Address.
     * @returns {Observable<StateMerkleProof>}
     */
    accountRestrictionById(address: Address): Observable<StateMerkleProof>;
    accountRestriction(info: AccountRestrictions): Observable<StateMerkleProof>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    tokenRestrictionById(compositeHash: string): Observable<StateMerkleProof>;
    tokenRestriction(info: TokenRestriction): Observable<StateMerkleProof>;
    /**
     * @param compositeHash Composite hash.
     * @returns {Observable<StateMerkleProof>}
     */
    metadataById(compositeHash: string): Observable<StateMerkleProof>;
    metadata(info: Metadata): Observable<StateMerkleProof>;
    private toProof;
    private getRootHash;
}
