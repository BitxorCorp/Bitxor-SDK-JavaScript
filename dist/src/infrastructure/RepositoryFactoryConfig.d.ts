import { NetworkType } from '../model/network/NetworkType';
import { NetworkCurrencies } from '../model/token/NetworkCurrencies';
export interface RepositoryFactoryConfig {
    /**
     * optional network type if you don't want to load it from the server.
     */
    networkType?: NetworkType;
    /**
     * optional node generation hash if you don't want to load it from the server.
     */
    generationHash?: string;
    /**
     * optional websocket url. If not provided, Default: Rest-Gateway url with ''/ws'' suffix (e.g. http://localhost:3000/ws).
     */
    websocketUrl?: string;
    /**
     * optional injected websocket instance when using listeners in client.
     */
    websocketInjected?: any;
    /**
     * optional fetch function to be used when performing rest requests. The default value is:
     *  1) window.fetch if running on a browser
     *  2) or node-fetch if running on server (window.fetch not found)
     */
    fetchApi?: any;
    /**
     * The genesis block creation epoch
     */
    epochAdjustment?: number;
    /**
     * The preconfigured bitxor network currencies for offline access. They are loaded from server by default if not provided.
     */
    networkCurrencies?: NetworkCurrencies;
    /**
     * The node public key used for NodeKeyLink transaction in delegated harvesting.
     */
    nodePublicKey?: string;
}
