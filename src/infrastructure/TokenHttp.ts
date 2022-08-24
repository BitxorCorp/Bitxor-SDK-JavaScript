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

import { TokenInfoDTO, TokenRoutesApi } from 'bitxor-openapi-typescript-fetch-client';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DtoMapping } from '../core/utils/DtoMapping';
import { MerkleStateInfo } from '../model/blockchain';
import { NetworkType } from '../model/network/NetworkType';
import { TokenFlags } from '../model/token/TokenFlags';
import { TokenId } from '../model/token/TokenId';
import { TokenInfo } from '../model/token/TokenInfo';
import { UInt64 } from '../model/UInt64';
import { Http } from './Http';
import { Page } from './Page';
import { TokenPaginationStreamer } from './paginationStreamer';
import { TokenSearchCriteria } from './searchCriteria/TokenSearchCriteria';
import { TokenRepository } from './TokenRepository';

/**
 * Token http repository.
 *
 * @since 1.0
 */
export class TokenHttp extends Http implements TokenRepository {
    /**
     * @internal
     * Bitxor openapi typescript-node client token routes api
     */
    private readonly tokenRoutesApi: TokenRoutesApi;

    /**
     * @internal
     * network type for the mappings.
     */
    private readonly networkTypeObservable: Observable<NetworkType>;

    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param networkType the network type.
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, networkType?: NetworkType | Observable<NetworkType>, fetchApi?: any) {
        super(url, fetchApi);
        this.tokenRoutesApi = new TokenRoutesApi(this.config());
        this.networkTypeObservable = this.createNetworkTypeObservable(networkType);
    }

    /**
     * Gets the TokenInfo for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<TokenInfo>
     */
    public getToken(tokenId: TokenId): Observable<TokenInfo> {
        return this.call(this.tokenRoutesApi.getToken(tokenId.toHex()), (body) => TokenHttp.toTokenInfo(body));
    }

    /**
     * Gets TokenInfo for different tokenIds.
     * @param tokenIds - Array of token ids
     * @returns Observable<TokenInfo[]>
     */
    public getTokens(tokenIds: TokenId[]): Observable<TokenInfo[]> {
        return this.call(
            this.tokenRoutesApi.getTokens({
                tokenIds: tokenIds.map((id) => id.toHex()),
            }),
            (body) => body.map((b) => TokenHttp.toTokenInfo(b)),
        );
    }

    /**
     * Gets a TokenInfo merkle for a given tokenId
     * @param tokenId - Token id
     * @returns Observable<MerkleStateInfo>
     */
    public getTokenMerkle(tokenId: TokenId): Observable<MerkleStateInfo> {
        return this.call(this.tokenRoutesApi.getTokenMerkle(tokenId.toHex()), DtoMapping.toMerkleStateInfo);
    }

    /**
     * Gets an array of tokens.
     * @summary Get tokens created for given address
     * @param criteria Token search criteria
     * @returns {Page<TokenInfo>}
     */
    public search(criteria: TokenSearchCriteria): Observable<Page<TokenInfo>> {
        return this.networkTypeObservable.pipe(
            mergeMap((networkType) =>
                this.call(
                    this.tokenRoutesApi.searchTokens(
                        criteria.ownerAddress?.plain(),
                        criteria.pageSize,
                        criteria.pageNumber,
                        criteria.offset,
                        DtoMapping.mapEnum(criteria.order),
                    ),
                    (body) => super.toPage(body.pagination, body.data, TokenHttp.toTokenInfo, networkType),
                ),
            ),
        );
    }

    public streamer(): TokenPaginationStreamer {
        return new TokenPaginationStreamer(this);
    }

    /**
     * Maps TokenInfoDTO to TokenInfo
     *
     * @param tokenInfo the dto object.
     * @returns the model object
     */
    public static toTokenInfo(tokenInfo: TokenInfoDTO): TokenInfo {
        return new TokenInfo(
            tokenInfo.token.version || 1,
            tokenInfo.id,
            new TokenId(tokenInfo.token.id),
            UInt64.fromNumericString(tokenInfo.token.supply),
            UInt64.fromNumericString(tokenInfo.token.startHeight),
            DtoMapping.toAddress(tokenInfo.token.ownerAddress),
            tokenInfo.token.revision,
            new TokenFlags(tokenInfo.token.flags),
            tokenInfo.token.divisibility,
            UInt64.fromNumericString(tokenInfo.token.duration),
        );
    }
}
