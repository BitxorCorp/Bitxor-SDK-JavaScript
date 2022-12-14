import { Observable } from 'rxjs';
import { NetworkConfiguration } from '../model/network/NetworkConfiguration';
import { NetworkName } from '../model/network/NetworkName';
import { NetworkType } from '../model/network/NetworkType';
import { RentalFees } from '../model/network/RentalFees';
import { TransactionFees } from '../model/network/TransactionFees';
import { Http } from './Http';
import { NetworkRepository } from './NetworkRepository';
/**
 * Network http repository.
 *
 * @since 1.0
 */
export declare class NetworkHttp extends Http implements NetworkRepository {
    private readonly networkRoutesApi;
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any);
    /**
     * Get current network identifier.
     *
     * @return network identifier.
     */
    getNetworkType(): Observable<NetworkType>;
    /**
     * Get current network type name and description
     *
     * @return current network type name and description
     */
    getNetworkName(): Observable<NetworkName>;
    /**
     * Returns the content from a bitxorcore-server network configuration file (resources/config-network.properties).
     * To enable this feature, the REST setting \"network.propertiesFilePath\" must define where the file is located.
     * This is adjustable via the configuration file (rest/resources/rest.json) per REST instance.
     * @summary Get the network properties
     */
    getNetworkProperties(): Observable<NetworkConfiguration>;
    /**
     * Returns the estimated effective rental fees for namespaces and tokens. This endpoint is only available
     * if the REST instance has access to bitxorcore-server ``resources/config-network.properties`` file.
     * To activate this feature, add the setting \"network.propertiesFilePath\" in the configuration file (rest/resources/rest.json).
     * @summary Get rental fees information
     */
    getRentalFees(): Observable<RentalFees>;
    /**
     * Returns information about the average, median, highest and lower fee multiplier over the last
     * \"numBlocksTransactionFeeStats\". The setting \"numBlocksTransactionFeeStats\" is adjustable
     * via a configuration file (rest/resources/rest.json) per REST instance.
     * @summary Get transaction fees information
     */
    getTransactionFees(): Observable<TransactionFees>;
    /**
     * Map dto to sdk models
     * @param dto dto object returned from rest
     */
    private mapNetworkConfigurationDto;
}
