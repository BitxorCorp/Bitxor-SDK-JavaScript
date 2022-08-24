import { Observable } from 'rxjs';
import { Address } from '../model/account/Address';
import { MultisigAccountGraphInfo } from '../model/account/MultisigAccountGraphInfo';
import { MultisigAccountInfo } from '../model/account/MultisigAccountInfo';
import { MerkleStateInfo } from '../model/blockchain';
import { Http } from './Http';
import { MultisigRepository } from './MultisigRepository';
/**
 * Multisig http repository.
 *
 * @since 1.0
 */
export declare class MultisigHttp extends Http implements MultisigRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets a MultisigAccountInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountInfo>
     */
    getMultisigAccountInfo(address: Address): Observable<MultisigAccountInfo>;
    /**
     * Gets a MultisigAccountInfo merkle for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MerkleStateInfo>
     */
    getMultisigAccountInfoMerkle(address: Address): Observable<MerkleStateInfo>;
    /**
     * Gets a MultisigAccountGraphInfo for an account.
     * @param address - * Address can be created rawAddress or publicKey
     * @returns Observable<MultisigAccountGraphInfo>
     */
    getMultisigAccountGraphInfo(address: Address): Observable<MultisigAccountGraphInfo>;
    /**
     * It maps from MultisigAccountInfoDTO to MultisigAccountInfo
     * @param dto the DTO
     */
    private toMultisigAccountInfo;
}
