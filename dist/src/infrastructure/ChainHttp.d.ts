import { Observable } from 'rxjs';
import { ChainInfo } from '../model/blockchain/ChainInfo';
import { ChainRepository } from './ChainRepository';
import { Http } from './Http';
/**
 * Chian http repository.
 *
 * @since 1.0
 */
export declare class ChainHttp extends Http implements ChainRepository {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Gets current blockchain info
     * @returns Observable<ChainInfo>
     */
    getChainInfo(): Observable<ChainInfo>;
}
