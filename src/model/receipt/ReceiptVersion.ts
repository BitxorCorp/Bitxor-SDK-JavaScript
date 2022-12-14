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

/**
 * Receipt version constants.
 *
 * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/ReceiptType.h
 * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/ReceiptType.cpp
 */
export class ReceiptVersion {
    /**
     * Balance transfer receipt version.
     * @type {number}
     */
    public static readonly BALANCE_TRANSFER = 0x1;

    /**
     * Balance change receipt version
     * @type {number}
     */
    public static readonly BALANCE_CHANGE = 0x1;
    /**
     * Artifact expiry receipt version
     * @type {number}
     */
    public static readonly ARTIFACT_EXPIRY = 0x1;
    /**
     * Transaction statement version
     * @type {number}
     */
    public static readonly TRANSACTION_STATEMENT = 0x1;

    /**
     * Resolution statement version
     * @type {number}
     */
    public static readonly RESOLUTION_STATEMENT = 0x1;

    /**
     * Resolution statement version
     * @type {number}
     */
    public static readonly INFLATION_RECEIPT = 0x1;
}
