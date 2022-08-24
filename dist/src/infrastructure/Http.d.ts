import { Configuration } from 'bitxor-openapi-typescript-fetch-client';
import { Observable } from 'rxjs';
import { NetworkType } from '../model/network';
/**
 * Http extended by all http services
 */
export declare abstract class Http {
    protected readonly url: string;
    protected readonly fetchApi?: any;
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    protected constructor(url: string, fetchApi?: any);
    static errorHandling(error: any): Promise<Error>;
    createNetworkTypeObservable(networkType?: NetworkType | Observable<NetworkType>): Observable<NetworkType>;
    config(): Configuration;
    /**
     * This method knows how to call, convert and handle exception when doing remote http operations.
     * @param remoteCall the remote call
     * @param mapper the mapper from dto to the model object.
     */
    protected call<D, M>(remoteCall: Promise<D>, mapper: (value: D) => M): Observable<M>;
}
