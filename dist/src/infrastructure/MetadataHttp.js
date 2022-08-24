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
exports.MetadataHttp = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const Convert_1 = require("../core/format/Convert");
const DtoMapping_1 = require("../core/utils/DtoMapping");
const Metadata_1 = require("../model/metadata/Metadata");
const MetadataEntry_1 = require("../model/metadata/MetadataEntry");
const MetadataType_1 = require("../model/metadata/MetadataType");
const NamespaceId_1 = require("../model/namespace/NamespaceId");
const TokenId_1 = require("../model/token/TokenId");
const UInt64_1 = require("../model/UInt64");
const Http_1 = require("./Http");
const paginationStreamer_1 = require("./paginationStreamer");
/**
 * Metadata http repository.
 *
 * @since 1.0
 */
class MetadataHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        super(url, fetchApi);
        this.metadataRoutesApi = new bitxor_openapi_typescript_fetch_client_1.MetadataRoutesApi(this.config());
    }
    /**
     * Gets an array of metadata.
     * @param criteria - Metadata search criteria
     * @returns Observable<Page<Metadata>>
     */
    search(criteria) {
        var _a, _b, _c, _d;
        return this.call(this.metadataRoutesApi.searchMetadataEntries((_a = criteria.sourceAddress) === null || _a === void 0 ? void 0 : _a.plain(), (_b = criteria.targetAddress) === null || _b === void 0 ? void 0 : _b.plain(), criteria.scopedMetadataKey, (_c = criteria.targetId) === null || _c === void 0 ? void 0 : _c.toHex(), (_d = criteria.metadataType) === null || _d === void 0 ? void 0 : _d.valueOf(), criteria.pageSize, criteria.pageNumber, criteria.offset, DtoMapping_1.DtoMapping.mapEnum(criteria.order)), (body) => super.toPage(body.pagination, body.data, this.toMetadata));
    }
    /**
     * Get metadata of the given id.
     * @param compositeHash Metadata composite hash id
     * @returns Observable<Metadata>
     */
    getMetadata(compositeHash) {
        return this.call(this.metadataRoutesApi.getMetadata(compositeHash), (body) => this.toMetadata(body));
    }
    /**
     * Get metadata merkle of the given id.
     * @param compositeHash Metadata composite hash id
     * @returns Observable<MerkleStateInfo>
     */
    getMetadataMerkle(compositeHash) {
        return this.call(this.metadataRoutesApi.getMetadataMerkle(compositeHash), DtoMapping_1.DtoMapping.toMerkleStateInfo);
    }
    streamer() {
        return new paginationStreamer_1.MetadataPaginationStreamer(this);
    }
    /**
     * It maps MetadataDTO into a Metadata
     * @param metadata - the dto
     * @returns the model Metadata.
     */
    toMetadata(metadata) {
        const metadataEntry = metadata.metadataEntry;
        let targetId;
        switch (metadataEntry.metadataType.valueOf()) {
            case MetadataType_1.MetadataType.Token:
                targetId = new TokenId_1.TokenId(metadataEntry.targetId);
                break;
            case MetadataType_1.MetadataType.Namespace:
                targetId = NamespaceId_1.NamespaceId.createFromEncoded(metadataEntry.targetId);
                break;
            default:
                targetId = undefined;
        }
        return new Metadata_1.Metadata(metadata.id, new MetadataEntry_1.MetadataEntry(metadataEntry.version || 1, metadataEntry.compositeHash, DtoMapping_1.DtoMapping.toAddress(metadataEntry.sourceAddress), DtoMapping_1.DtoMapping.toAddress(metadataEntry.targetAddress), UInt64_1.UInt64.fromHex(metadataEntry.scopedMetadataKey), metadataEntry.metadataType.valueOf(), Convert_1.Convert.decodeHex(metadataEntry.value), targetId));
    }
}
exports.MetadataHttp = MetadataHttp;
//# sourceMappingURL=MetadataHttp.js.map