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

import { ReceiptRoutesApi } from 'bitxor-openapi-typescript-fetch-client';
import { Observable } from 'rxjs';
import { DtoMapping } from '../core/utils/DtoMapping';
import { AddressResolutionStatement, TokenIdResolutionStatement } from '../model/receipt/ResolutionStatement';
import { TransactionStatement } from '../model/receipt/TransactionStatement';
import { Http } from './Http';
import { Page } from './Page';
import {
    createAddressResolutionStatement,
    createTokenResolutionStatement,
    createTransactionStatement,
} from './receipt/CreateReceiptFromDTO';
import { ReceiptRepository } from './ReceiptRepository';
import { ResolutionStatementSearchCriteria } from './searchCriteria/ResolutionStatementSearchCriteria';
import { TransactionStatementSearchCriteria } from './searchCriteria/TransactionStatementSearchCriteria';

/**
 * Receipt http repository.
 *
 * @since 1.0
 */
export class ReceiptHttp extends Http implements ReceiptRepository {
    /**
     * @internal
     * Bitxor openapi typescript-node client receipt routes api
     */
    private readonly receiptRoutesApi: ReceiptRoutesApi;

    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url: string, fetchApi?: any) {
        super(url, fetchApi);
        this.receiptRoutesApi = new ReceiptRoutesApi(this.config());
    }

    searchAddressResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<AddressResolutionStatement>> {
        return this.call(
            this.receiptRoutesApi.searchAddressResolutionStatements(
                criteria.height?.toString(),
                criteria.pageSize,
                criteria.pageNumber,
                criteria.offset,
                DtoMapping.mapEnum(criteria.order),
            ),
            (body) => super.toPage(body.pagination, body.data, createAddressResolutionStatement),
        );
    }

    searchTokenResolutionStatements(criteria: ResolutionStatementSearchCriteria): Observable<Page<TokenIdResolutionStatement>> {
        return this.call(
            this.receiptRoutesApi.searchTokenResolutionStatements(
                criteria.height?.toString(),
                criteria.pageSize,
                criteria.pageNumber,
                criteria.offset,
                DtoMapping.mapEnum(criteria.order),
            ),
            (body) => super.toPage(body.pagination, body.data, createTokenResolutionStatement),
        );
    }

    searchReceipts(criteria: TransactionStatementSearchCriteria): Observable<Page<TransactionStatement>> {
        return this.call(
            this.receiptRoutesApi.searchReceipts(
                criteria.height?.toString(),
                criteria.fromHeight?.toString(),
                criteria.toHeight?.toString(),
                criteria.receiptTypes?.map((t) => t.valueOf()),
                criteria.recipientAddress?.plain(),
                criteria.senderAddress?.plain(),
                criteria.targetAddress?.plain(),
                criteria.artifactId?.toHex(),
                criteria.pageSize,
                criteria.pageNumber,
                criteria.offset,
                DtoMapping.mapEnum(criteria.order),
            ),
            (body) => super.toPage(body.pagination, body.data, createTransactionStatement),
        );
    }
}
