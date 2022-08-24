import { Observable } from 'rxjs';
import { AccountRepository } from '../infrastructure/AccountRepository';
import { TokenRepository } from '../infrastructure/TokenRepository';
import { Address } from '../model/account/Address';
import { Token } from '../model/token/Token';
import { TokenId } from '../model/token/TokenId';
import { TokenAmountView } from './TokenAmountView';
import { TokenView } from './TokenView';
/**
 * Token service
 */
export declare class TokenService {
    private readonly accountRepository;
    private readonly tokenRepository;
    /**
     * Constructor
     * @param accountRepository
     * @param tokenRepository
     */
    constructor(accountRepository: AccountRepository, tokenRepository: TokenRepository);
    /**
     * Get token view given tokenIds
     * @param tokenIds - The ids of the tokens
     * @returns {Observable<TokenView[]>}
     */
    tokensView(tokenIds: TokenId[]): Observable<TokenView[]>;
    /**
     * Get token amount view given token array
     * @param tokens
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountView(tokens: Token[]): Observable<TokenAmountView[]>;
    /**
     * Get balance tokens in form of TokenAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountViewFromAddress(address: Address): Observable<TokenAmountView[]>;
}
