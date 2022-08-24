/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"),
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

import { NamespaceId } from '../namespace';
import { TokenId } from './TokenId';

/**
 * Custom type for unresolved tokenId
 */
export type UnresolvedTokenId = (TokenId | NamespaceId) & {
    /**
     * returns if the object is instance of NamespaceId.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isNamespaceId(): boolean;
    /**
     * returns if the object is instance of TokenId.
     * It avoid the `instanceof` issue when the sdk lib is referenced from multiple modules
     */
    isTokenId(): boolean;
};
