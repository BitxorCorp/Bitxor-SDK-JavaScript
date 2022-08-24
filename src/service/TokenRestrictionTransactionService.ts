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

import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NamespaceRepository } from '../infrastructure/NamespaceRepository';
import { Page } from '../infrastructure/Page';
import { RestrictionTokenRepository } from '../infrastructure/RestrictionTokenRepository';
import { NamespaceId, TokenAddressRestriction, TokenRestrictionEntryType } from '../model';
import { Address } from '../model/account/Address';
import { UnresolvedAddress } from '../model/account/UnresolvedAddress';
import { NetworkType } from '../model/network/NetworkType';
import { TokenGlobalRestriction } from '../model/restriction/TokenGlobalRestriction';
import { TokenGlobalRestrictionItem } from '../model/restriction/TokenGlobalRestrictionItem';
import { TokenRestrictionType } from '../model/restriction/TokenRestrictionType';
import { TokenId } from '../model/token/TokenId';
import { UnresolvedTokenId } from '../model/token/UnresolvedTokenId';
import { Deadline } from '../model/transaction/Deadline';
import { TokenAddressRestrictionTransaction } from '../model/transaction/TokenAddressRestrictionTransaction';
import { TokenGlobalRestrictionTransaction } from '../model/transaction/TokenGlobalRestrictionTransaction';
import { Transaction } from '../model/transaction/Transaction';
import { UInt64 } from '../model/UInt64';

/**
 * TokenRestrictionTransactionService service
 */
export class TokenRestrictionTransactionService {
    private readonly defaultTokenAddressRestrictionValue = UInt64.fromHex('FFFFFFFFFFFFFFFF');
    private readonly defaultTokenGlobalRestrictionValue = UInt64.fromUint(0);

    /**
     * Constructor
     * @param restrictionTokenRepository
     * @param namespaceRepository
     */
    constructor(
        private readonly restrictionTokenRepository: RestrictionTokenRepository,
        private readonly namespaceRepository: NamespaceRepository,
    ) {}

    /**
     * Create a TokenGlobalRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param restrictionValue - New restriction value
     * @param restrictionType - New restriction type
     * @param referenceTokenId - Reference token Id
     * @param maxFee - Max fee
     */
    public createTokenGlobalRestrictionTransaction(
        deadline: Deadline,
        networkType: NetworkType,
        tokenId: UnresolvedTokenId,
        restrictionKey: UInt64,
        restrictionValue: string,
        restrictionType: TokenRestrictionType,
        referenceTokenId: UnresolvedTokenId = new TokenId(UInt64.fromUint(0).toDTO()),
        maxFee: UInt64 = new UInt64([0, 0]),
    ): Observable<Transaction> {
        this.validateInput(restrictionValue);
        return this.getResolvedTokenId(tokenId).pipe(
            mergeMap((resolvedTokenId) =>
                this.getGlobalRestrictionEntry(resolvedTokenId, restrictionKey).pipe(
                    map((restrictionEntry: TokenGlobalRestrictionItem | undefined) => {
                        const currentValue = restrictionEntry ? restrictionEntry.restrictionValue : this.defaultTokenGlobalRestrictionValue;
                        const currentType = restrictionEntry ? restrictionEntry.restrictionType : TokenRestrictionType.NONE;
                        return TokenGlobalRestrictionTransaction.create(
                            deadline,
                            resolvedTokenId,
                            restrictionKey,
                            currentValue,
                            currentType,
                            UInt64.fromNumericString(restrictionValue),
                            restrictionType,
                            networkType,
                            referenceTokenId,
                            maxFee,
                        );
                    }),
                ),
            ),
        );
    }

