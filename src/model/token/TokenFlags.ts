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

import { TokenFlagsDto } from 'bitxor-catbuffer-typescript';

/**
 * Token flags model
 */
export class TokenFlags {
    /**
     * The creator can choose between a definition that allows a token supply change at a later point or an immutable supply.
     * Allowed values for the property are "true" and "false". The default value is "false".
     */
    public readonly supplyMutable: boolean;

    /**
     * The creator can choose if the token definition should allow for transfers of the token among accounts other than the creator.
     * If the property 'transferable' is set to "false", only transfer transactions
     * having the creator as sender or as recipient can transfer tokens of that type.
     * If set to "true" the tokens can be transferred to and from arbitrary accounts.
     * Allowed values for the property are thus "true" and "false". The default value is "true".
     */
    public readonly transferable: boolean;

    /**
     * Not all the tokens of a given network will be subject to token restrictions. The feature will only affect
     * those to which the issuer adds the "restrictable" property explicitly at the moment of its creation. This
     * property appears disabled by default, as it is undesirable for autonomous tokens like the public network currency.
     */
    public readonly restrictable: boolean;

    /**
     *  The creator can choose if he can revoke tokens after a transfer.
     */
    public readonly revokable: boolean;

    /**
     * @param flags
     */
    constructor(flags: number) {
        this.supplyMutable = (flags & TokenFlagsDto.SUPPLY_MUTABLE) !== 0;
        this.transferable = (flags & TokenFlagsDto.TRANSFERABLE) !== 0;
        this.restrictable = (flags & TokenFlagsDto.RESTRICTABLE) !== 0;
        this.revokable = (flags & TokenFlagsDto.REVOKABLE) !== 0;
    }

    /**
     * Static constructor function with default parameters
     * @returns {TokenFlags}
     * @param supplyMutable
     * @param transferable
     * @param restrictable
     * @param revokable
     */
    public static create(supplyMutable: boolean, transferable: boolean, restrictable = false, revokable = false): TokenFlags {
        const flags = this.toFlag({
            supplyMutable: supplyMutable,
            transferable: transferable,
            restrictable: restrictable,
            revokable: revokable,
        });
        return new TokenFlags(flags);
    }

    /**
     * Get token flag value in number
     * @returns {number}
     */
    public getValue(): number {
        return TokenFlags.toFlag(this);
    }

    /**
     * Create DTO object
     */
    toDTO(): any {
        return {
            flags: this.getValue(),
        };
    }

    /**
     * It "adds up" individual flags into a bit wise number flag.
     *
     * @param supplyMutable - if the supply is mutable. First flag.
     * @param transferable - if the balance can be transferred. Second flag.
     * @param restrictable - if the transaction can be restricted. Third flag.
     * @param revokable - if the balance can be revoked. Fourth flag.
     * @private
     */
    private static toFlag({
        supplyMutable,
        transferable,
        restrictable,
        revokable,
    }: {
        supplyMutable: boolean;
        transferable: boolean;
        restrictable: boolean;
        revokable: boolean;
    }): number {
        return (supplyMutable ? 1 : 0) + (transferable ? 2 : 0) + (restrictable ? 4 : 0) + (revokable ? 8 : 0);
    }
}
