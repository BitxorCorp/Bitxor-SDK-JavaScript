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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
const bitxor_openapi_typescript_fetch_client_1 = require("bitxor-openapi-typescript-fetch-client");
const node_fetch_1 = require("node-fetch");
const rxjs_1 = require("rxjs");
const Page_1 = require("./Page");
/**
 * Http extended by all http services
 */
class Http {
    /**
     * Constructor
     * @param url Base bitxorcore-rest url
     * @param fetchApi fetch function to be used when performing rest requests.
     */
    constructor(url, fetchApi) {
        this.url = url;
        this.fetchApi = fetchApi;
    }
    static errorHandling(error) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (error instanceof Error) {
                return error;
            }
            const statusCode = parseInt((error === null || error === void 0 ? void 0 : error.status) || (error === null || error === void 0 ? void 0 : error.statusCode) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 0);
            const statusMessage = ((error === null || error === void 0 ? void 0 : error.statusText) ||
                (error === null || error === void 0 ? void 0 : error.statusMessage) ||
                ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.statusMessage) ||
                'Unknown Error').toString();
            const toString = (body) => {
                if (!body) {
                    return '';
                }
                if (typeof body === 'string' || body instanceof String) {
                    return body.toString();
                }
                return JSON.stringify(body);
            };
            const getBody = (error) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                const body = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.body;
                if (body) {
                    return toString(body);
                }
                if (error.text) {
                    return toString(yield error.text());
                }
                return '';
            });
            const formattedError = {
                statusCode,
                statusMessage,
                body: yield getBody(error),
            };
            return new Error(JSON.stringify(formattedError));
        });
    }
    createNetworkTypeObservable(networkType) {
        if (networkType && networkType instanceof rxjs_1.Observable) {
            return networkType;
        }
        else if (networkType) {
            return (0, rxjs_1.of)(networkType);
        }
        else {
            return (0, rxjs_1.defer)(() => this.call(new bitxor_openapi_typescript_fetch_client_1.NodeRoutesApi(this.config()).getNodeInfo(), (body) => body.networkIdentifier));
        }
    }
    config() {
        const fetchApi = this.fetchApi || (typeof window !== 'undefined' && window.fetch.bind(window)) || node_fetch_1.default;
        return new bitxor_openapi_typescript_fetch_client_1.Configuration({ basePath: this.url, fetchApi: fetchApi, queryParamsStringify: bitxor_openapi_typescript_fetch_client_1.querystring });
    }
    /**
     * This method knows how to call, convert and handle exception when doing remote http operations.
     * @param remoteCall the remote call
     * @param mapper the mapper from dto to the model object.
     */
    call(remoteCall, mapper) {
        return (0, rxjs_1.from)(new Promise((resolve, reject) => remoteCall.then((a) => __awaiter(this, void 0, void 0, function* () {
            try {
                resolve(mapper(a));
            }
            catch (e) {
                reject(yield Http.errorHandling(e));
            }
        }), (e) => __awaiter(this, void 0, void 0, function* () { return reject(yield Http.errorHandling(e)); }))));
    }
    /**
     * This method maps a rest page object from rest to the SDK's Page model object.
     *
     * @internal
     * @param pagination rest pagination object.
     * @param data rest pagination data object.
     * @param mapper the mapper from dto to the model object.
     * @param networkType the network type.
     * @returns Page<T> model
     */
    toPage(pagination, data, mapper, networkType) {
        return new Page_1.Page(data.map((d) => mapper(d, networkType)), pagination === null || pagination === void 0 ? void 0 : pagination.pageNumber, pagination === null || pagination === void 0 ? void 0 : pagination.pageSize);
    }
}
exports.Http = Http;
//# sourceMappingURL=Http.js.map