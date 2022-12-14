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
exports.ResolutionStatement = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const js_sha3_1 = require("js-sha3");
const UnresolvedMapping_1 = require("../../core/utils/UnresolvedMapping");
const UInt64_1 = require("../UInt64");
const ReceiptType_1 = require("./ReceiptType");
const ReceiptVersion_1 = require("./ReceiptVersion");
const ResolutionType_1 = require("./ResolutionType");
/**
 * When a transaction includes an alias, a so called resolution statement reflects the resolved value for that block:
 * - Address Resolution: An account alias was used in the block.
 * - Token Resolution: A token alias was used in the block.
 */
class ResolutionStatement {
    /**
     * Receipt - resolution statement object
     * @param resolutionType - The resolution type
     * @param height - The block height
     * @param unresolved - An unresolved address or unresolved tokenId.
     * @param resolutionEntries - The array of resolution entries.
     */
    constructor(
    /**
     * Resolution type
     */
    resolutionType, 
    /**
     * The block height.
     */
    height, 
    /**
     * An unresolved address or unresolved tokenId.
     */
    unresolved, 
    /**
     * The array of resolution entries.
     */
    resolutionEntries) {
        this.resolutionType = resolutionType;
        this.height = height;
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    /**
     * Generate receipt hash
     * @param {networkType} the network type serialized in the output.
     * @return {string} receipt hash in hex
     */
    generateHash(networkType) {
        const type = this.resolutionType === ResolutionType_1.ResolutionType.Address ? ReceiptType_1.ReceiptType.Address_Alias_Resolution : ReceiptType_1.ReceiptType.Token_Alias_Resolution;
        const builder = this.resolutionType === ResolutionType_1.ResolutionType.Address
            ? new bitxor_catbuffer_typescript_1.AddressResolutionStatementBuilder(ReceiptVersion_1.ReceiptVersion.RESOLUTION_STATEMENT, type.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedAddressDto(UnresolvedMapping_1.UnresolvedMapping.toUnresolvedAddressBytes(this.unresolved, networkType)), this.resolutionEntries.map((entry) => new bitxor_catbuffer_typescript_1.AddressResolutionEntryBuilder(new bitxor_catbuffer_typescript_1.ReceiptSourceBuilder(entry.source.primaryId, entry.source.secondaryId), entry.resolved.toBuilder())))
            : new bitxor_catbuffer_typescript_1.TokenResolutionStatementBuilder(ReceiptVersion_1.ReceiptVersion.RESOLUTION_STATEMENT, type.valueOf(), new bitxor_catbuffer_typescript_1.UnresolvedTokenIdDto(UInt64_1.UInt64.fromHex(this.unresolved.toHex()).toDTO()), this.resolutionEntries.map((entry) => new bitxor_catbuffer_typescript_1.TokenResolutionEntryBuilder(new bitxor_catbuffer_typescript_1.ReceiptSourceBuilder(entry.source.primaryId, entry.source.secondaryId), entry.resolved.toBuilder())));
        const hasher = js_sha3_1.sha3_256.create();
        hasher.update(builder.serialize());
        return hasher.hex().toUpperCase();
    }
    /**
     * @internal
     * Find resolution entry for given primaryId and secondaryId
     * @param primaryId Primary id
     * @param secondaryId Secondary id
     * @returns {ResolutionEntry | undefined}
     */
    getResolutionEntryById(primaryId, secondaryId) {
        /*
        Primary id and secondary id do not specifically map to the exact transaction index on the same block.
        The ids are just the order of the resolution reflecting on the order of transactions (ordered by index).
        E.g 1 - Bob -> 1 random.token -> Alice
            2 - Carol -> 1 random.token > Denis
        Based on above example, 2 transactions (index 0 & 1) are created on the same block, however, only 1
        resolution entry get generated for both.
        */
        const resolvedPrimaryId = this.getMaxAvailablePrimaryId(primaryId);
        /*
        If no primaryId found, it means there's no resolution entry available for the process. Invalid entry.

        e.g. Given:
        Entries: [{P:2, S:0}, {P:5, S:6}]
        Transaction: [Inx:1(0+1), AggInx:0]
        It should return Entry: undefined
        */
        if (resolvedPrimaryId === 0) {
            return undefined;
        }
        else if (primaryId > resolvedPrimaryId) {
            /*
            If the transaction index is greater than the overall most recent source primary id.
            Use the most recent resolution entry (Max.PrimaryId + Max.SecondaryId)

            e.g. Given:
            Entries: [{P:1, S:0}, {P:2, S:0}, {P:4, S:2}, {P:4, S:4} {P:7, S:6}]
            Transaction: [Inx:5(4+1), AggInx:0]
            It should return Entry: {P:4, S:4}

            e.g. Given:
            Entries: [{P:1, S:0}, {P:2, S:0}, {P:4, S:2}, {P:4, S:4}, {P:7, S:6}]
            Transaction: [Inx:3(2+1), AggInx:0]
            It should return Entry: {P:2, S:0}
            */
            return this.resolutionEntries.find((entry) => entry.source.primaryId === resolvedPrimaryId &&
                entry.source.secondaryId === this.getMaxSecondaryIdByPrimaryId(resolvedPrimaryId));
        }
        // When transaction index matches a primaryId, get the most recent secondaryId (resolvedPrimaryId can only <= primaryId)
        const resolvedSecondaryId = this.getMaxSecondaryIdByPrimaryIdAndSecondaryId(resolvedPrimaryId, secondaryId);
        /*
        If no most recent secondaryId matched transaction index, find previous resolution entry (most recent).
        This means the resolution entry for the specific inner transaction (inside Aggregate) /
        was generated previously outside the aggregate. It should return the previous entry (previous primaryId)

        e.g. Given:
        Entries: [{P:1, S:0}, {P:2, S:0}, {P:5, S:6}]
        Transaction: [Inx:5(4+1), AggInx:3(2+1)]
        It should return Entry: {P:2, S:0}
        */
        if (resolvedSecondaryId === 0 && resolvedSecondaryId !== secondaryId) {
            const lastPrimaryId = this.getMaxAvailablePrimaryId(resolvedPrimaryId - 1);
            return this.resolutionEntries.find((entry) => entry.source.primaryId === lastPrimaryId &&
                entry.source.secondaryId === this.getMaxSecondaryIdByPrimaryId(lastPrimaryId));
        }
        /*
        Found a matched resolution entry on both primaryId and secondaryId

        e.g. Given:
        Entries: [{P:1, S:0}, {P:2, S:0}, {P:5, S:6}]
        Transaction: [Inx:5(4+1), AggInx:6(2+1)]
        It should return Entry: {P:5, S:6}
        */
        return this.resolutionEntries.find((entry) => entry.source.primaryId === resolvedPrimaryId && entry.source.secondaryId === resolvedSecondaryId);
    }
    /**
     * @internal
     * Get max secondary id by a given primaryId
     * @param primaryId Primary source id
     * @returns {number}
     */
    getMaxSecondaryIdByPrimaryId(primaryId) {
        return Math.max(...this.resolutionEntries
            .filter((entry) => entry.source.primaryId === primaryId)
            .map((filtered) => filtered.source.secondaryId));
    }
    /**
     * Get most `recent` available secondary id by a given primaryId
     * @param primaryId Primary source id
     * @param secondaryId Secondary source id
     * @returns {number}
     */
    getMaxSecondaryIdByPrimaryIdAndSecondaryId(primaryId, secondaryId) {
        return Math.max(...this.resolutionEntries
            .filter((entry) => entry.source.primaryId === primaryId)
            .map((filtered) => (secondaryId >= filtered.source.secondaryId ? filtered.source.secondaryId : 0)));
    }
    /**
     * @internal
     * Get most `recent` primary source id by a given id (transaction index) as PrimaryId might not be the same as block transaction index.
     * @param primaryId Primary source id
     * @returns {number}
     */
    getMaxAvailablePrimaryId(primaryId) {
        return Math.max(...this.resolutionEntries.map((entry) => (primaryId >= entry.source.primaryId ? entry.source.primaryId : 0)));
    }
}
exports.ResolutionStatement = ResolutionStatement;
//# sourceMappingURL=ResolutionStatement.js.map