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

import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { Token } from './Token';
import { TokenId } from './TokenId';
import { UnresolvedTokenId } from './UnresolvedTokenId';

/**
 * An object that knows how to create Tokens based on the Token Info and Namespace configuration.
 */
export class Currency {
    /**
     * Currency for public / Public_test network.
     *
     * This represents the per-network currency token. This tokenId is aliased with namespace name `bitxor`.
     *
     * This simplifies offline operations but general applications should load the currency from the repository factory and network currency service.
     *
     * If you are creating a private network and you need offline access, you can create a Currency in memory.
     *
     */
    public static readonly PUBLIC = new Currency({
        namespaceId: new NamespaceId('bitxor'),
        divisibility: 6,
        transferable: true,
        supplyMutable: false,
        restrictable: false,
    });

    /**
     * The selected unresolved token id used when creating {@link Token}. This could either be the
     * Namespace or the Token id.
     */
    public readonly unresolvedTokenId: UnresolvedTokenId;
    /**
     * Token id of this currency. This value is optional if the user only wants to provide the token
     * id. This value will be set if it's loaded by rest.
     */
    public readonly tokenId?: TokenId;
    /**
     * The Namespace id of this currency. This value is option if the user only wants to provide the
     * namespace id. This value will be set if it's loaded by rest.
     */
    public readonly namespaceId?: NamespaceId;

    /** Divisibility of this currency, required to create Token from relative amounts. */
    public readonly divisibility: number;

    /** Is this currency transferable. */
    public readonly transferable: boolean;

    /** Is this currency supply mutable. */
    public readonly supplyMutable: boolean;

    /** Is this currency restrictable. */
    public readonly restrictable: boolean;

    constructor({
        unresolvedTokenId,
        tokenId,
        namespaceId,
        divisibility,
        transferable,
        supplyMutable,
        restrictable,
    }: {
        unresolvedTokenId?: UnresolvedTokenId;
        tokenId?: TokenId;
        namespaceId?: NamespaceId;
        divisibility: number;
        transferable: boolean;
        supplyMutable: boolean;
        restrictable: boolean;
    }) {
        // If unresolvedTokenId is not provided explicitly, token id wins over namespace id for performace reasons.
        const finalTokenId = unresolvedTokenId || tokenId || namespaceId;
        if (!finalTokenId) {
            throw new Error('At least one Token Id or Namespace Id must be provided');
        }
        this.unresolvedTokenId = finalTokenId;
        this.tokenId = tokenId;
        this.namespaceId = namespaceId;
        this.divisibility = divisibility;
        this.transferable = transferable;
        this.supplyMutable = supplyMutable;
        this.restrictable = restrictable;
    }

    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    public createRelative(amount: UInt64 | number): Token {
        if (typeof amount === 'number') {
            return new Token(this.unresolvedTokenId, UInt64.fromUint(amount * Math.pow(10, this.divisibility)));
        }
        return new Token(this.unresolvedTokenId, UInt64.fromUint((amount as UInt64).compact() * Math.pow(10, this.divisibility)));
    }

    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    public createAbsolute(amount: UInt64 | number): Token {
        if (typeof amount === 'number') {
            return new Token(this.unresolvedTokenId, UInt64.fromUint(amount));
        }
        return new Token(this.unresolvedTokenId, amount);
    }
}
