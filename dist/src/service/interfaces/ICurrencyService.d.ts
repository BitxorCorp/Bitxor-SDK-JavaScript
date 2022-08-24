import { Observable } from 'rxjs';
import { Currency, NetworkCurrencies, TokenId } from '../../model/token';
/**
 * A service that allows you loading Network currencies for token creation.
 */
export interface ICurrencyService {
    /**
     * This method loads the network currencies (main currency and harvest).
     */
    getNetworkCurrencies(): Observable<NetworkCurrencies>;
    /**
     * It creates the Currency objects from the token ids by loading the token infos and namespace aliases.
     *
     * @param tokenIds the token ids.
     */
    getCurrencies(tokenIds: TokenId[]): Observable<Currency[]>;
}
