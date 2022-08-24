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
exports.DtoMapping = void 0;
const core_1 = require("@js-joda/core");
const Address_1 = require("../../model/account/Address");
const MerkleStateInfo_1 = require("../../model/blockchain/MerkleStateInfo");
const AccountRestriction_1 = require("../../model/restriction/AccountRestriction");
const AccountRestrictions_1 = require("../../model/restriction/AccountRestrictions");
const AddressRestrictionFlag_1 = require("../../model/restriction/AddressRestrictionFlag");
const OperationRestrictionFlag_1 = require("../../model/restriction/OperationRestrictionFlag");
const TokenRestrictionFlag_1 = require("../../model/restriction/TokenRestrictionFlag");
const MerkleTree_1 = require("../../model/state/MerkleTree");
const MerkleTreeBranch_1 = require("../../model/state/MerkleTreeBranch");
const MerkleTreeBranchLink_1 = require("../../model/state/MerkleTreeBranchLink");
const MerkleTreeLeaf_1 = require("../../model/state/MerkleTreeLeaf");
const MerkleTreeNodeType_1 = require("../../model/state/MerkleTreeNodeType");
const TokenId_1 = require("../../model/token/TokenId");
const format_1 = require("../format");
class DtoMapping {
    /**
     * Create AccountRestrictionsInfo class from Json.
     * @param accountRestrictions.
     * @returns {module: model/Account/AccountRestrictions} The AccountRestrictionsInfo class.
     */
    static extractAccountRestrictionFromDto(accountRestrictions) {
        return new AccountRestrictions_1.AccountRestrictions(accountRestrictions.accountRestrictions.version || 1, accountRestrictions['id'], DtoMapping.toAddress(accountRestrictions.accountRestrictions.address), accountRestrictions.accountRestrictions.restrictions.map((prop) => {
            const restrictionFlags = prop.restrictionFlags;
            switch (restrictionFlags) {
                case AddressRestrictionFlag_1.AddressRestrictionFlag.AllowIncomingAddress:
                case AddressRestrictionFlag_1.AddressRestrictionFlag.BlockIncomingAddress:
                case AddressRestrictionFlag_1.AddressRestrictionFlag.AllowOutgoingAddress:
                case AddressRestrictionFlag_1.AddressRestrictionFlag.BlockOutgoingAddress:
                    return new AccountRestriction_1.AccountRestriction(restrictionFlags, prop.values.map((value) => DtoMapping.toAddress(value)));
                case TokenRestrictionFlag_1.TokenRestrictionFlag.AllowToken:
                case TokenRestrictionFlag_1.TokenRestrictionFlag.BlockToken:
                    return new AccountRestriction_1.AccountRestriction(restrictionFlags, prop.values.map((value) => new TokenId_1.TokenId(value)));
                case OperationRestrictionFlag_1.OperationRestrictionFlag.AllowOutgoingTransactionType:
                case OperationRestrictionFlag_1.OperationRestrictionFlag.BlockOutgoingTransactionType:
                    return new AccountRestriction_1.AccountRestriction(restrictionFlags, prop.values.map((value) => value));
                default:
                    throw new Error(`Invalid restriction type: ${restrictionFlags}`);
            }
        }));
    }
    /**
     * This method knows how to convert an address payload sent by Rest to Address.
     *
     * Currently rest sends hex encoded addresses, it is desired to use base32 encoded addresses.
     *
     * This method handles both format, encoded (deprecated) and base32 encoded addresses.
     *
     * Clients using this SDK will be able to process both payloads.
     *
     * @param value the address in encoded (6823BB7C3C089D996585466380EDBDC19D4959184893E38C) format or decoded/plain format (SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3)
     * @return the Address object.
     */
    static toAddress(value) {
        return format_1.Convert.isHexString(value, 48) ? Address_1.Address.createFromEncoded(value) : Address_1.Address.createFromRawAddress(value);
    }
    /**
     * Creates a copy of the first object adding the attributes of the second object.
     * @param object the object to be cloned
     * @param attributes the extra attributes to be added to the object.
     * @returns a copy of the first object with the new attributes added.
     */
    static assign(object, attributes) {
        return Object.assign({ __proto__: Object.getPrototypeOf(object) }, object, attributes);
    }
    /**
     * Map one enum type to another by value
     * @param value enum value to be mapped
     */
    static mapEnum(value) {
        return value;
    }
    /**
     * It parse a server time/duration configuration like: - 1000ms 1000 milliseconds - 15s 15 seconds
     * - 5m 5 minutes - 2h 2 hours - 10d 10 days
     *
     * <p>into a @{@link Duration} object
     *
     * @param serverValue time.
     * @return {Duration} an instant from that value.
     */
    static parseServerDuration(serverValue) {
        const preprocessedValue = serverValue.replace(`'`, '').trim();
        const patten = `([0-9]+)([hdms]+)[:\\s]?`;
        const regex = new RegExp(patten, 'g');
        // if the input doesn't match the patten, don't bother to do loop
        if (!preprocessedValue.match(patten)) {
            throw new Error('Duration value format is not recognized.');
        }
        let duration = core_1.Duration.ofSeconds(0);
        let match;
        const types = [];
        let matchGroups = '';
        while ((match = regex.exec(preprocessedValue))) {
            if (!match) {
                throw new Error('Duration value format is not recognized.');
            }
            const num = parseInt(match[1]);
            const type = match[2];
            // Added check make sure no duplicated types
            if (types.indexOf(type) >= 0 || !match || match.length !== 3) {
                throw new Error('Duration value format is not recognized.');
            }
            types.push(type);
            switch (type) {
                case 'ms':
                    duration = duration.plusMillis(num);
                    break;
                case 's':
                    duration = duration.plusSeconds(num);
                    break;
                case 'm':
                    duration = duration.plusMinutes(num);
                    break;
                case 'h':
                    duration = duration.plusHours(num);
                    break;
                case 'd':
                    duration = duration.plusDays(num);
                    break;
                default:
                    throw new Error('Duration value format is not recognized.');
            }
            matchGroups += match[0];
        }
        if (!types.length || matchGroups !== preprocessedValue) {
            throw new Error('Duration value format is not recognized.');
        }
        return duration;
    }
    /**
     *
     * It converts a server Hex like 0x017D'1694'0477'B3F5 to 017D16940477B3F5
     *
     * @param serverHex
     */
    static toSimpleHex(serverHex) {
        return serverHex.split("'").join('').replace(/^(0x)/, '');
    }
    /**
     * Creates the MerkleStateInfo from the dto
     * @param dto the dto
     */
    static toMerkleStateInfo(dto) {
        if (!dto.tree) {
            return new MerkleStateInfo_1.MerkleStateInfo(dto.raw, MerkleTree_1.MerkleTree.fromRaw(dto.raw));
        }
        const leaf = dto.tree.find((tree) => tree.type.valueOf() === MerkleTreeNodeType_1.MerkleTreeNodeType.Leaf);
        const tree = new MerkleTree_1.MerkleTree(dto.tree
            .filter((tree) => tree.type.valueOf() === MerkleTreeNodeType_1.MerkleTreeNodeType.Branch)
            .map((b) => {
            const branch = b;
            return new MerkleTreeBranch_1.MerkleTreeBranch(branch.type.valueOf(), branch.path, branch.encodedPath, branch.nibbleCount, branch.linkMask, branch.links.map((link) => new MerkleTreeBranchLink_1.MerkleTreeBranchLink(link.bit, link.link)), branch.branchHash);
        }), leaf
            ? new MerkleTreeLeaf_1.MerkleTreeLeaf(leaf.type.valueOf(), leaf.path, leaf.encodedPath, leaf.nibbleCount, leaf.value, leaf.leafHash)
            : undefined);
        return new MerkleStateInfo_1.MerkleStateInfo(dto.raw, tree);
    }
}
exports.DtoMapping = DtoMapping;
//# sourceMappingURL=DtoMapping.js.map