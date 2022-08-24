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

import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DtoMapping } from '../core/utils/DtoMapping';
import { RepositoryFactory } from '../infrastructure/RepositoryFactory';
import { NamespaceId } from '../model/namespace';
import { Currency, NetworkCurrencies, TokenId, TokenInfo, TokenNames } from '../model/token';
import { ICurrencyService } from './interfaces';

/**
 * A service used to load Currencies objects.
 */
export class CurrencyService implements ICurrencyService {
    constructor(private readonly repositoryFactory: RepositoryFactory) {}

    /**
     * This method loads the network currencies.
     */
    public getNetworkCurrencies(): Observable<NetworkCurrencies> {
        return this.repositoryFactory
            .createNetworkRepository()
            .getNetworkProperties()
            .pipe(
                mergeMap((properties) => {
                    if (!properties.chain.currencyTokenId) {
                        throw new Error('currencyTokenId could not be loaded from network properties!!');
                    }
                    if (!properties.chain.harvestingTokenId) {
                        throw new Error('harvestingTokenId could not be loaded from network properties!!');
                    }
                    const currencyToken = new TokenId(DtoMapping.toSimpleHex(properties.chain.currencyTokenId));
                    const harvestingToken = new TokenId(DtoMapping.toSimpleHex(properties.chain.harvestingTokenId));
                    const tokenIds = currencyToken.equals(harvestingToken) ? [currencyToken] : [currencyToken, harvestingToken];
                    return this.getCurrencies(tokenIds).pipe(
                        map((networkCurrencies) => {
                            const currency = networkCurrencies.filter((c) => currencyToken.equals(c.tokenId))[0];
                            const harvest = networkCurrencies.filter((c) => harvestingToken.equals(c.tokenId))[0];
                            return new NetworkCurrencies(currency, harvest);
                        }),
                    );
                }),
            );
    }

    public getCurrencies(tokenIds: TokenId[]): Observable<Currency[]> {
        const tokenHttp = this.repositoryFactory.createTokenRepository();
        const namespaceHttp = this.repositoryFactory.createNamespaceRepository();

        // get tokenInfo and token names from the network,
        // build network currency models
        return forkJoin({
            tokensInfo: firstValueFrom(tokenHttp.getTokens(tokenIds)),
            tokenNames: firstValueFrom(namespaceHttp.getTokensNames(tokenIds)),
        }).pipe(
            map(({ tokensInfo, tokenNames }) =>
                tokensInfo.map((tokenInfo) => {
                    const thisTokenNames = tokenNames.find((mn) => mn.tokenId.equals(tokenInfo.id)) || new TokenNames(tokenInfo.id, []);
                    return this.getCurrency(tokenInfo, thisTokenNames);
                }),
            ),
        );
    }

    /**
     * Creates a network currency model given token info and token names
     * @param {TokenInfo} tokenInfo
     * @param {TokenNames} tokenName
     * @returns {(Currency | undefined)}
     */
    private getCurrency(tokenInfo: TokenInfo, tokenName: TokenNames): Currency {
        const tokenId = tokenInfo.id;
        const namespaceName = this.getName([tokenName], tokenId);
        const namespaceId = namespaceName ? new NamespaceId(namespaceName) : undefined;
        return new Currency({
            tokenId: tokenId,
            namespaceId: namespaceId,
            divisibility: tokenInfo.divisibility,
            transferable: tokenInfo.flags.transferable,
            supplyMutable: tokenInfo.flags.supplyMutable,
            restrictable: tokenInfo.flags.restrictable,
        });
    }

    private getName(tokenNames: TokenNames[], accountTokenDto: TokenId): string | undefined {
        return tokenNames
            .filter((n) => n.tokenId.equals(accountTokenDto))
            .filter((n) => n.names.length)
            .map((n) => n.names[0].name)?.[0];
    }
}
