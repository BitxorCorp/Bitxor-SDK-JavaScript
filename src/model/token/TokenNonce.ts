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
import { Crypto } from '../../core/crypto';
import { Convert as convert } from '../../core/format';

/**
 * The token nonce structure
 *
 * @since 1.0
 */
export class TokenNonce {
    /**
     * Create TokenNonce from int
     *
     * @param nonce nonce
     */
    constructor(nonce: Uint8Array) {
        if (nonce.length !== 4) {
            throw Error('Invalid byte size for nonce, should be 4 bytes but received ' + nonce.length);
        }
        this.nonce = nonce;
    }

    /**
     * Token nonce
     */
    public readonly nonce: Uint8Array;

    /**
     * Create a random TokenNonce
     *
     * @return  {TokenNonce}
     */
    public static createRandom(): TokenNonce {
        const bytes = Crypto.randomBytes(4);
        const nonce = new Uint8Array(bytes);
        return this.createFromUint8Array(nonce);
    }

    /**
     * Create a TokenNonce from a Uint8Array notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    public static createFromUint8Array(nonce: Uint8Array): TokenNonce {
        return new TokenNonce(nonce);
    }

    /**
     * Create a TokenNonce from a number notation.
     *
     * @param   nonce {number}
     * @return  {TokenNonce}
     */
    public static createFromNumber(nonce: number): TokenNonce {
        return new TokenNonce(convert.numberToUint8Array(nonce, 4));
    }

    /**
     * Create a TokenNonce from hexadecimal notation.
     *
     * @param   hex     {string}
     * @return  {TokenNonce}
     */
    public static createFromHex(hex: string): TokenNonce {
        return new TokenNonce(convert.hexToUint8(hex));
    }

    /**
     * @returns the nonce as an array of 4 digits
     */
    public toUint8Array(): Uint8Array {
        return this.nonce;
    }

    /**
     * @internal
     * @returns the nonce as number
     */
    public toDTO(): number {
        return convert.uintArray8ToNumber(this.nonce);
    }

    /**
     * Get string value of nonce
     * @returns the nonce as hex
     */
    public toHex(): string {
        return convert.uint8ToHex(this.nonce);
    }
}
