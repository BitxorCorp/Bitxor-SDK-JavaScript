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
exports.SimpleWallet = void 0;
const crypto_1 = require("../../core/crypto");
const format_1 = require("../../core/format");
const Account_1 = require("../account/Account");
const Address_1 = require("../account/Address");
const Wallet_1 = require("./Wallet");
class SimpleWallet extends Wallet_1.Wallet {
    /**
     *Creates an instance of SimpleWallet.
     * @param {string} name
     * @param {Address} address
     * @param {string} encryptedPrivateKey
     */
    constructor(name, address, encryptedPrivateKey) {
        super(name, address, 'simple_v2');
        this.encryptedPrivateKey = encryptedPrivateKey;
    }
    /**
     * Create a Simple wallet
     * @param name - Wallet name
     * @param password - Password to encrypt wallet
     * @param network - Network id
     * @returns {SimpleWallet}
     */
    static create(name, password, network) {
        // Create random bytes
        const randomBytesArray = crypto_1.Crypto.randomBytes(32);
        // Hash random bytes with entropy seed
        // Finalize and keep only 32 bytes
        const hashKey = format_1.Convert.uint8ToHex(randomBytesArray); // TODO: derive private key correctly
        // Create KeyPair from hash key
        const { publicKey, privateKey } = crypto_1.KeyPair.createKeyPairFromPrivateKeyString(hashKey);
        // Create address from public key
        const address = Address_1.Address.createFromPublicKey(format_1.Convert.uint8ToHex(publicKey), network);
        // Encrypt private key using password
        const encryptedPrivateKey = crypto_1.Crypto.encrypt(format_1.Convert.uint8ToHex(privateKey), password.value);
        return new SimpleWallet(name, address, encryptedPrivateKey);
    }
    /**
     * Create a SimpleWallet from private key
     * @param name - Wallet name
     * @param password - Password to encrypt wallet
     * @param privateKey - Wallet private key
     * @param network - Network id
     * @returns {SimpleWallet}
     */
    static createFromPrivateKey(name, password, privateKey, network) {
        // Create KeyPair from hash key
        const keyPair = crypto_1.KeyPair.createKeyPairFromPrivateKeyString(privateKey);
        // Create address from public key
        const address = Address_1.Address.createFromPublicKey(format_1.Convert.uint8ToHex(keyPair.publicKey), network);
        // Encrypt private key using password
        const encryptedPrivateKey = crypto_1.Crypto.encrypt(privateKey, password.value);
        return new SimpleWallet(name, address, encryptedPrivateKey);
    }
    /**
     * Instantiate a SimpleWallet from a DTO
     * @param simpleWalletDTO simple wallet without prototype
     * @returns {SimpleWallet}
     */
    static createFromDTO(simpleWalletDTO) {
        return new SimpleWallet(simpleWalletDTO.name, Address_1.Address.createFromRawAddress(simpleWalletDTO.address.address), simpleWalletDTO.encryptedPrivateKey);
    }
    /**
     * Creates a SimpleWallet DTO
     * @returns {ISimpleWalletDTO}
     */
    toDTO() {
        return JSON.parse(JSON.stringify(this));
    }
    /**
     * Open a wallet and generate an Account
     * @param password - Password to decrypt private key
     * @returns {Account}
     */
    open(password) {
        const privateKey = crypto_1.Crypto.decrypt(this.encryptedPrivateKey, password.value);
        return Account_1.Account.createFromPrivateKey(privateKey, this.networkType);
    }
}
exports.SimpleWallet = SimpleWallet;
//# sourceMappingURL=SimpleWallet.js.map