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
exports.Page = void 0;
/**
 * It represents a page of results after a repository search call.
 *
 * @param <T> then model type.
 */
class Page {
    /**
     * Constructor.
     *
     * @param data the page data
     * @param pageNumber the current page number starting from 1.
     * @param pageSize the page size.
     */
    constructor(data, pageNumber, pageSize) {
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.isLastPage = !this.data.length || this.pageSize > this.data.length;
    }
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map