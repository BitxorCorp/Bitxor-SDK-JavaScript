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

import { TokenId } from '../../model/token/TokenId';
import { AccountOrderBy } from './AccountOrderBy';
import { SearchCriteria } from './SearchCriteria';

/**
 * Defines the params used to search blocks. With this criteria, you can sort and filter
 * block queries using rest.
 */
export interface AccountSearchCriteria extends SearchCriteria {
    /**
     * Account order by enum. (optional)
     */
    orderBy?: AccountOrderBy;

    /**
     * Account token id. (optional)
     */
    tokenId?: TokenId;
}