    /**
     * Create a TokenAddressRestrictionTransaction object without previous restriction data
     * @param deadline - Deadline
     * @param networkType - Network identifier
     * @param tokenId - Unresolved tokenId
     * @param restrictionKey - Restriction key
     * @param targetAddress - Unresolved target address
     * @param restrictionValue - New restriction value
     * @param maxFee - Max fee
     */
    public createTokenAddressRestrictionTransaction(
        deadline: Deadline,
        networkType: NetworkType,
        tokenId: UnresolvedTokenId,
        restrictionKey: UInt64,
        targetAddress: UnresolvedAddress,
        restrictionValue: string,
        maxFee: UInt64 = new UInt64([0, 0]),
    ): Observable<Transaction> {
        this.validateInput(restrictionValue);
        const combinedUnresolved = combineLatest([this.getResolvedTokenId(tokenId), this.getResolvedAddress(targetAddress)]);
        return combinedUnresolved.pipe(
            mergeMap(([resolvedTokenId, resolvedAddress]) =>
                this.getGlobalRestrictionEntry(resolvedTokenId, restrictionKey).pipe(
                    mergeMap((restrictionEntry: TokenGlobalRestrictionItem | undefined) => {
                        if (!restrictionEntry) {
                            throw new Error(
                                `Global restriction for token: ${tokenId.toHex()} is not valid for with RestrictionKey: ${restrictionKey}`,
                            );
                        }
                        return this.getAddressRestrictionEntry(resolvedTokenId, restrictionKey, resolvedAddress).pipe(
                            map((optionalValue) => {
                                const currentValue = optionalValue || this.defaultTokenAddressRestrictionValue;
                                return TokenAddressRestrictionTransaction.create(
                                    deadline,
                                    tokenId,
                                    restrictionKey,
                                    targetAddress,
                                    UInt64.fromNumericString(restrictionValue),
                                    networkType,
                                    currentValue,
                                    maxFee,
                                );
                            }),
                        );
                    }),
                ),
            ),
        );
    }

    /**
     * Get address global restriction previous value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @param targetAddress - The target address
     * @return {Observable<string | undefined>}
     */
    private getAddressRestrictionEntry(tokenId: TokenId, restrictionKey: UInt64, targetAddress: Address): Observable<UInt64 | undefined> {
        return this.restrictionTokenRepository.search({ tokenId, targetAddress, entryType: TokenRestrictionEntryType.ADDRESS }).pipe(
            map((tokenRestriction) => {
                const addressRestriction = tokenRestriction.data.find(
                    (r) =>
                        r.entryType == TokenRestrictionEntryType.ADDRESS &&
                        r.tokenId.equals(tokenId) &&
                        (r as TokenAddressRestriction).targetAddress.equals(targetAddress),
                );
                return addressRestriction ? addressRestriction.getRestriction(restrictionKey)?.restrictionValue : undefined;
            }),
        );
    }

    /**
     * Get token global restriction prvious value and type
     * @param tokenId - Token identifier
     * @param restrictionKey - Token global restriction key
     * @return {Observable<TokenGlobalRestrictionItem | undefined>}
     */
    private getGlobalRestrictionEntry(tokenId: TokenId, restrictionKey: UInt64): Observable<TokenGlobalRestrictionItem | undefined> {
        return this.restrictionTokenRepository.search({ tokenId, entryType: TokenRestrictionEntryType.GLOBAL }).pipe(
            map((tokenRestrictionPage: Page<TokenGlobalRestriction>) => {
                const globalRestriction = tokenRestrictionPage.data.find(
                    (r) => r.entryType == TokenRestrictionEntryType.GLOBAL && r.tokenId.equals(tokenId),
                );
                return globalRestriction ? globalRestriction.getRestriction(restrictionKey) : undefined;
            }),
        );
    }

    /**
     * Check if input restriction key and value are invalid or not
     * @param value - Restriction value
     */
    private validateInput(value: string): void {
        if (!UInt64.isLongNumericString(value)) {
            throw new Error(`RestrictionValue: ${value} is not a valid numeric string.`);
        }
    }

    /**
     * @internal
     * Get resolved tokenId from namespace repository
     * @param unresolvedTokenId unresolved tokenId
     * @returns {TokenId}
     */
    private getResolvedTokenId(unresolvedTokenId: UnresolvedTokenId): Observable<TokenId> {
        if (!unresolvedTokenId.isNamespaceId()) {
            return of(unresolvedTokenId as TokenId);
        }
        const namespaceId = unresolvedTokenId as NamespaceId;
        return this.namespaceRepository.getLinkedTokenId(namespaceId).pipe(
            map((tokenId) => {
                if (!tokenId) {
                    throw new Error(`Invalid unresolvedTokenId: ${unresolvedTokenId.toHex()}`);
                }
                return tokenId;
            }),
            catchError((err) => {
                throw new Error(err);
            }),
        );
    }

    /**
     * @internal
     * Get resolved address from namespace repository
     * @param unresolvedAddress unresolved address
     * @returns {Address}
     */
    private getResolvedAddress(unresolvedAddress: UnresolvedAddress): Observable<Address> {
        if (!unresolvedAddress.isNamespaceId()) {
            return of(unresolvedAddress as Address);
        }

        const namespaceId = unresolvedAddress as NamespaceId;
        return this.namespaceRepository.getLinkedAddress(namespaceId).pipe(
            map((address) => {
                if (!address) {
                    throw new Error(`Invalid unresolvedAddress: ${namespaceId.toHex()}`);
                }
                return address;
            }),
            catchError((err) => {
                throw new Error(err);
            }),
        );
    }
}
