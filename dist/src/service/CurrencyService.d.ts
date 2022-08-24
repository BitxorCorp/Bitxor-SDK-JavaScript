import { Observable } from 'rxjs';
import { RepositoryFactory } from '../infrastructure/RepositoryFactory';
import { Currency, NetworkCurrencies, TokenId } from '../model/token';
import { ICurrencyService } from './interfaces';
/**
 * A service used to load Currencies objects.
 */
export declare class CurrencyService implements ICurrencyService {
    private readonly repositoryFactory;
    constructor(repositoryFactory: RepositoryFactory);
    /**
     * This method loads the network currencies.
     */
    getNetworkCurrencies(): Observable<NetworkCurrencies>;
    getCurrencies(tokenIds: TokenId[]): Observable<Currency[]>;
    /**
     * Creates a network currency model given token info and token names
     * @param {TokenInfo} tokenInfo
     * @param {TokenNames} tokenName
     * @returns {(Currency | undefined)}
     */
    private getCurrency;
    private getName;
}
