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
exports.AccountInfo = void 0;
const bitxor_catbuffer_typescript_1 = require("bitxor-catbuffer-typescript");
const format_1 = require("../../core/format");
const UInt64_1 = require("../UInt64");
const PublicAccount_1 = require("./PublicAccount");
/**
 * The account info structure describes basic information for an account.
 */
class AccountInfo {
    constructor(
    /**
     * Version
     */
    version, 
    /**
     * The database record id;
     */
    recordId, 
    /**
     * Address of the account.
     */
    address, 
    /**
     * Height when the address was published.
     */
    addressHeight, 
    /**
     * Public key of the account.
     */
    publicKey, 
    /**
     * Height when the public key was published.
     */
    publicKeyHeight, 
    /**
     * Account type
     */
    accountType, 
    /**
     * Account keys
     */
    supplementalPublicKeys, 
    /**
     * Account activity bucket
     */
    activityBucket, 
    /**
     * Tokens held by the account.
     */
    tokens, 
    /**
     * Importance of the account.
     */
    importance, 
    /**
     * Importance height of the account.
     */
    importanceHeight) {
        this.version = version;
        this.recordId = recordId;
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.supplementalPublicKeys = supplementalPublicKeys;
        this.activityBucket = activityBucket;
        this.tokens = tokens;
        this.importance = importance;
        this.importanceHeight = importanceHeight;
    }
    /**
     * Returns account public account.
     * @returns {PublicAccount}
     */
    get publicAccount() {
        return PublicAccount_1.PublicAccount.createFromPublicKey(this.publicKey, this.address.networkType);
    }
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize() {
        var _a, _b, _c, _d, _e, _f, _g;
        const address = this.address.toBuilder();
        const addressHeight = new bitxor_catbuffer_typescript_1.HeightDto(this.addressHeight.toDTO());
        const publicKey = new bitxor_catbuffer_typescript_1.PublicKeyDto(format_1.Convert.hexToUint8(this.publicKey));
        const publicKeyHeight = new bitxor_catbuffer_typescript_1.HeightDto(this.publicKeyHeight.toDTO());
        const accountType = this.accountType.valueOf();
        const supplementalPublicKeysMask = this.getAccountKeyTypeFlags();
        const votingPublicKeys = ((_a = this.supplementalPublicKeys.voting) === null || _a === void 0 ? void 0 : _a.map((key) => AccountInfo.toPinnedVotingKeyBuilder(key))) || [];
        const balances = this.tokens.map((m) => AccountInfo.toTokenBuilder(m));
        const linkedPublicKey = AccountInfo.toPublicKeyDto((_c = (_b = this === null || this === void 0 ? void 0 : this.supplementalPublicKeys) === null || _b === void 0 ? void 0 : _b.linked) === null || _c === void 0 ? void 0 : _c.publicKey);
        const nodePublicKey = AccountInfo.toPublicKeyDto((_e = (_d = this === null || this === void 0 ? void 0 : this.supplementalPublicKeys) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.publicKey);
        const vrfPublicKey = AccountInfo.toPublicKeyDto((_g = (_f = this === null || this === void 0 ? void 0 : this.supplementalPublicKeys) === null || _f === void 0 ? void 0 : _f.vrf) === null || _g === void 0 ? void 0 : _g.publicKey);
        const importanceSnapshots = new bitxor_catbuffer_typescript_1.ImportanceSnapshotBuilder(new bitxor_catbuffer_typescript_1.ImportanceDto(this.importance.toDTO()), new bitxor_catbuffer_typescript_1.ImportanceHeightDto(this.importanceHeight.toDTO()));
        const activityBuckets = new bitxor_catbuffer_typescript_1.HeightActivityBucketsBuilder(this.activityBucket.slice(0, 5).map((b) => AccountInfo.toHeightActivityBucketsBuilder(b)));
        const format = this.isHighValue() ? bitxor_catbuffer_typescript_1.AccountStateFormatDto.HIGH_VALUE : bitxor_catbuffer_typescript_1.AccountStateFormatDto.REGULAR;
        return new bitxor_catbuffer_typescript_1.AccountStateBuilder(this.version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances).serialize();
    }
    isHighValue() {
        if (this.importance.compare(UInt64_1.UInt64.fromUint(0)) == 0) {
            return false;
        }
        if (this.activityBucket.length < 5) {
            return false;
        }
        return true;
    }
    /**
     * Get the token flags.
     *
     * @return Token flags
     */
    getAccountKeyTypeFlags() {
        const flags = [];
        if (this.supplementalPublicKeys.vrf) {
            flags.push(bitxor_catbuffer_typescript_1.AccountKeyTypeFlagsDto.VRF);
        }
        if (this.supplementalPublicKeys.node) {
            flags.push(bitxor_catbuffer_typescript_1.AccountKeyTypeFlagsDto.NODE);
        }
        if (this.supplementalPublicKeys.linked) {
            flags.push(bitxor_catbuffer_typescript_1.AccountKeyTypeFlagsDto.LINKED);
        }
        return flags;
    }
    static toPinnedVotingKeyBuilder(key) {
        const votingPublicKeyDto = new bitxor_catbuffer_typescript_1.VotingPublicKeyDto(format_1.Convert.hexToUint8(key.publicKey).slice(0, 32));
        const startEpoch = new bitxor_catbuffer_typescript_1.FinalizationEpochDto(key.startEpoch);
        const endEpoch = new bitxor_catbuffer_typescript_1.FinalizationEpochDto(key.endEpoch);
        return new bitxor_catbuffer_typescript_1.PinnedVotingKeyBuilder(votingPublicKeyDto, startEpoch, endEpoch);
    }
    static toTokenBuilder(m) {
        return new bitxor_catbuffer_typescript_1.TokenBuilder(m.id.toBuilder(), new bitxor_catbuffer_typescript_1.AmountDto(m.amount.toDTO()));
    }
    static toPublicKeyDto(publicKey) {
        if (!publicKey) {
            return undefined;
        }
        return new bitxor_catbuffer_typescript_1.PublicKeyDto(format_1.Convert.hexToUint8(publicKey));
    }
    static toHeightActivityBucketsBuilder(b) {
        const startHeight = new bitxor_catbuffer_typescript_1.ImportanceHeightDto(b.startHeight.toDTO());
        /** Total fees paid by account. */
        const totalFeesPaid = new bitxor_catbuffer_typescript_1.AmountDto(b.totalFeesPaid.toDTO());
        /** Number of times account has been used as a beneficiary. */
        const beneficiaryCount = b.beneficiaryCount;
        /** Raw importance score. */
        const rawScore = b.rawScore.toDTO();
        return new bitxor_catbuffer_typescript_1.HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    }
}
exports.AccountInfo = AccountInfo;
//# sourceMappingURL=AccountInfo.js.map