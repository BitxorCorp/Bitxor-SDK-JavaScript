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

import { Address } from '../account/Address';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { NamespaceId } from '../namespace/NamespaceId';
import { Token } from '../token/Token';
import { TokenId } from '../token/TokenId';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { AddressResolutionStatement, TokenIdResolutionStatement } from './ResolutionStatement';
import { ResolutionType } from './ResolutionType';
import { TransactionStatement } from './TransactionStatement';

export class Statement {
    /**
     * Receipt - transaction statement object
     * @param transactionStatements - The transaction statements.
     * @param addressResolutionStatements - The address resolution statements.
     * @param tokenResolutionStatements - The token resolution statements.
     */
    constructor(
        /**
         * The transaction statements.
         */
        public readonly transactionStatements: TransactionStatement[],
        /**
         * The address resolution statements.
         */
        public readonly addressResolutionStatements: AddressResolutionStatement[],
        /**
         * The token resolution statements.
         */
        public readonly tokenResolutionStatements: TokenIdResolutionStatement[],
    ) {}

    /**
     * Resolve unresolvedAddress from statement
     * @param unresolvedAddress Unresolved address
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Address}
     */
    public resolveAddress(
        unresolvedAddress: UnresolvedAddress,
        height: string,
        transactionIndex: number,
        aggregateTransactionIndex = 0,
    ): Address {
        return unresolvedAddress.isNamespaceId()
            ? (this.getResolvedFromReceipt(
                  ResolutionType.Address,
                  unresolvedAddress as NamespaceId,
                  transactionIndex,
                  height,
                  aggregateTransactionIndex,
              ) as Address)
            : (unresolvedAddress as Address);
    }

    /**
     * Resolve unresolvedTokenId from statement
     * @param unresolvedTokenId Unresolved token id
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {TokenId}
     */
    public resolveTokenId(
        unresolvedTokenId: UnresolvedTokenId,
        height: string,
        transactionIndex: number,
        aggregateTransactionIndex = 0,
    ): TokenId {
        return unresolvedTokenId.isNamespaceId()
            ? (this.getResolvedFromReceipt(
                  ResolutionType.Token,
                  unresolvedTokenId as NamespaceId,
                  transactionIndex,
                  height,
                  aggregateTransactionIndex,
              ) as TokenId)
            : (unresolvedTokenId as TokenId);
    }

    /**
     * Resolve unresolvedToken from statement
     * @param unresolvedToken Unresolved token
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Token}
     */
    public resolveToken(unresolvedToken: Token, height: string, transactionIndex: number, aggregateTransactionIndex = 0): Token {
        return unresolvedToken.id.isNamespaceId()
            ? new Token(
                  this.getResolvedFromReceipt(
                      ResolutionType.Token,
                      unresolvedToken.id as NamespaceId,
                      transactionIndex,
                      height,
                      aggregateTransactionIndex,
                  ) as TokenId,
                  unresolvedToken.amount,
              )
            : unresolvedToken;
    }

    /**
     * @internal
     * Extract resolved address | token from block receipt
     * @param resolutionType Resolution type: Address / Token
     * @param unresolved Unresolved address / tokenId
     * @param transactionIndex Transaction index
     * @param height Transaction height
     * @param aggregateTransactionIndex Transaction index for aggregate
     * @returns {TokenId | Address}
     */
    private getResolvedFromReceipt(
        resolutionType: ResolutionType,
        unresolved: NamespaceId,
        transactionIndex: number,
        height: string,
        aggregateTransactionIndex?: number,
    ): TokenId | Address {
        const list: (AddressResolutionStatement | TokenIdResolutionStatement)[] =
            resolutionType === ResolutionType.Address ? this.addressResolutionStatements : this.tokenResolutionStatements;

        const filter = (resolution: AddressResolutionStatement | TokenIdResolutionStatement): boolean =>
            resolution.height.toString() === height && (resolution.unresolved as NamespaceId).equals(unresolved);

        const resolutionStatement = list.find(filter);

        if (!resolutionStatement) {
            throw new Error(`No resolution statement found on block: ${height} for unresolved: ${unresolved.toHex()}`);
        }

        // If only one entry exists on the statement, just return
        if (resolutionStatement.resolutionEntries.length === 1) {
            return resolutionStatement.resolutionEntries[0].resolved;
        }

        // Get the most recent resolution entry
        const resolutionEntry = resolutionStatement.getResolutionEntryById(
            aggregateTransactionIndex !== undefined ? aggregateTransactionIndex + 1 : transactionIndex + 1,
            aggregateTransactionIndex !== undefined ? transactionIndex + 1 : 0,
        );

        if (!resolutionEntry) {
            throw new Error(`No resolution entry found on block: ${height} for unresolved: ${unresolved.toHex()}`);
        }
        return resolutionEntry.resolved;
    }
}
