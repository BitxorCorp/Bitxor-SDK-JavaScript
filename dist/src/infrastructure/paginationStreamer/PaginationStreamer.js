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
exports.PaginationStreamer = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * Utility helper that stream pages of searches into an Observable.
 *
 * A streamer will help users to walk through searches without knowing the underlying pagination implementation.
 */
class PaginationStreamer {
    /**
     * Constructor
     *
     * @param searcher the searcher repository
     */
    constructor(
    /**
     * The search method, likely to be the search method of entity's repository
     */
    searcher) {
        this.searcher = searcher;
    }
    /**
     * Main method of the helper, it streams the results in observable only loading the pages when necessary.
     *
     * @param criteria the criteria
     * @return the observable of entities.
     */
    search(criteria) {
        return this.searchInternal(criteria, 1);
    }
    searchInternal(criteria, pageNumber) {
        criteria.pageNumber = pageNumber;
        return (0, rxjs_1.defer)(() => {
            const observable = this.searcher.search(criteria);
            return observable.pipe((0, operators_1.mergeMap)((page) => {
                if (page.isLastPage) {
                    return (0, rxjs_1.from)(page.data);
                }
                else {
                    return (0, rxjs_1.concat)((0, rxjs_1.from)(page.data), this.searchInternal(criteria, pageNumber + 1));
                }
            }));
        });
    }
}
exports.PaginationStreamer = PaginationStreamer;
//# sourceMappingURL=PaginationStreamer.js.map