/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Observable, of } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { AccountRepository } from '../infrastructure/AccountRepository';
import { TokenRepository } from '../infrastructure/TokenRepository';
import { Address } from '../model/account/Address';
import { Token } from '../model/token/Token';
import { TokenId } from '../model/token/TokenId';
import { TokenInfo } from '../model/token/TokenInfo';
import { TokenAmountView } from './TokenAmountView';
import { TokenView } from './TokenView';

/**
 * Token service
 */
export class TokenService {
    /**
     * Constructor
     * @param accountRepository
     * @param tokenRepository
     */
    constructor(private readonly accountRepository: AccountRepository, private readonly tokenRepository: TokenRepository) {}

    /**
     * Get token view given tokenIds
     * @param tokenIds - The ids of the tokens
     * @returns {Observable<TokenView[]>}
     */
    tokensView(tokenIds: TokenId[]): Observable<TokenView[]> {
        return of(tokenIds).pipe(
            mergeMap(() =>
                this.tokenRepository.getTokens(tokenIds).pipe(
                    mergeMap((info) => info),
                    map((tokenInfo: TokenInfo) => {
                        return new TokenView(tokenInfo);
                    }),
                    toArray(),
                ),
            ),
        );
    }

    /**
     * Get token amount view given token array
     * @param tokens
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountView(tokens: Token[]): Observable<TokenAmountView[]> {
        const tokenIds = tokens.map((token) => {
            return new TokenId(token.id.toHex());
        });
        return this.tokensView(tokenIds).pipe(
            map((tokenViews) => {
                const results: TokenAmountView[] = [];
                tokenViews.forEach((view) => {
                    const token = tokens.find((m) => m.id.toHex() === view.tokenInfo.id.toHex());
                    if (token) {
                        results.push(new TokenAmountView(view.tokenInfo, token.amount));
                    }
                });
                return results;
            }),
        );
    }

    /**
     * Get balance tokens in form of TokenAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<TokenAmountView[]>}
     */
    tokensAmountViewFromAddress(address: Address): Observable<TokenAmountView[]> {
        return of(address).pipe(
            mergeMap((_) => this.accountRepository.getAccountInfo(_)),
            mergeMap((_) => this.tokensAmountView(_.tokens)),
        );
    }
}
