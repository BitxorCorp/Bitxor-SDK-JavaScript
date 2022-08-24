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

import {
    RestrictionTokenRoutesApi,
    TokenAddressRestrictionDTO,
    TokenAddressRestrictionEntryDTO,
    TokenGlobalRestrictionDTO,
    TokenGlobalRestrictionEntryDTO,
} from 'bitxor-openapi-typescript-fetch-client';
import { Observable } from 'rxjs';
import { DtoMapping } from '../core/utils';
import { MerkleStateInfo, UInt64 } from '../model';
import {
    TokenAddressRestriction,
    TokenAddressRestrictionItem,
    TokenGlobalRestriction,
    TokenGlobalRestrictionItem,
} from '../model/restriction';
import { TokenRestriction } from '../model/restriction/TokenRestriction';
import { TokenId } from '../model/token';
import { Http } from './Http';
import { Page } from './Page';
import { RestrictionTokenPaginationStreamer } from './paginationStreamer';
import { RestrictionTokenRepository } from './RestrictionTokenRepository';
import { RestrictionTokenSearchCriteria } from './searchCriteria';

/**
 * RestrictionToken http repository.
 *
 * @since 1.0
 */
export class RestrictionTokenHttp extends Http implements RestrictionTokenRepository {
    /**
     * @internal
     */
    private restrictionTokenRoutesApi: RestrictionTokenRoutesApi;

    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any) {
        super(url, fetchApi);
        this.restrictionTokenRoutesApi = new RestrictionTokenRoutesApi(this.config());
    }

    /**
     * Returns a token restrictions page based on the criteria.
     *
     * @param criteria the criteria
     * @return a page of {@link TokenRestriction}
     */
    public search(criteria: RestrictionTokenSearchCriteria): Observable<Page<TokenRestriction>> {
        return this.call(
            this.restrictionTokenRoutesApi.searchTokenRestrictions(
                criteria.tokenId?.toHex(),
                criteria.entryType?.valueOf(),
                criteria.targetAddress?.plain(),
                criteria.pageSize,
                criteria.pageNumber,
                criteria.offset,
                DtoMapping.mapEnum(criteria.order),
            ),
            (body) => super.toPage(body.pagination, body.data, (r) => RestrictionTokenHttp.toTokenRestriction(r)),
        );
    }

    public streamer(): RestrictionTokenPaginationStreamer {
        return new RestrictionTokenPaginationStreamer(this);
    }

    /**
     * This method maps a token restriction dto from rest to the SDK's model object.
     *
     * @internal
     * @param {TokenAddressRestrictionDTO | TokenGlobalRestrictionDTO} dto the restriction object from rest.
     * @returns {TokenRestriction} a restriction model
     */
    public static toTokenRestriction(dto: TokenAddressRestrictionDTO | TokenGlobalRestrictionDTO): TokenRestriction {
        if ((dto.tokenRestrictionEntry as any).targetAddress) {
            const addressRestrictionDto = dto as TokenAddressRestrictionDTO;
            return new TokenAddressRestriction(
                dto.tokenRestrictionEntry.version || 1,
                dto.tokenRestrictionEntry.compositeHash,
                dto.tokenRestrictionEntry.entryType.valueOf(),
                new TokenId(dto.tokenRestrictionEntry.tokenId),
                DtoMapping.toAddress(addressRestrictionDto.tokenRestrictionEntry.targetAddress),
                addressRestrictionDto.tokenRestrictionEntry.restrictions.map(RestrictionTokenHttp.toTokenAddressRestrictionItem),
            );
        }

        const globalRestrictionDto = dto as TokenGlobalRestrictionDTO;
        return new TokenGlobalRestriction(
            dto.tokenRestrictionEntry.version || 1,
            dto.tokenRestrictionEntry.compositeHash,
            dto.tokenRestrictionEntry.entryType.valueOf(),
            new TokenId(dto.tokenRestrictionEntry.tokenId),
            globalRestrictionDto.tokenRestrictionEntry.restrictions.map((i) => RestrictionTokenHttp.toTokenGlobalRestrictionItem(i)),
        );
    }

    private static toTokenGlobalRestrictionItem(restriction: TokenGlobalRestrictionEntryDTO): TokenGlobalRestrictionItem {
        return new TokenGlobalRestrictionItem(
            UInt64.fromNumericString(restriction.key),
            new TokenId(restriction.restriction.referenceTokenId),
            UInt64.fromNumericString(restriction.restriction.restrictionValue),
            restriction.restriction.restrictionType.valueOf(),
        );
    }

    private static toTokenAddressRestrictionItem(restriction: TokenAddressRestrictionEntryDTO): TokenAddressRestrictionItem {
        return new TokenAddressRestrictionItem(UInt64.fromNumericString(restriction.key), UInt64.fromNumericString(restriction.value));
    }

    public getTokenRestrictions(compositeHash: string): Observable<TokenRestriction> {
        return this.call(this.restrictionTokenRoutesApi.getTokenRestrictions(compositeHash), RestrictionTokenHttp.toTokenRestriction);
    }

    public getTokenRestrictionsMerkle(compositeHash: string): Observable<MerkleStateInfo> {
        return this.call(this.restrictionTokenRoutesApi.getTokenRestrictionsMerkle(compositeHash), DtoMapping.toMerkleStateInfo);
    }
}
