import { Currency } from './Currency';
/**
 * Object holding the bitxor network currencies, main and harvest.
 */
export declare class NetworkCurrencies {
    readonly currency: Currency;
    readonly harvest: Currency;
    /**
     * The pre-configured public currencies for easier offline access.
     */
    static readonly PUBLIC: NetworkCurrencies;
    /**
     * Constructor
     *
     * @param currency the network main currency.
     * @param harvest the network harvest currency.
     */
    constructor(currency: Currency, harvest: Currency);
}
