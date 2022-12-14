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

import { Observable } from 'rxjs';
import { UInt64 } from '../../model/UInt64';

/**
 * Block Service Interface
 */
export interface IBlockService {
    /**
     * Validate transaction hash in block
     * @param leaf transaction hash
     * @param height block height
     */
    validateTransactionInBlock(leaf: string, height: UInt64): Observable<boolean>;

    /**
     * Validate statement hash in block
     * @param leaf statement hash
     * @param height block height
     */
    validateStatementInBlock(leaf: string, height: UInt64): Observable<boolean>;
}
