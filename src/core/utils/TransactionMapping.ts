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

import { CreateTransactionFromDTO } from '../../infrastructure/transaction/CreateTransactionFromDTO';
import { CreateTransactionFromPayload } from '../../infrastructure/transaction/CreateTransactionFromPayload';
import { InnerTransaction } from '../../model/transaction/InnerTransaction';
import { Transaction } from '../../model/transaction/Transaction';

export class TransactionMapping {
    /**
     * Create transaction class from Json.
     * @param {object} dataJson The transaction json object.
     * @returns {module: model/transaction/transaction} The transaction class.
     */
    public static createFromDTO(dataJson: object): Transaction {
        return CreateTransactionFromDTO(dataJson);
    }

    /**
     * Create transaction class from payload binary.
     * @param {string} payload The transaction binary payload
     * @param {Boolean} isEmbedded Is embedded transaction (Default: false)
     * @returns {Transaction | InnerTransaction} The transaction class.
     */
    public static createFromPayload(payload: string, isEmbedded = false): Transaction | InnerTransaction {
        return CreateTransactionFromPayload(payload, isEmbedded);
    }
}
