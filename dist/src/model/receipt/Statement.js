"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const Token_1 = require("../token/Token");
const ResolutionType_1 = require("./ResolutionType");
class Statement {
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
    transactionStatements, 
    /**
     * The address resolution statements.
     */
    addressResolutionStatements, 
    /**
     * The token resolution statements.
     */
    tokenResolutionStatements) {
        this.transactionStatements = transactionStatements;
        this.addressResolutionStatements = addressResolutionStatements;
        this.tokenResolutionStatements = tokenResolutionStatements;
    }
    /**
     * Resolve unresolvedAddress from statement
     * @param unresolvedAddress Unresolved address
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Address}
     */
    resolveAddress(unresolvedAddress, height, transactionIndex, aggregateTransactionIndex = 0) {
        return unresolvedAddress.isNamespaceId()
            ? this.getResolvedFromReceipt(ResolutionType_1.ResolutionType.Address, unresolvedAddress, transactionIndex, height, aggregateTransactionIndex)
            : unresolvedAddress;
    }
    /**
     * Resolve unresolvedTokenId from statement
     * @param unresolvedTokenId Unresolved token id
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {TokenId}
     */
    resolveTokenId(unresolvedTokenId, height, transactionIndex, aggregateTransactionIndex = 0) {
        return unresolvedTokenId.isNamespaceId()
            ? this.getResolvedFromReceipt(ResolutionType_1.ResolutionType.Token, unresolvedTokenId, transactionIndex, height, aggregateTransactionIndex)
            : unresolvedTokenId;
    }
    /**
     * Resolve unresolvedToken from statement
     * @param unresolvedToken Unresolved token
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Token}
     */
    resolveToken(unresolvedToken, height, transactionIndex, aggregateTransactionIndex = 0) {
        return unresolvedToken.id.isNamespaceId()
            ? new Token_1.Token(this.getResolvedFromReceipt(ResolutionType_1.ResolutionType.Token, unresolvedToken.id, transactionIndex, height, aggregateTransactionIndex), unresolvedToken.amount)
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
    getResolvedFromReceipt(resolutionType, unresolved, transactionIndex, height, aggregateTransactionIndex) {
        const list = resolutionType === ResolutionType_1.ResolutionType.Address ? this.addressResolutionStatements : this.tokenResolutionStatements;
        const filter = (resolution) => resolution.height.toString() === height && resolution.unresolved.equals(unresolved);
        const resolutionStatement = list.find(filter);
        if (!resolutionStatement) {
            throw new Error(`No resolution statement found on block: ${height} for unresolved: ${unresolved.toHex()}`);
        }
        // If only one entry exists on the statement, just return
        if (resolutionStatement.resolutionEntries.length === 1) {
            return resolutionStatement.resolutionEntries[0].resolved;
        }
        // Get the most recent resolution entry
        const resolutionEntry = resolutionStatement.getResolutionEntryById(aggregateTransactionIndex !== undefined ? aggregateTransactionIndex + 1 : transactionIndex + 1, aggregateTransactionIndex !== undefined ? transactionIndex + 1 : 0);
        if (!resolutionEntry) {
            throw new Error(`No resolution entry found on block: ${height} for unresolved: ${unresolved.toHex()}`);
        }
        return resolutionEntry.resolved;
    }
}
exports.Statement = Statement;
//# sourceMappingURL=Statement.js.map